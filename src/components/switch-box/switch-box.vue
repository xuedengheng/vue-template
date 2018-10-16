<template>
  <div class="checkbox" :class="checked || values ? 'checked' : ''" @click.stop="checkSwitch">
    <div class="circle-btn"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      relyFn: {
        type: Boolean,
        default: false
      },
      values: {
        type: Number,
        default: 0
      }
    }, // disabled 禁用 relyFn 是否依赖方法，有依赖则抛出父级处理后手动改变值
    data() {
      return {
        checked: false
      }
    },
    methods: {
      checkSwitch() {
        this.checked = this.values
        if (this.disabled) return
        if (this.relyFn) {
          this.$emit('relyFn', this.checked)
          return
        }
        this.checked = !this.checked
        this.$emit('switchChange', this.checked)
      },
      setSwitch(boolean) {
        this.checked = boolean
      },
      toggleSwitch() {
        this.checked = !this.checked
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .checkbox
    width: 51px
    height: 28px
    border-radius: 14px
    background: $color-CCCCCC
    display: flex
    align-items: center
    .circle-btn
      width: 24px
      height: 24px
      border-radius: 12px
      background: $color-white
      margin-left: 2px
      transition: all .3s
  .checkbox.checked
    background: #56BA15
    .circle-btn
      margin-left: 25px

</style>
