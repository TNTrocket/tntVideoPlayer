import Vue from 'vue'
import App from './App.vue'
import tntPlayer from 'tntplayer'
Vue.config.productionTip = false
Vue.use(tntPlayer)
new Vue({
  render: h => h(App),
}).$mount('#app')
