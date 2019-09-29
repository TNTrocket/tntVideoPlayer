<template>
  <div id="app">
    <div class="warpper">
      <tntPlayer ref="test" />
    </div>

  </div>
</template>

<script>
import tntPlayer from './components/player.vue'

export default {
  name: 'app',
  components: {
    tntPlayer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  margin: 0;
  padding: 0;
}
.warpper {
  width: 800px;
  /* height: 300px; */
  margin: 0 auto;
}
</style>
