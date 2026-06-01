<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Mapa de claves escaneadas</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div id="map"></div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { getDatabase, ref, onValue } from "firebase/database";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix necesario para que los íconos de Leaflet funcionen con Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export default {
    name: "Tab4",
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent },
    data() {
        return {
            map: null,
            markers: [],
        };
    },
    mounted() {
        // Esperamos al siguiente tick para que ion-content esté listo
        this.$nextTick(() => {
            setTimeout(() => {
                this.initMap();
            }, 150);
        });
    },
    methods: {
        initMap() {
            if (this.map) return; // evitar doble inicialización

            this.map = L.map('map', {
                center: [20.659698, -103.349609],
                zoom: 5,
                zoomControl: true,
            });

            // Intentar con dos fuentes de tiles por si una falla
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19,
                crossOrigin: true,
            }).addTo(this.map);

            // Forzar recálculo del tamaño
            setTimeout(() => {
                this.map.invalidateSize();
            }, 200);

            // Leer Firebase
            const db = getDatabase();
            const clavesRef = ref(db, "claves/");
            onValue(clavesRef, (snapshot) => {
                this.markers.forEach(m => m.remove());
                this.markers = [];
                const bounds = [];

                snapshot.forEach(element => {
                    const clave = element.toJSON();
                    const lat = parseFloat(clave.Latitud);
                    const lng = parseFloat(clave.Longitud);

                    if (!isNaN(lat) && !isNaN(lng)) {
                        const marker = L.marker([lat, lng])
                            .addTo(this.map)
                            .bindPopup(`
              <b>Clave: ${element.key}</b><br>
              Estado: ${clave.status || 'Sin estado'}<br>
              Usuario: ${clave.usuario || 'Sin usuario'}
            `);
                        this.markers.push(marker);
                        bounds.push([lat, lng]);
                    }
                });

                if (bounds.length > 0) {
                    this.map.fitBounds(bounds, { padding: [40, 40] });
                }
            });
        },
    },
    beforeUnmount() {
        // Limpiar el mapa al salir del tab para evitar memory leaks
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
    },
};
</script>

<style scoped>
#map {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

ion-content {
  --overflow: hidden;
}
</style>