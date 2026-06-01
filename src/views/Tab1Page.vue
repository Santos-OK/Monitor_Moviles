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

      <!-- Stat principal colapsable -->
      <div class="main-stat-card" @click="expanded = !expanded">
        <div class="main-stat-left">
          <div class="main-icon-wrap">
            <ion-icon :icon="keyOutline"></ion-icon>
          </div>
          <div>
            <span class="main-num">{{ total }}</span>
            <span class="main-label">Claves totales</span>
          </div>
        </div>
        <ion-icon
          :icon="expanded ? chevronUpOutline : chevronDownOutline"
          class="chevron"
          :class="{ 'chevron--open': expanded }"
        ></ion-icon>
      </div>

      <!-- Desplegable con breakdown -->
      <transition name="slide">
        <div v-if="expanded" class="breakdown">
          <div class="breakdown-row breakdown-row--green">
            <div class="dot dot--green"></div>
            <span class="breakdown-label">Disponibles</span>
            <span class="breakdown-num breakdown-num--green">{{ disponibles }}</span>
            <div class="breakdown-bar-wrap">
              <div class="breakdown-bar breakdown-bar--green" :style="{ width: pct(disponibles) }"></div>
            </div>
          </div>
          <div class="breakdown-row breakdown-row--yellow">
            <div class="dot dot--yellow"></div>
            <span class="breakdown-label">Generadas</span>
            <span class="breakdown-num breakdown-num--yellow">{{ generados }}</span>
            <div class="breakdown-bar-wrap">
              <div class="breakdown-bar breakdown-bar--yellow" :style="{ width: pct(generados) }"></div>
            </div>
          </div>
          <div class="breakdown-row breakdown-row--cyan">
            <div class="dot dot--cyan"></div>
            <span class="breakdown-label">Usadas</span>
            <span class="breakdown-num breakdown-num--cyan">{{ utilizados }}</span>
            <div class="breakdown-bar-wrap">
              <div class="breakdown-bar breakdown-bar--cyan" :style="{ width: pct(utilizados) }"></div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Lista -->
      <div class="list-container">
        <div class="list-header">
          <span>Clave</span>
          <span>Status</span>
        </div>
        <div
          v-for="(item, index) in listaClaves"
          :key="index"
          class="list-row"
        >
          <span class="clave-num"># {{ listaKeys[index] }}</span>
          <span class="status-badge" :class="statusClass(item.status)">
            {{ item.status || '—' }}
          </span>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/vue';
import { keyOutline, chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
import { getDatabase, ref, onValue } from "firebase/database";

export default {
  name: "Tab1",
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon },
  data() {
    return { listaClaves: [], listaKeys: [], expanded: false };
  },
  setup() { return { keyOutline, chevronDownOutline, chevronUpOutline }; },
  computed: {
    total()       { return this.listaClaves.length; },
    disponibles() { return this.listaClaves.filter(c => c.status?.toLowerCase().includes('disponible')).length; },
    generados()   { return this.listaClaves.filter(c => c.status?.toLowerCase().includes('generado')).length; },
    utilizados()  { return this.listaClaves.filter(c => c.status?.toLowerCase().includes('utilizado') || c.status?.toLowerCase().includes('usado')).length; },
  },
  mounted() {
    onValue(ref(getDatabase(), "claves/"), (snapshot) => {
      this.listaClaves = [];
      this.listaKeys = [];
      snapshot.forEach(el => {
        this.listaKeys.push(el.key);
        this.listaClaves.push(el.toJSON());
      });
    });
  },
  methods: {
    pct(n) {
      if (!this.total) return '0%';
      return Math.round((n / this.total) * 100) + '%';
    },
    statusClass(status) {
      if (!status) return '';
      const s = status.toLowerCase();
      if (s.includes('disponible')) return 'badge--green';
      if (s.includes('generado'))   return 'badge--yellow';
      if (s.includes('utilizado') || s.includes('usado')) return 'badge--cyan';
      return '';
    }
  }
};
</script>

