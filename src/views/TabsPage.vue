<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <div class="tab-pill">
            <ion-icon :icon="keyOutline" />
          </div>
          <ion-label>Claves</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <div class="tab-pill">
            <ion-icon :icon="peopleOutline" />
          </div>
          <ion-label>Usuarios</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <div class="tab-pill">
            <ion-icon :icon="addCircleOutline" />
          </div>
          <ion-label>Agregar</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/tab4">
          <div class="tab-pill">
            <ion-icon :icon="mapOutline" />
          </div>
          <ion-label>Mapa</ion-label>
        </ion-tab-button>

        <ion-tab-button @click="logout">
          <div class="tab-pill tab-pill--logout">
            <ion-icon :icon="logOutOutline" />
          </div>
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
import {
  keyOutline, peopleOutline, addCircleOutline,
  mapOutline, logOutOutline
} from 'ionicons/icons';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
async function logout() {
  await signOut(getAuth());
  router.replace('/login');
}
</script>

<style scoped>
/* ── Tab bar base ── */
ion-tab-bar {
  --background: transparent;
  background: linear-gradient(180deg, rgba(15, 25, 50, 0) 0%, #0d1830 18%);
  border-top: none;
  padding: 10px 12px 18px;
  gap: 4px;
  height: 80px;
}

/* ── Cada botón ── */
ion-tab-button {
  --color: #4a6a9a;
  --color-selected: #ffffff;
  --ripple-color: transparent;
  background: transparent;
  border-radius: 18px;
  flex-direction: column;
  gap: 4px;
  transition: transform 0.18s ease;
  position: relative;
}

ion-tab-button:active {
  transform: scale(0.88);
}

ion-tab-button ion-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.4px;
  margin-top: 2px;
  transition: color 0.2s ease;
}

/* ── Pill (contenedor del ícono) ── */
.tab-pill {
  width: 46px;
  height: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.18s ease;
}

.tab-pill ion-icon {
  font-size: 20px;
  transition: transform 0.2s ease, color 0.2s ease;
}

/* ── Hover (desktop) ── */
ion-tab-button:hover .tab-pill {
  background: rgba(126, 170, 221, 0.12);
  transform: translateY(-2px);
}

ion-tab-button:hover .tab-pill ion-icon {
  transform: scale(1.1);
}

/* ── Tab activo ── */
ion-tab-button.tab-selected .tab-pill {
  background: linear-gradient(135deg, #2a6dd9 0%, #1a3fa8 100%);
  box-shadow:
    0 4px 15px rgba(42, 109, 217, 0.5),
    0 1px 3px rgba(0, 0, 0, 0.3);
  transform: translateY(-3px);
}

ion-tab-button.tab-selected .tab-pill ion-icon {
  color: #ffffff;
  transform: scale(1.05);
}

ion-tab-button.tab-selected ion-label {
  color: #7eaadd;
}

/* ── Logout pill (degradado rojo) ── */
.tab-pill--logout {
  background: transparent;
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.18s ease;
}

ion-tab-button:hover .tab-pill--logout {
  background: rgba(220, 80, 80, 0.15);
}

ion-tab-button:active .tab-pill--logout {
  background: linear-gradient(135deg, #c0392b 0%, #8e1a1a 100%);
  box-shadow: 0 4px 14px rgba(192, 57, 43, 0.45);
}

/* ── Click ripple manual ── */
ion-tab-button::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: radial-gradient(circle, rgba(126,170,221,0.18) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

ion-tab-button:active::after {
  opacity: 1;
  transform: scale(1);
}
</style>