<template>
  <div class="hello">
    <div class="videoWarpper">
      <video
        id="video"
        :src="src"
      ></video>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      src:
        'https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/3_d97abb65fc36a1d689efd3a105bebce1.mp4'
    }
  },
  mounted() {
    this.video = document.querySelector('#video')
    if (Hls.isSupported()) {
      let hls = new Hls()
      hls.loadSource(this.src)
      hls.attachMedia(this.video)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
