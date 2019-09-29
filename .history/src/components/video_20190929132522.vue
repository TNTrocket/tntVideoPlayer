<template>
  <div
    class="videoWarpper"
    ref="videoDom"
  >
    <video
      class="v_video"
      :src="src"
      preload="auto"
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
        <div
          class="v_volume iconfont iconyinliang"
          :class="{'iconjingyin': isNoSound}"
        >
          <div
            class="v_volumeWarpper"
            v-show="isShowVolume"
          >
            <div class="v_volumeBar">
              <div
                class="v_volumeLine"
                :style="{height: lineVolumeHeight+ 'px'}"
              >
                <div class="v_volumePoint"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="v_speed">{{speedTxt}}
          <div
            class="speedList"
            v-show="isShowSpeed"
          >
            <div data-speed="1">1x</div>
            <div data-speed="1.5">1.5x</div>
            <div data-speed="2">2x</div>
          </div>
        </div>
        <div class="v_fullScreen iconfont iconquanping"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js'
export default {
  name: 'player',
  props: {
    type: String
  },
  data() {
    return {
      playPause: true,
      timeDuration: 0,
      currentTime: 0,
      lineWidth: 0,
      lineVolumeHeight: 0,
      isShowVolume: false,
      isNoSound: true,
      speedTxt: '1x',
      isShowSpeed: false,
      src:
        'https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/3_d97abb65fc36a1d689efd3a105bebce1.mp4'
    }
  },
  mounted() {
    this.warpper = this.$refs.videoDom
    this.video = this.warpper.querySelector('.v_video')
    this.pausebtn = this.warpper.querySelector('.v_pause')
    this.vpoint = this.warpper.querySelector('.v_point')
    this.vprocess = this.warpper.querySelector('.v_process')
    this.vfullScreen = this.warpper.querySelector('.v_fullScreen')
    this.vvolume = this.warpper.querySelector('.v_volume')
    this.vvolumePoint = this.warpper.querySelector('.v_volumePoint')
    this.vvolumeBar = this.warpper.querySelector('.v_volumeBar')
    this.speedList = this.warpper.querySelector('.speedList')
    this.vspeed = this.warpper.querySelector('.v_speed')

    this.clientX = this.vpoint.getBoundingClientRect().left + 5
    this.clientVolumeY = this.vvolumePoint.getBoundingClientRect().top + 5
    this.downloadCss()
    this.initEvent()
    this.initTxt()
    if (this.type === 'hls') {
      if (Hls.isSupported()) {
        let hls = new Hls()
        hls.loadSource(this.src)
        hls.attachMedia(this.video)
      }
    }
  },
  methods: {
    initEvent() {
      this.processBarEvent()
      this.speedEvent()
      this.fullScreenEvent()
      this.volumeEvent()
    },
    volumeEvent() {
      this.vvolume.onmouseover = () => {
        this.isShowVolume = true
        this.volumeMove()
      }
      this.vvolume.onmouseleave = () => {
        this.isShowVolume = false
        this.vvolumePoint.onmousedown = null
      }
      this.vvolumeBar.onclick = () => {}
    },
    fullScreenEvent() {
      this.vfullScreen.onclick = () => {
        if (this.isFullScreen()) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        } else {
          let requestFullScreen =
            this.video.requestFullScreen ||
            this.video.webkitRequestFullScreen ||
            this.video.mozRequestFullScreen ||
            this.video.msRequestFullscreen
          requestFullScreen.call(this.video)
        }
      }
    },
    speedEvent() {
      this.speedList.onclick = e => {
        let dataSpeed = e.target.dataset.speed
        this.video.playbackRate = dataSpeed
        this.speedTxt = dataSpeed + 'x'
      }
      this.vspeed.onmouseover = () => {
        this.isShowSpeed = true
      }
      this.vspeed.onmouseleave = () => {
        this.isShowSpeed = false
      }
    },
    processBarEvent() {
      this.video.onclick = this.pausebtn.onclick = e => {
        e.preventDefault()
        e.stopPropagation()
        if (this.playPause) {
          this.video.play()
        } else {
          this.video.pause()
        }
        this.playPause = !this.playPause
      }

      this.vprocess.onmousedown = e => {
        e.stopPropagation()
        e.preventDefault()
        this.offsetX = e.clientX - this.clientX
        this.processmove()
      }
      this.vpoint.onmousedown = e => {
        e.stopPropagation()
        e.preventDefault()
        this.movedown()
      }
    },
    initTxt() {
      this.currentTime = this.formatTime(0)
    },
    isFullScreen() {
      return (
        document.isFullScreen ||
        document.webkitIsFullScreen ||
        document.mozIsFullScreen
      )
    },

    volumeMoveEventCall(e) {
      // let disY = e.clientY - this.volumeY
      this.lineVolumeHeight = this.disVolumeY 
      if (this.lineVolumeHeight > this.vvolumeBar.clientHeight) {
        this.lineVolumeHeight = this.vvolumeBar.clientHeight
        return
      }
      if (this.lineVolumeHeight < 0) {
        this.lineVolumeHeight = 0
        this.isNoSound = true
        return
      } else {
        this.isNoSound = false
      }
      this.video.volume =
        ((this.vvolumeBar.clientHeight - this.lineVolumeHeight) /
          this.vvolumeBar.clientHeight) *
        1
      // this.volumeY = e.clientY
    },
    volumeMove() {
      this.vvolumePoint.onmousedown = e => {
        e.preventDefault()
        e.stopPropagation()
        this.disVolumeY = e.clientY - this.clientVolumeY
        document.onmousemove = this.volumeMoveEventCall
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    },
    downloadCss() {
      if (this.elementLink) return
      this.elementLink = document.createElement('link')
      this.elementLink.href = '//at.alicdn.com/t/font_1435964_cwkie7iqkos.css'
      this.elementLink.setAttribute('rel', 'stylesheet')
      document.body.append(this.elementLink)
    },
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
      if (this.progressMove) return
      this.currentTime = this.formatTime(this.video.currentTime)
      this.lineWidth =
        (this.video.currentTime / this.video.duration) *
        this.vprocess.clientWidth
    },

    movedown() {
      document.onmousemove = e => {
        this.progressMove = true
        e.preventDefault()
        e.stopPropagation()
        this.offsetX = e.clientX - this.clientX
        this.processmove(e)
      }
      document.onmouseup = e => {
        e.stopPropagation()
        this.progressMove = false
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    processmove() {
      if (this.lineWidth < 0) {
        this.lineWidth = 0
        // this.clientX = 0
        return
      }
      this.lineWidth = this.offsetX
      if (this.lineWidth > this.vprocess.clientWidth) {
        this.lineWidth = this.vprocess.clientWidth
      }

      this.video.currentTime = parseFloat(
        (this.lineWidth / this.vprocess.clientWidth) * this.video.duration
      )
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
.v_video {
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
  justify-content: flex-start;
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
.v_volume {
  height: 100%;
  margin-left: auto;
  font-size: 24px;
  margin-right: 30px;
  color: rgba(255, 255, 255, 0.6);
  position: relative;
}
.v_fullScreen {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
  margin-right: 10px;
}
.v_volumeWarpper {
  position: absolute;
  top: -66px;
  cursor: pointer;
  left: 0;
  width: 30px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v_volumeBar {
  background: #00fff6;
  width: 4px;
  height: 50px;

  border-radius: 3px;
}
.v_volumeLine {
  background: #a3a3a3;
  width: 100%;
  border-radius: 3px;
  position: relative;
}
.v_volumePoint {
  background: #00fff6;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  bottom: -3px;
  right: -3px;
}
.v_speed {
  margin-right: 30px;
  color: rgba(255, 255, 255, 0.6);
  position: relative;
  cursor: pointer;
  width: 30px;
}
.speedList {
  position: absolute;
  top: -80px;
  height: 80px;
}
</style>
