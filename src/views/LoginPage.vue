<template>
  <ion-page>
    <!-- Splash -->
    <div v-if="showSplash" class="splash">
      <div class="splash-logo-box">
        <ion-icon :icon="qrCodeOutline" class="splash-icon"></ion-icon>
      </div>
      <h1 class="splash-title">Monitor QR</h1>
      <p class="splash-sub">Boletos electrónicos</p>
    </div>

    <!-- Login -->
    <ion-content v-else :fullscreen="true" class="login-content">
      <div class="login-wrapper">

        <div class="login-header">
          <div class="logo-box">
            <ion-icon :icon="qrCodeOutline" class="logo-icon"></ion-icon>
          </div>
          <h2 class="login-title">Monitor QR</h2>
          <p class="login-sub">Boletos electrónicos</p>
        </div>

        <div class="login-form">

          <div class="input-group">
            <ion-icon :icon="mailOutline" class="input-icon"></ion-icon>
            <ion-input
              v-model="email"
              type="email"
              placeholder="Email"
              class="login-input"
            ></ion-input>
          </div>

          <div class="input-group">
            <ion-icon :icon="lockClosedOutline" class="input-icon"></ion-icon>
            <ion-input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="login-input"
            ></ion-input>
            <ion-icon
              :icon="showPassword ? eyeOffOutline : eyeOutline"
              class="eye-toggle"
              @click="showPassword = !showPassword"
            ></ion-icon>
          </div>

          <p v-if="errorMsg" class="error-msg">
            <ion-icon :icon="alertCircleOutline"></ion-icon>
            {{ errorMsg }}
          </p>

          <!-- Botón con mismo estilo pill que los tabs -->
          <button
            class="login-btn"
            :class="{ 'login-btn--loading': loading }"
            :disabled="loading"
            @click="login"
          >
            <div class="btn-pill">
              <ion-spinner v-if="loading" name="crescent" class="btn-spinner"></ion-spinner>
              <span v-else>Login</span>
            </div>
          </button>

          <div class="login-links">
            <a class="link-text" @click="showForgot = true">Recuperar password</a>
            <a class="link-text" @click="goRegister">Crear cuenta</a>
          </div>

        </div>
      </div>
    </ion-content>

    <ion-alert
      :is-open="showForgot"
      header="Recuperar contraseña"
      message="Contacta al administrador del sistema para recuperar tu acceso."
      :buttons="[{ text: 'Entendido', handler: () => showForgot = false }]"
    ></ion-alert>

  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonInput, IonIcon, IonSpinner, IonAlert } from '@ionic/vue';
import {
  qrCodeOutline, eyeOutline, eyeOffOutline,
  mailOutline, lockClosedOutline, alertCircleOutline
} from 'ionicons/icons';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "LoginPage",
  components: { IonPage, IonContent, IonInput, IonIcon, IonSpinner, IonAlert },
  data() {
    return {
      email: '', password: '', loading: false,
      errorMsg: '', showPassword: false,
      showSplash: true, showForgot: false,
    };
  },
  setup() {
    return { qrCodeOutline, eyeOutline, eyeOffOutline, mailOutline, lockClosedOutline, alertCircleOutline };
  },
  mounted() {
    setTimeout(() => { this.showSplash = false; }, 2000);
  },
  methods: {
    async login() {
      this.errorMsg = '';
      if (!this.email || !this.password) {
        this.errorMsg = 'Ingresa tu correo y contraseña.';
        return;
      }
      this.loading = true;
      try {
        await signInWithEmailAndPassword(getAuth(), this.email, this.password);
        this.$router.replace('/tabs/tab1');
      } catch (error) {
        const msgs = {
          'auth/invalid-credential': 'Correo o contraseña incorrectos.',
          'auth/user-not-found':     'Correo o contraseña incorrectos.',
          'auth/wrong-password':     'Correo o contraseña incorrectos.',
          'auth/invalid-email':      'Formato de correo inválido.',
          'auth/too-many-requests':  'Demasiados intentos. Intenta más tarde.',
        };
        this.errorMsg = msgs[error.code] || 'Error al iniciar sesión.';
      } finally {
        this.loading = false;
      }
    },
    goRegister() {
      this.errorMsg = 'El registro es solo por el administrador.';
    }
  },
};
</script>

<style scoped>
/* ── SPLASH ── */
.splash {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0d1830;
  z-index: 999;
  animation: fadeIn 0.4s ease;
}
.splash-logo-box {
  width: 90px;
  height: 90px;
  border: 2px solid rgba(200, 220, 255, 0.3);
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  background: rgba(42, 109, 217, 0.15);
}
.splash-icon { font-size: 46px; color: #7eaadd; }
.splash-title {
  color: #dce8f8;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px;
  letter-spacing: 0.5px;
}
.splash-sub { color: rgba(220,232,248,0.45); font-size: 13px; margin: 0; }

/* ── LOGIN ── */
.login-content { --background: #0f1a35; }

.login-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 32px;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 44px;
}
.logo-box {
  width: 80px;
  height: 80px;
  border: 2px solid rgba(126, 170, 221, 0.3);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(42, 109, 217, 0.12);
  margin-bottom: 18px;
}
.logo-icon { font-size: 40px; color: #7eaadd; }
.login-title {
  color: #dce8f8;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 6px;
}
.login-sub { color: rgba(220,232,248,0.4); font-size: 13px; margin: 0; }

/* ── Inputs ── */
.login-form {
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #1e3460;
  transition: border-color 0.2s;
}
.input-group:focus-within { border-bottom-color: #2a6dd9; }

.input-icon {
  color: #4a6a9a;
  font-size: 18px;
  flex-shrink: 0;
  margin-right: 10px;
}

.login-input {
  --background: transparent;
  --color: #dce8f8;
  --placeholder-color: #4a6a9a;
  --padding-start: 0;
  --padding-end: 32px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  font-size: 15px;
  flex: 1;
}

.eye-toggle {
  position: absolute;
  right: 4px;
  color: #4a6a9a;
  font-size: 19px;
  cursor: pointer;
  transition: color 0.2s;
}
.eye-toggle:hover { color: #7eaadd; }

/* ── Error ── */
.error-msg {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ff7b7b;
  font-size: 13px;
  margin: 0;
}

/* ── Botón pill (mismo sistema que los tabs) ── */
.login-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 100%;
  margin-top: 8px;
  transition: transform 0.18s ease;
}
.login-btn:active { transform: scale(0.96); }
.login-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-pill {
  width: 100%;
  height: 50px;
  border-radius: 15px;
  background: linear-gradient(135deg, #2a6dd9 0%, #1a3fa8 100%);
  box-shadow:
    0 4px 20px rgba(42, 109, 217, 0.45),
    0 1px 3px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.18s ease;
}

.login-btn:hover:not(:disabled) .btn-pill {
  background: linear-gradient(135deg, #3a7de9 0%, #2a4fb8 100%);
  box-shadow: 0 6px 24px rgba(42, 109, 217, 0.6);
  transform: translateY(-2px);
}
.login-btn:active:not(:disabled) .btn-pill {
  transform: translateY(0px) scale(0.98);
  box-shadow: 0 2px 10px rgba(42, 109, 217, 0.3);
}

.btn-spinner { --color: white; width: 20px; height: 20px; }

/* ── Links ── */
.login-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}
.link-text {
  color: #4a6a9a;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s;
}
.link-text:hover { color: #7eaadd; }

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
}
</style>