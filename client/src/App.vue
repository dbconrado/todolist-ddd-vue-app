<template>
  <div id="app">
    <nav class="cyan darken-3">
      <div class="container">
        <div class="nav-wrapper">
          <a href="#" data-target="main-menu" class="button-collapse show-on-large sidenav-trigger">
            <i class="fa fa-bars"></i>
          </a>
          <a href="/" class="brand-logo center">Todolist</a>
          <ul id="main-menu" class="sidenav">
            <li>
              <a href="/"><i class="fa fa-tasks"></i>Tasks</a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="/logout"><i class="fas fa-sign-out-alt"></i>Logout</a>
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
        <TaskListComponent />
      </div>
    </main>
  </div>
</template>

<script>
import TaskListComponent from './components/TaskListComponent.vue'
import M from 'materialize-css'

export default {
  name: 'App',
  components: {
    TaskListComponent
  },
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