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

      <!-- Contador -->
      <div class="top-bar">
        <div class="total-pill">
          <ion-icon :icon="peopleOutline"></ion-icon>
          <span>{{ listaUsuarios.length }} usuarios registrados</span>
        </div>
      </div>

      <!-- Cards de usuarios -->
      <div class="cards-container">
        <div
          v-for="(item, index) in listaUsuarios"
          :key="index"
          class="user-card"
        >
          <div class="user-avatar">
            {{ initials(item) }}
          </div>
          <div class="user-info">
            <span class="user-name">{{ item.nombre }} {{ item.apellido }}</span>
            <span class="user-email">{{ item.email }}</span>
            <span class="user-id">ID: {{ listaUsers[index] }}</span>
          </div>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/vue';
import { peopleOutline } from 'ionicons/icons';
import { getDatabase, ref, onValue } from "firebase/database";

export default {
  name: "Tab2",
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon },
  data() {
    return { listaUsuarios: [], listaUsers: [] };
  },
  setup() { return { peopleOutline }; },
  mounted() {
    onValue(ref(getDatabase(), "usuario/"), (snapshot) => {
      this.listaUsuarios = [];
      this.listaUsers = [];
      snapshot.forEach(el => {
        this.listaUsers.push(el.key);
        this.listaUsuarios.push(el.toJSON());
      });
    });
  },
  methods: {
    initials(item) {
      const n = item.nombre?.[0] || '';
      const a = item.apellido?.[0] || '';
      return (n + a).toUpperCase() || '?';
    }
  }
};
</script>

<style scoped>
.toolbar-title { display: flex; align-items: center; gap: 8px; }
.title-icon { font-size: 20px; color: #7eaadd; }

/* ── Top bar ── */
.top-bar {
  padding: 14px 16px 6px;
}
.total-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #162040;
  border: 1px solid #1e3460;
  border-radius: 20px;
  padding: 6px 14px;
  color: #7eaadd;
  font-size: 13px;
  font-weight: 600;
}

/* ── Cards ── */
.cards-container {
  padding: 8px 16px 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #131f3d;
  border: 1px solid #1e3460;
  border-radius: 16px;
  padding: 14px 16px;
  transition: background 0.15s, transform 0.15s;
}
.user-card:hover {
  background: #1a2d50;
  transform: translateX(3px);
}

.user-avatar {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: linear-gradient(135deg, #2a6dd9 0%, #1a3fa8 100%);
  box-shadow: 0 4px 12px rgba(42, 109, 217, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.user-name {
  color: #dce8f8;
  font-size: 15px;
  font-weight: 600;
}

.user-email {
  color: #7eaadd;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-id {
  color: #4a6a9a;
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>