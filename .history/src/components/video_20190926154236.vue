<template>
  <div
    class="videoWarpper"
    ref="videoDom"
  >
    <video
      id="video"
      :src="src"
      @canplay="canplay"
      @timeupdate="timeupdate"
    ></video>
    <div class="v_playIcon"></div>
    <div class="v_controls">
      <div class="v_process">
        <div
          class="v_currentLine"
          :style="{width: lineWidth + 'px' }"
        >
          <div class="v_point"></div>
        </div>
      </div>
      <div class="v_toolbar">
        <div
          class="v_pause iconfont iconbofangqi-bofang"
          :class="{'iconbofangqi-zanting': !playPause}"
        ></div>
        <div class="v_time">{{currentTime}} / {{timeDuration}}</div>
        <div class="v_volume"></div>
        <div class="v_fullScreen"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js'
export default {
  name: 'video',
  props: {
    msg: String
  },
  data() {
    return {
      uid: this._uid,
      playPause: true,
      timeDuration: 0,
      currentTime: 0,
      lineWidth: 0,
      src:
        'https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/3_d97abb65fc36a1d689efd3a105bebce1.mp4'
    }
  },
  mounted() {
    this.video = document.querySelector('#video')
    this.warpper = this.$refs.videoDom
    this.pausebtn = this.warpper.querySelector('.v_pause')
    this.vpoint = this.warpper.querySelector('.v_point')
    this.vprocess = this.warpper.querySelector('.v_process')
    this.uploadCss()
    this.initEvent()
    this.initTxt()
    // if (Hls.isSupported()) {
    //   let hls = new Hls()
    //   // debugger
    //   hls.loadSource(this.src)
    //   hls.attachMedia(this.video)
    // }
  },
  methods: {
    formatTime(time) {
      let hour = Math.floor(time / 60 / 60)
      let minute = Math.floor((time / 60) % 60)
      let second = Math.floor(time % 60)
      hour = hour > 10 ? hour : '0' + hour
      minute = minute > 10 ? minute : '0' + minute
      second = second > 10 ? second : '0' + second

      return hour === '00'
        ? `${minute}:${second}`
        : `${hour}:${minute}:${second}`
    },
    canplay() {
      this.timeDuration = this.formatTime(this.video.duration)
    },
    timeupdate() {
      this.update()
    },
    update() {
      this.currentTime = this.formatTime(this.video.currentTime)
      this.lineWidth =
        (this.video.currentTime / this.video.duration) *
        this.vprocess.clientWidth
    },
    initTxt() {
      this.currentTime = this.formatTime(0)
    },
    initEvent() {
      this.pausebtn.onclick = () => {
        if (this.playPause) {
          this.video.play()
        } else {
          this.video.pause()
        }
        this.playPause = !this.playPause
      }

      this.vprocess.onmousedown = e => {
        e.stopPropagation()
        this.clientX = e.clientX
        this.canMove = true
      }
      this.video.onmousemove = e => {
        if (this.canMove) {
          this.video.pause()
          let disX = e.clientX - this.clientX
          this.lineWidth = disX
        }
      }
      this.video.onmouseup = e => {
        debugger
        this.canMove = false
      }
    },
    uploadCss() {
      if (this.elementLink) return
      this.elementLink = document.createElement('link')
      this.elementLink.href = '//at.alicdn.com/t/font_1435964_cwkie7iqkos.css'
      this.elementLink.setAttribute('rel', 'stylesheet')
      document.body.append(this.elementLink)
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
.v_controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
}
.v_controls .v_process {
  width: 96%;
  cursor: pointer;
  margin: 0 auto;
  background: #fff;
  height: 3px;
  position: relative;
  background: rgba(255, 255, 255, 0.3);
}
.v_toolbar {
  display: flex;
  padding: 5px 2%;
  align-items: center;
}
.v_time {
  color: rgba(255, 255, 255, 0.6);
}
.iconbofangqi-bofang {
  font-size: 28px;
  color: rgba(255, 255, 255, 0.6);
}
.v_currentLine {
  position: absolute;
  z-index: 2;
  background: #00fff6;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
}
.v_point {
  background: #00fff6;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: -3px;
  right: -10px;
}
</style>
