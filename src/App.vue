<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  name: "App",
  components: { IonApp, IonRouterOutlet },

  created() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, "omar@santos.com", "omarsantos333")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user == null) {
          console.log("no autenticado")
        }
        else {
          console.log("usuario autenticado", user);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  },
}
</script>
