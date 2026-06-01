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

      <!-- Stats row -->
      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-num">{{ total }}</span>
          <span class="stat-label">Total</span>
        </div>
        <div class="stat-card stat-card--green">
          <span class="stat-num">{{ disponibles }}</span>
          <span class="stat-label">Disponibles</span>
        </div>
        <div class="stat-card stat-card--yellow">
          <span class="stat-num">{{ generados }}</span>
          <span class="stat-label">Generados</span>
        </div>
        <div class="stat-card stat-card--blue">
          <span class="stat-num">{{ utilizados }}</span>
          <span class="stat-label">Usados</span>
        </div>
      </div>

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
import { keyOutline } from 'ionicons/icons';
import { getDatabase, ref, onValue } from "firebase/database";

export default {
  name: "Tab1",
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon },
  data() {
    return { listaClaves: [], listaKeys: [] };
  },
  setup() { return { keyOutline }; },
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
    statusClass(status) {
      if (!status) return '';
      const s = status.toLowerCase();
      if (s.includes('disponible')) return 'badge--green';
      if (s.includes('generado'))   return 'badge--yellow';
      if (s.includes('utilizado') || s.includes('usado')) return 'badge--blue';
      return '';
    }
  }
};
</script>

<style scoped>
/* ── Stats ── */
.stats-row {
  display: flex;
  gap: 10px;
  padding: 16px 16px 8px;
}
.stat-card {
  flex: 1;
  background: #162040;
  border: 1px solid #1e3460;
  border-radius: 14px;
  padding: 12px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.stat-card--green { border-color: #1e4d35; background: #0f2a1c; }
.stat-card--yellow { border-color: #4d3c10; background: #251e08; }
.stat-card--blue  { border-color: #1e3a5f; background: #0c1e35; }

.stat-num {
  font-size: 22px;
  font-weight: 700;
  color: #dce8f8;
}
.stat-card--green  .stat-num { color: #5fd18a; }
.stat-card--yellow .stat-num { color: #f0c040; }
.stat-card--blue   .stat-num { color: #7eaadd; }

.stat-label {
  font-size: 10px;
  color: #4a6a9a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ── Lista ── */
.list-container {
  margin: 8px 16px 100px;
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

/* ── Badges ── */
.status-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  background: #1e3355;
  color: #7eaadd;
  border: 1px solid #2e4a70;
  letter-spacing: 0.3px;
}
.badge--green  { background: #0f2a1c; color: #5fd18a; border-color: #1e4d35; }
.badge--yellow { background: #251e08; color: #f0c040; border-color: #4d3c10; }
.badge--blue   { background: #0c1e35; color: #7eaadd; border-color: #1e3a5f; }

/* Toolbar */
.toolbar-title { display: flex; align-items: center; gap: 8px; }
.title-icon { font-size: 20px; color: #7eaadd; }
</style>