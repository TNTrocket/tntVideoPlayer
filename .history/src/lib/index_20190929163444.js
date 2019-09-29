import player from './player.vue'
let obj = {}
player.install= function(vue){
    vue.component(player.name, player)
}


export default player