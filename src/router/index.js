import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  { path: '/', redirect: '/login' }, // ← cambiar redirect a /login
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/tabs/tab1' },
      { path: 'tab1', component: () => import('@/views/Tab1Page.vue') },
      { path: 'tab2', component: () => import('@/views/Tab2Page.vue') },
      { path: 'tab3', component: () => import('@/views/Tab3Page.vue') },
      { path: 'tab4', component: () => import('@/views/Tab4Page.vue') }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

function getCurrentUser() {
  return new Promise((resolve) => {
    const auth = getAuth();
    // onAuthStateChanged garantiza que Firebase ya cargó el estado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth);
  const user = await getCurrentUser();

  if (requiresAuth && !user) return '/login';
  if (to.path === '/login' && user) return '/tabs/tab1';
});

export default router;