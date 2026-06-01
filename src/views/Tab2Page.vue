<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <div class="toolbar-title">
            <ion-icon :icon="peopleOutline" class="title-icon"></ion-icon>
            Usuarios
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-grid>
        <ion-row>
          <ion-col><div>ID</div></ion-col>
          <ion-col><div>Nombre</div></ion-col>
          <ion-col><div>Apellido</div></ion-col>
          <ion-col><div>Email</div></ion-col>
        </ion-row>
        <ion-row v-for="(item, index) in listaUsuarios" :key="index">
          <ion-col><div class="id-cell">{{ listaUsers[index] }}</div></ion-col>
          <ion-col><div>{{ item.nombre }}</div></ion-col>
          <ion-col><div>{{ item.apellido }}</div></ion-col>
          <ion-col><div class="email-cell">{{ item.email }}</div></ion-col>
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
import { peopleOutline } from 'ionicons/icons';
import { getDatabase, ref, onValue } from "firebase/database";

export default {
  name: "Tab2",
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonGrid, IonCol, IonRow, IonIcon
  },
  data() {
    return {
      listaUsuarios: [],
      listaUsers: []
    };
  },
  setup() {
    return { peopleOutline };
  },
  mounted() {
    const db = getDatabase();
    onValue(ref(db, "usuario/"), (snapshot) => {
      this.listaUsuarios = [];
      this.listaUsers = [];
      snapshot.forEach(element => {
        this.listaUsers.push(element.key);
        this.listaUsuarios.push(element.toJSON());
      });
    });
  },
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

/* ID truncado para no romper layout */
.id-cell {
  font-size: 11px !important;
  color: #6a84a8 !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80px;
}

/* Email en color acento */
.email-cell {
  font-size: 12px !important;
  color: #7eaadd !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>