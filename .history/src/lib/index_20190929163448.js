import player from './player.vue'
let obj = {}
obj.install= function(vue){
    vue.component(player.name, player)
}


export default player