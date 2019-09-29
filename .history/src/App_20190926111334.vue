<template>
  <div id="app">
    <div class="warpper">
      <tntVideo  ref="test"/>
    </div>

  </div>
</template>

<script>
import tntVideo from './components/video.vue'

export default {
  name: 'app',
  components: {
    tntVideo
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
*{
  margin: 0;
  padding: 0;
}
.warpper{
  width: 100%;
  height: 300px;
}
</style>
