<template>
  <transition name="fade">
    <div class="title-shadow"  v-show="showTitle" @click="hide">
      <div class="title-box" @click.stop>
        <div class="title-top">
          <div class="title">{{title}}</div>
          <div class="data-bottom">
            <div class="textarea-number">{{note.length}}<span>/{{maxLength}}</span></div>
            <textarea class="data-area" @touchmove.stop v-model="note" :maxlength="maxLength" :placeholder="placeholder"></textarea>
          </div>
        </div>
        <div class="title-btn border-top-1px" @click="submitTitle">确定</div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'title-box',
    data() {
      return {
        note: '',
        title: '标题',
        placeholder: '请输入标题',
        showTitle: false,
        type: 'title',
        maxLength: 40
      }
    },
    methods: {
      showTitleBox(obj) {
        this.note = obj.text || ''
        this.title = obj.title || '标题'
        this.placeholder = obj.placeholder || '请输入标题'
        this.type = obj.type || 'title'
        this.maxLength = obj.maxLength || 40
        this.showTitle = true
      },
      submitTitle() {
        this.showTitle = false
        this.$emit('submitMsg', this.note, this.type)
      },
      hide() {
        this.showTitle = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .title-shadow
    position: fixed
    width: 100vw
    height: 100vh
    left: 0
    top: 0
    z-index: 555
    background: rgba(54,53,71,0.80)
  .title-box
    background: $color-white
    min-height: 225px
    width: 300px
    border-radius: 1px
    all-center()
    .title-top
      box-sizing: border-box
      padding: 25px 15px 0 20px
      min-height: 180px
      border-bottom-1px(rgba(32,32,46,0.1))
      .title
        font-family: $font-family-regular
        color: $color-363537
        font-size: $font-size-16
        margin-bottom: 18px
      .data-area
        width: 100%
        font-size: $font-size-14
        resize: none
        border: 0 none
        outline: none
    .title-btn
      height: 45px
      width: 100%
      line-height: 45px
      color: $color-EF705D
      font-size: $font-size-14
      font-family: $font-family-medium
      text-align: center
  .data-bottom
    position: relative
    z-index: 71
    border-bottom-1px(rgba(236,237,241,1))
    .title
      font-size: $font-size-medium
      color: $color-text-88
      font-family: $font-family-regular
    .data-area
      box-sizing: border-box
      width: 100%
      border-color: rgba(0, 0, 0, 0)
      font-size: $font-size-medium
      color: $color-20202E
      font-family: $font-family-regular
      height: 95px
      outline:none
      padding: 0 !important
      word-break: break-all
    .data-area::-webkit-input-placeholder
      color: $color-9B9B9B
    .data-area::-ms-input-placeholder
      color: $color-9B9B9B
    .data-area::-moz-placeholder
      color: $color-9B9B9B
    .textarea-number
      position: absolute
      bottom: 8px
      right: 0
      font-family: $font-family-regular
      color: $color-CCCCCC
      font-size: $font-size-12
</style>
