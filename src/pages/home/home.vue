<template>
  <div class="home" @touchmove.prevent>
    <router-view style="z-index: 10"/>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from 'components/tab/tab'

  const COMPONENT_NAME = 'HOME'

  export default {
    name: COMPONENT_NAME,
    components: {
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
