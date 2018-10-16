import Vue from 'vue'
import base from 'common/mixins/base'
import storage from 'storage-controller'
import echarts from 'echarts'
import AwesomePicker from 'vue-awesome-picker'
import { ERR_OK } from 'common/js/config'
import * as handle from './cos/handle'
import { fileType } from './cos/file-config'
import * as cos from './cos/cos'
import RouterViewCommon from 'components/router-view-common'
import * as vod from './vod/vod'
import Toast from 'components/toast'
import Loading from 'components/loading'

// 定义插件
const AppPlugin = {
  install: function () {
    Vue.mixin(base)
    Vue.prototype.$echarts = echarts
    Vue.prototype.$storage = storage
    Vue.prototype.$ERR_OK = ERR_OK
    Vue.prototype.$handle = handle
    Vue.prototype.$cosFileType = fileType
    Vue.prototype.$cos = cos
    Vue.prototype.$vod = vod
  }
}
// 使用插件
Vue.use(AppPlugin)
Vue.use(AwesomePicker)
Vue.use(Toast)
Vue.use(Loading)
Vue.use(RouterViewCommon)
