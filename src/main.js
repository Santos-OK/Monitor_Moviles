import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
/*import '@ionic/vue/css/palettes/dark.system.css';*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGOzv6-h6ovNyQtSC8bXlCM6DgyvN2PGo",
  authDomain: "moviles-final-2f6f0.firebaseapp.com",
  projectId: "moviles-final-2f6f0",
  storageBucket: "moviles-final-2f6f0.firebasestorage.app",
  messagingSenderId: "162994451595",
  appId: "1:162994451595:web:5e740dec824f4f713ad08e"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .provide(appFirebase)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
