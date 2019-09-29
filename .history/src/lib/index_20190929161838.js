import player from './player.vue'
let obj = {}
console.log('player', player)
player.install= function(vue){
    vue.component(player.name, player)
}


export default player