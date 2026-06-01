<template>
  <ion-page>
    <ion-content :fullscreen="true" class="login-content">
      <div class="login-wrapper">

        <!-- Logo -->
        <div class="login-header">
          <div class="logo-box">
            <ion-icon :icon="qrCodeOutline" class="logo-icon"></ion-icon>
          </div>
          <h1>QR Trip</h1>
          <p>Monitoreo de boletos electrónicos</p>
        </div>

        <!-- Form -->
        <div class="login-form">
          <div class="input-group">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="login-input"
            />
          </div>

          <div class="input-group">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="login-input"
            />
            <span class="eye-toggle" @click="showPassword = !showPassword">
              <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline"></ion-icon>
            </span>
          </div>

          <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

          <button class="login-btn" :disabled="loading" @click="login">
            <ion-spinner v-if="loading" name="crescent" class="btn-spinner"></ion-spinner>
            <span v-else>Login</span>
          </button>

          <div class="login-links">
            <a href="#">Recuperar password</a>
            <a href="#">Crear cuenta</a>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonIcon, IonSpinner } from '@ionic/vue';
import { qrCodeOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "LoginPage",
  components: { IonPage, IonContent, IonIcon, IonSpinner },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      errorMsg: '',
      showPassword: false,
    };
  },
  setup() {
    return { qrCodeOutline, eyeOutline, eyeOffOutline };
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
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.replace('/tabs/tab1');
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            this.errorMsg = 'Correo o contraseña incorrectos.';
            break;
          case 'auth/invalid-email':
            this.errorMsg = 'Formato de correo inválido.';
            break;
          case 'auth/too-many-requests':
            this.errorMsg = 'Demasiados intentos. Intenta más tarde.';
            break;
          default:
            this.errorMsg = 'Error al iniciar sesión.';
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* ── Fondo ── */
.login-content {
  --background: #1c2b4a;
}

.login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px 32px;
}

/* ── Logo / Header ── */
.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
  color: #c8d8f0;
}

.logo-box {
  width: 80px;
  height: 80px;
  border: 2.5px solid #c8d8f0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo-icon {
  font-size: 42px;
  color: #c8d8f0;
}

.login-header h1 {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 6px;
  color: #dce8f8;
  letter-spacing: 0.5px;
}

.login-header p {
  font-size: 13px;
  color: #8aa4c8;
  margin: 0;
}

/* ── Form ── */
.login-form {
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.input-group {
  position: relative;
}

.login-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #4a6080;
  color: #dce8f8;
  font-size: 15px;
  padding: 12px 36px 12px 4px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.login-input::placeholder {
  color: #6a84a8;
}

.login-input:focus {
  border-bottom-color: #7eaadd;
}

.eye-toggle {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  color: #6a84a8;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
}

/* ── Botón ── */
.login-btn {
  background: #1e3a5f;
  color: #dce8f8;
  border: none;
  border-radius: 6px;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  margin-top: 8px;
  width: 100%;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
}

.login-btn:hover:not(:disabled) {
  background: #254d80;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-spinner {
  --color: #dce8f8;
  width: 20px;
  height: 20px;
}

/* ── Links ── */
.login-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.login-links a {
  color: #7eaadd;
  font-size: 13px;
  text-decoration: none;
}

.login-links a:hover {
  text-decoration: underline;
}

/* ── Error ── */
.error-msg {
  color: #ff7b7b;
  font-size: 13px;
  text-align: center;
  margin: 0;
}
</style>