import player from './player.vue'
let obj = {}
console.log('player', player)
obj.install= function(vue){
    console.log(vue)
    vue.component(player.name, player)
}


export default obj