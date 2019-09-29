import player from './player.vue'

let vueInstall= function(vue){
    vue.component(player.name, player)
}

console.log(vueInstall, player)
export default {
    install: vueInstall
}