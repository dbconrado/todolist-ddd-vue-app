<template>
  <div id="app">
    <TopBarComponent v-if="auth.loggedIn()" />
    <div class="progress" v-if="loading">
      <div class="indeterminate"></div>
    </div>
    <main>
      <div class="container">
        <img alt="Vue logo" src="./assets/logo.png">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import TaskListComponent from './components/TaskListComponent.vue'
import TopBarComponent from './components/TopBarComponent'
import VueRouter from 'vue-router'
import LoginComponentVue from './components/LoginComponent.vue'
import authService from './services/AuthService';

function requireAuth(to, from, next) {
  if (!authService.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next();
  }
}

const routes = [
  { path: '/login', component: LoginComponentVue },
  { path: '/', component: TaskListComponent, beforeEnter: requireAuth },
  { path: '/logout', beforeEnter (to, from, next) {
    authService.logout();
    next('/login');
  } }
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

export default {
  name: 'App',
  components: {
    TopBarComponent
  },
  router,
  data: () => ({
    loading: false,
    auth: authService
  }),
  methods: {
    hideProgress() {
      this.loading = false;
    },
    showProgress() {
      this.loading = true;
    }
  }
}

</script>

<style scoped>
.progress {
  margin: 0;
}
</style>