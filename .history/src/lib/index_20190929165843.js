import player from './player.vue'

let vueInstall= function(vue){
    vue.component(player.name, player)
}


export default {
    install: vueInstall
}