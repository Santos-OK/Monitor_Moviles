<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <div class="toolbar-title">
            <ion-icon :icon="keyOutline" class="title-icon"></ion-icon>
            Claves
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-grid>
        <ion-row>
          <ion-col><div>Clave</div></ion-col>
          <ion-col><div>Status</div></ion-col>
        </ion-row>
        <ion-row v-for="(item, index) in listaClaves" :key="index">
          <ion-col><div>{{ listaKeys[index] }}</div></ion-col>
          <ion-col>
            <div :class="statusClass(item.status)">{{ item.status }}</div>
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonGrid, IonCol, IonRow, IonIcon
} from '@ionic/vue';
import { keyOutline } from 'ionicons/icons';
import { getDatabase, ref, onValue } from "firebase/database";

export default {
  name: "Tab1",
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonGrid, IonCol, IonRow, IonIcon
  },
  data() {
    return {
      listaClaves: [],
      listaKeys: []
    };
  },
  setup() {
    return { keyOutline };
  },
  mounted() {
    const db = getDatabase();
    onValue(ref(db, "claves/"), (snapshot) => {
      this.listaClaves = [];
      this.listaKeys = [];
      snapshot.forEach(element => {
        this.listaKeys.push(element.key);
        this.listaClaves.push(element.toJSON());
      });
    });
  },
  methods: {
    statusClass(status) {
      if (!status) return '';
      const s = status.toLowerCase();
      if (s.includes('disponible')) return 'status-disponible';
      if (s.includes('generado'))   return 'status-generado';
      if (s.includes('utilizado') || s.includes('usado')) return 'status-utilizado';
      return '';
    }
  }
};
</script>

<style scoped>
.toolbar-title {
  display: flex;
  align-items: center;
  gap: 8px;
}
.title-icon {
  font-size: 20px;
  color: #7eaadd;
}

/* Status badges */
.status-disponible {
  color: #5fd18a !important;
  border-color: #1e4d35 !important;
  background-color: #132e20 !important;
}
.status-generado {
  color: #f0c040 !important;
  border-color: #4d3c10 !important;
  background-color: #2e2410 !important;
}
.status-utilizado {
  color: #7eaadd !important;
  border-color: #1e3a5f !important;
  background-color: #12243a !important;
}
</style>