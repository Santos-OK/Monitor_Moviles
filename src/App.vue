<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  name: "App",
  components: { IonApp, IonRouterOutlet },
  created() {
    const auth = getAuth();
    // Esperar a que Firebase resuelva el estado inicial
    // Si no hay usuario, el router guard lo manda al login automáticamente
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.$router.replace('/login');
      }
    });
  }
};
</script>