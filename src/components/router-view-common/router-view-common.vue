<template>
  <transition :name="transitionType">
    <keep-alive v-if="keepAlive">
      <router-view @refresh="refresh"/>
    </keep-alive>
    <router-view v-else @refresh="refresh"/>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'router-view-common',
    data() {
      return {
        keepAlive: false,
        transitionType: 'slide'
      }
    },
    methods: {
      refresh() {
        this.$emit('refresh', ...arguments)
      }
    },
    watch: {
      '$route'(to, from) {
        this.keepAlive = to.meta.keepAlive
        // this.transitionType = 'out'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
