<template>
  <div id="app">
    <nav class="cyan darken-3">
      <div class="container">
        <div class="nav-wrapper">
          <a href="#" data-target="main-menu" class="button-collapse show-on-large sidenav-trigger">
            <i class="fa fa-bars"></i>
          </a>
          <router-link to="/" class="brand-logo center sidenav-close">Todolist</router-link>
          <ul id="main-menu" class="sidenav">
            <li>
              <router-link to="/" class="sidenav-close"><i class="fa fa-tasks"></i>Tasks</router-link>
            </li>
            <li class="divider"></li>
            <li>
              <router-link to="/logout" class="sidenav-close"><i class="fas fa-sign-out-alt"></i>Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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
import NotFoundComponent from './components/NotFoundComponent.vue'
import M from 'materialize-css'
import VueRouter from 'vue-router'

const routes = [
  { path: '/', component: TaskListComponent },
  { path: '/logout', component: NotFoundComponent }
]

const router = new VueRouter({
  routes
})

export default {
  name: 'App',
  router,
  mounted() {
    M.AutoInit()
  },
  data: () => ({
    loading: false
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