<template>

  <div class="videoWarpper" ref="videoDom">
    <video
      id="video"
      :src="src"
    ></video>
    <div class="v_playIcon"></div>
    <div class="v_controls">
      <div class="v_process"></div>
      <div class="v_toolbar">
        <div class="v_pause iconfont iconbofangqi-bofang"></div>
        <div class="v_time"></div>
        <div class="v_volume"></div>
        <div class="v_fullScreen"></div>
      </div>
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
      uid: this._uid,
      src:
        'http://223.110.243.151/PLTV/2510088/224/3221227202/1.m3u8'
    }
  },
  mounted() {
    this.video = document.querySelector('#video')
    this.warpper = this.$refs.videoDom
    
    this.uploadCss()
    if (Hls.isSupported()) {
      let hls = new Hls()
      // debugger
      hls.loadSource(this.src)
      hls.attachMedia(this.video)
    }
    this.warpper.onclick=()=>{
       this.video.play()
    }
  },
  methods: {
    initEvent() {
    
    },
    uploadCss() {
      let element = document.createElement('link')
      element.href = '//at.alicdn.com/t/font_1435964_cwkie7iqkos.css'
      element.setAttribute('rel', 'stylesheet')
      document.body.append(element)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.videoWarpper {
  width: 100%;
  position: relative;
}
#video {
  width: 100%;
  height: 450px;
  display: block;
}
.v_controls{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent,rgba(0,0,0,.5));
}
.v_controls .v_process{
  width: 96%;
  margin: 0 auto;
  background: #fff;
  height: 3px;
  background: rgba(255,255,255,.3)
}
.v_toolbar{
  display: flex;
  padding: 5px 2%;
  
}
.iconbofangqi-bofang{
  font-size: 28px;
  color:rgba(255,255,255,0.6);
}
</style>
