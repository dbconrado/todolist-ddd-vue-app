import Vue from 'vue'
import App from './App.vue'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
