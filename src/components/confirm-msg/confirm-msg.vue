<template>
  <transition name="fade">
    <article class="confirm-msg" v-if="isShow">
      <div class="mask" @click="cancel"></div>
      <section class="content" @click.stop>
        <div class="msg">{{msg}}</div>
        <div class="btn-group border-top-1px">
          <div class="btn cancel" v-if="isShowCancel" @click="cancel">取消</div>
          <div class="btn confirm border-left-1px" @click="confirm">确定</div>
        </div>
      </section>
    </article>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      isShowCancel: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        msg: '确定删除吗？',
        isShow: false
      }
    },
    methods: {
      cancel() {
        this.isShow = false
        this.$emit('cancel')
      },
      confirm() {
        this.isShow = false
        this.$emit('confirm')
      },
      close() {
        this.isShow = false
        this.$emit('close')
      },
      show(data) {
        if (data) {
          this.msg = data.msg || ''
        }
        this.isShow = true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .confirm-msg
    fill-box()
    z-index: 100
    layout()
    align-items: center
    .mask
      fill-box()
      background: rgba(54, 53, 71, 0.8)
    .content
      position: relative
      margin-top: 152px
      width: 300px
      height: 160px
      background: $color-white
      border: 1px solid rgba(32, 32, 46, 0.10)
      border-radius: 2px
      layout()
      .msg
        flex: 1
        layout()
        justify-content: center
        align-items: center
        font-family: $font-family-regular
        font-size: $font-size-16
        color: $color-363537
        text-align: center
        line-height: 24px
        padding: 0 20px
        letter-spacing: 0.8px
      .btn-group
        height: 45px
        layout(row)
        .btn
          box-sizing: border-box
          flex: 1
          height: 100%
          text-align: center
          line-height: 45px
          font-family: $font-family-regular
          font-size: $font-size-14
          color: $color-363537
          letter-spacing: 0.6px
          &.confirm
            color: $color-EF705D
</style>