<style scoped>
.toolbar-title { display: flex; align-items: center; gap: 8px; }
.title-icon { font-size: 20px; color: #7eaadd; }

/* ── Tarjeta principal ── */
.main-stat-card {
  margin: 20px 16px 0;
  background: #131f3d;
  border: 1px solid #1e3460;
  border-radius: 20px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  user-select: none;
}
.main-stat-card:hover  { background: #1a2d50; }
.main-stat-card:active { background: #1e3460; }

.main-stat-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.main-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, #2a6dd9, #1a3fa8);
  box-shadow: 0 4px 18px rgba(42, 109, 217, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
}

.main-num {
  display: block;
  font-size: 34px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
  letter-spacing: -1px;
}
.main-label {
  display: block;
  font-size: 12px;
  color: #4a6a9a;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-top: 4px;
  font-weight: 600;
}

.chevron {
  font-size: 20px;
  color: #4a6a9a;
  transition: transform 0.3s ease, color 0.2s;
}
.chevron--open {
  color: #7eaadd;
  transform: rotate(180deg);
}

/* ── Desplegable ── */
.breakdown {
  margin: 10px 16px 0;
  background: #0d1830;
  border: 1px solid #1e3460;
  border-radius: 16px;
  padding: 6px 4px;
  overflow: hidden;
}

.breakdown-row {
  display: grid;
  grid-template-columns: 10px 1fr auto 100px;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  margin: 2px;
  transition: background 0.15s;
}
.breakdown-row:hover { background: rgba(255,255,255,0.04); }

/* Dots neon */
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot--green  { background: #00ff87; box-shadow: 0 0 8px #00ff87; }
.dot--yellow { background: #ffdd00; box-shadow: 0 0 8px #ffdd00; }
.dot--cyan   { background: #00e5ff; box-shadow: 0 0 8px #00e5ff; }

.breakdown-label {
  color: #8aaad0;
  font-size: 13px;
  font-weight: 600;
}

/* Números neon */
.breakdown-num {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
}
.breakdown-num--green  { color: #00ff87; text-shadow: 0 0 12px rgba(0,255,135,0.6); }
.breakdown-num--yellow { color: #ffdd00; text-shadow: 0 0 12px rgba(255,221,0,0.6); }
.breakdown-num--cyan   { color: #00e5ff; text-shadow: 0 0 12px rgba(0,229,255,0.6); }

/* Barras de progreso */
.breakdown-bar-wrap {
  height: 5px;
  background: rgba(255,255,255,0.06);
  border-radius: 10px;
  overflow: hidden;
}
.breakdown-bar {
  height: 100%;
  border-radius: 10px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.breakdown-bar--green  { background: linear-gradient(90deg, #00ff87, #00c96a); box-shadow: 0 0 8px rgba(0,255,135,0.5); }
.breakdown-bar--yellow { background: linear-gradient(90deg, #ffdd00, #e6a800); box-shadow: 0 0 8px rgba(255,221,0,0.5); }
.breakdown-bar--cyan   { background: linear-gradient(90deg, #00e5ff, #0099cc); box-shadow: 0 0 8px rgba(0,229,255,0.5); }

/* ── Animación slide ── */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 300px;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
}

/* ── Lista ── */
.list-container {
  margin: 14px 16px 100px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #1e3460;
}
.list-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  background: #0d1830;
  color: #4a6a9a;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}
.list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 16px;
  border-top: 1px solid #1a2d50;
  background: #131f3d;
  transition: background 0.15s;
}
.list-row:hover { background: #1a2d50; }

.clave-num {
  font-size: 14px;
  color: #dce8f8;
  font-weight: 600;
}

/* Badges neon */
.status-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 0.3px;
  background: #1e3355;
  color: #7eaadd;
  border: 1px solid #2e4a70;
}
.badge--green  {
  background: rgba(0, 255, 135, 0.08);
  color: #00ff87;
  border-color: rgba(0, 255, 135, 0.25);
  text-shadow: 0 0 8px rgba(0,255,135,0.4);
}
.badge--yellow {
  background: rgba(255, 221, 0, 0.08);
  color: #ffdd00;
  border-color: rgba(255, 221, 0, 0.25);
  text-shadow: 0 0 8px rgba(255,221,0,0.4);
}
.badge--cyan {
  background: rgba(0, 229, 255, 0.08);
  color: #00e5ff;
  border-color: rgba(0, 229, 255, 0.25);
  text-shadow: 0 0 8px rgba(0,229,255,0.4);
}
</style>