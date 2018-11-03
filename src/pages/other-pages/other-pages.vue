<template>
  <div class="other-pages" :style="isTwoPage? 'bottom: 0' : ''">
    <h1>up code is todo</h1>
    <h1 @click="showToast">toast</h1>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data() {
      return {
        isTwoPage: false
      }
    },
    created() {
      // todo
      let path = this.$route.path
      if (path !== '/other-pages') {
        this.isTwoPage = true
      }
    },
    methods: {
      showToast() {
        this.$toast.show('ashdahsdkajshdkad')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .other-pages
    fill-box()
    bottom: $tab-height
    z-index :50
    background: azure
</style>
