import player from './player.vue'

console.log('player', player)
player.install= function(vue){
    vue.component(player.name, player)
}