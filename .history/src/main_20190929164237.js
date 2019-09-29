import Vue from 'vue'
import App from './App.vue'
// import tntPlayer from '../dist/tntPlayer'
let  tntPlayer= require('../dist/tntPlayer')
Vue.config.productionTip = false
console.log('tnt',tntPlayer)
Vue.use(tntPlayer)
new Vue({
  render: h => h(App),
}).$mount('#app')
