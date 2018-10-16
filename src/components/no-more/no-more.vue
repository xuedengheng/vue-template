<template>
  <article class="no-more">
    <div class="container">
      <div class="line-wrap left">
        <div class="line-one"></div>
        <div class="line-two"></div>
      </div>
      <div class="msg-txt">
        <slot></slot>
      </div>
      <div class="line-wrap right">
        <div class="line-one"></div>
        <div class="line-two"></div>
      </div>
    </div>
  </article>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .no-more
    .container
      layout(row, block, nowrap)
      align-items: center
      justify-content: center
      height :33px
      .line-wrap
        height :100%
        layout()
        justify-content :center
        &.left
          align-items :flex-end
        &.right
          align-items :flex-start
        .line-one
          width :7.7px
          height :1px
          background-color :#BBBBBB
          margin-bottom :1px
        .line-two
          margin-top :1px
          width :4.2px
          height :1px
          background-color :#BBBBBB
      .msg-txt
        font-family: $font-family-regular
        font-size: $font-size-12
        color: #BBBBBB
        letter-spacing: 0.26px
        line-height :33px
        height :100%
        margin :0 3.8px
</style>
