<template>

  <div class="videoWarpper">
    <video
      id="video"
      :src="src"
    ></video>
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

    // if (Hls.isSupported()) {
    //   let hls = new Hls()
    //   // debugger
    //   hls.loadSource(this.src)
    //   hls.attachMedia(this.video)
    // }
  },
  methods: {
    initEvent() {},
    uploadCss(){
       let element = document.createElement('link')
       element.src = '//at.alicdn.com/t/font_1435964_cwkie7iqkos.css'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.videoWarpper {
  width: 100%;
  height: 100%;
}
#video {
  width: 100%;
  height: 100%;
}
</style>
