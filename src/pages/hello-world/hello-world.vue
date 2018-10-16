<template>
  <div class="demo">
    <h1>截图上传</h1>
    <cropper ref="cropper" @confirm="cropperConfirm($event)"></cropper>
    <input type="file" @change="_fileChange($event, 'images')" accept="image/*"/>
    <hr>
    <h1>直接上传</h1>
    <input type="file" @change="_fileChange($event, 'images-only')" accept="image/*"/>
    <img v-if="testSrc" style="width: 100%" :src="testSrc" alt="">
    <hr>
    <h1>点播上传</h1>
    <input type="file" @change="_fileChange($event, 'video')" accept="video/*"/>
    <video v-if="testVideo" :src="testVideo" style="width: 100vw"></video>
    <hr>
    <h1>二维码</h1>
    <button @click="createQrCode">生成二维码</button>
    <router-view-common></router-view-common>
  </div>
</template>

<script>
  import Cropper from 'components/cropper/cropper'
  import { Upload, Global } from 'api'
  import wx from 'weixin-js-sdk'
  import qr from 'qr-image'

  export default {
    components: {
      Cropper
    },
    data() {
      return {
        testSrc: '',
        testVideo: ''
      }
    },
    created() {
      this._getWxSdk()
    },
    methods: {
      createQrCode() {
        let buffer = qr.imageSync('http://www.google.com', {type: 'png'})
        let blob = new Blob([buffer])
        this.$handle.blobToDataURL(blob, b64 => {
          this.testSrc = b64
        })
      },
      _getWxSdk() {
        let url = window.location.href
        Global.jssdkConfig({url}).then((res) => {
          if (res.error === this.$ERR_OK) {
            res = res.data
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: '' + res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
              timestamp: '' + res.timestamp, // 必填，生成签名的时间戳
              nonceStr: '' + res.nonceStr, // 必填，生成签名的随机串
              signature: '' + res.signature, // 必填，签名，见附录1
              jsApiList: ['previewImage', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
          }
        })
      },
      _fileChange(e, type) {
        let arr = Array.from(e.target.files)
        switch (type) {
          case 'images' :
            this.$refs.cropper.show(arr[0])
            break
          case 'images-only' :
            let file = new FormData()
            file.append('file', arr[0], arr[0].name)
            Upload.upLoadImage(file).then(res => {
              this.$loading.hide()
              if (res.error !== this.$ERR_OK) {
                return this.$toast.show(res.message)
              }
              this.testSrc = res.data.url
            })
            break
          case 'video' :
            this.$loading.show('视频上传中...')
            this.$vod.uploadFiles(arr[0], curr => {
              this.$loading.showCurr(curr)
            }).then(res => {
              this.$loading.hide()
              if (res.error !== this.$ERR_OK) {
                this.$toast.show(res.message)
                return
              }
              this.testVideo = res.vod.videoUrl
            })
            break
          default:
            break
        }
      },
      cropperConfirm(e) {
        this.$loading.show()
        let blob = this.$handle.getBlobBydataURI(e)
        let file = this.$handle.createFormData(blob)
        Upload.upLoadImage(file).then(res => {
          if (res.error !== this.$ERR_OK) {
            return this.$toast.show(res.message)
          }
          this.testSrc = res.data.url
          this.$loading.hide()
          this.$refs.cropper.cancel()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
