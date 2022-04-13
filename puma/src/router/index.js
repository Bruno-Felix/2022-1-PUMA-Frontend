import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/usuario/cadastro',
    name: 'Cadastro Usuário',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../views/usuario/cadastro-usuario/CadastroUsuario.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/usuario/login',
    name: 'Entrar',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../views/usuario/login-usuario/LoginUsuario.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/usuario/recoveryPassword',
    name: 'Recuperação Senha',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../views/usuario/recovery-password/RecoveryPassword.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/usuario/newPassword',
    name: 'Nova Senha',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../views/usuario/new-password/NewPassword.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/meus-projetos/listar',
    name: 'Meus Projetos',
    component: () => import('../views/MyProjects/MyProjects.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/meus-projetos/consultar', // consultar/id
    name: 'Consultar Projeto',
    component: () => import('../views/Projects/MyProject/MyProject.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos/cadastrar',
    name: 'Cadastrar de Projeto',
    component: () => import('../views/cadastroProjeto/cadastro-projeto.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos/listar',
    name: 'Projetos',
    component: () => import('../views/SubjectProjects/SubjectProjects.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos/consultar', // ADM E PROF - consultar:id
    name: 'Projetos',
    component: () => import('../views/ProjectEvaluate/projectEvaluate.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/usuario/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (!store.getters.isAuthenticated) {
      next();
    } else {
      next({ path: '/' });
    }
  } else {
    next();
  }
});

export default router;
