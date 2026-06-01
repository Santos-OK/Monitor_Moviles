<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="keyOutline" />
          <ion-label>Claves</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="peopleOutline" />
          <ion-label>Usuarios</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="addCircleOutline" />
          <ion-label>Agregar Claves</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/tab4">
          <ion-icon :icon="mapOutline" />
          <ion-label>Mapa</ion-label>
        </ion-tab-button>

        <!-- Logout -->
        <ion-tab-button @click="logout">
          <ion-icon :icon="logOutOutline" />
          <ion-label>Salir</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import {
  IonTabBar, IonTabButton, IonTabs,
  IonLabel, IonIcon, IonPage, IonRouterOutlet
} from '@ionic/vue';
import { keyOutline, peopleOutline, addCircleOutline, mapOutline, logOutOutline } from 'ionicons/icons';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

async function logout() {
  await signOut(getAuth());
  router.replace('/login');
}
</script>