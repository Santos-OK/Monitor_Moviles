<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Agregar claves</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-list>
        <ion-item>
          <ion-input label="claves nuevas" Type="number" min="1" :value="claves"
            @ionInput="claves = parseInt($event.target.value)"></ion-input>
        </ion-item>
        <ion-item>
          <ion-button expand="block" @click="agregarClaves()">Agregar claves</ion-button>
        </ion-item>
      </ion-list>
      <ion-alert :is-open="alerta" :backdropDismiss="true" :header="titulo" :sub-header="subtitulo" :message="mensaje"
        :buttons="alertButtons"></ion-alert>

    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert
} from "@ionic/vue";
import { defineComponent } from "vue";
import { getDatabase, ref, set, get } from "firebase/database";
export default defineComponent({
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAlert
  },
  data() {
    return {
      claves: 1,
      titulo: "",
      subtitulo: "",
      mensaje: "",
      alerta: false
    };
  },
  setup() {
    const alertButtons = ['Continuar'];
    return { alertButtons };
  },
  methods: {
    async agregarClaves() {
      console.log(this.claves);
      const db = getDatabase();
      var errores = 0;

      // Obtener cuántas claves ya existen para continuar la numeración
      const snapshot = await get(ref(db, "claves/"));
      const existingKeys = snapshot.exists() ? Object.keys(snapshot.val()) : [];
      // Filtrar solo las claves numéricas y obtener el máximo
      const numericKeys = existingKeys
        .map(k => parseInt(k))
        .filter(k => !isNaN(k));
      const nextKey = numericKeys.length > 0 ? Math.max(...numericKeys) + 1 : 1;

      for (let i = 0; i < this.claves; i++) {
        const clave = nextKey + i;
        set(ref(db, "claves/" + clave), {
          status: "disponible",
          usuario: "",
          Latitud: "",
          Longitud: ""
        })
          .then(async () => {
            console.log("clave " + clave + " agregada");
            this.titulo = "Claves agregadas";
            this.subtitulo = "Claves agregadas con éxito";
            this.mensaje = "Se agregaron " + this.claves.toString() + " claves con éxito";
            this.alerta = true;
          })
          .catch(async (error) => {
            console.log(error);
            errores++;
            this.titulo = "Error en agregar claves";
            this.subtitulo = "Error al agregar claves";
            this.mensaje = "Error al agregar " + this.claves.toString() + " claves";
            this.alerta = true;
          });
      }
    },
  },
});
</script>