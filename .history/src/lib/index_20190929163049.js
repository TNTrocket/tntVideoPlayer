import player from './player.vue'

player.install= function(vue){
    vue.component(player.name, player)
}


export default player