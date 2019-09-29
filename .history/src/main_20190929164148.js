import Vue from 'vue'
import App from './App.vue'
import tntPlayer from '../dist/tntPlayer.js'
// let  tntPlayer= require('../dist/tntplayer')
Vue.config.productionTip = false
console.log('tnt',tntPlayer)
Vue.use(tntPlayer)
new Vue({
  render: h => h(App),
}).$mount('#app')
