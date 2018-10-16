import request from 'common/js/request'
import { BASE_URL } from 'common/js/config'
const baseURL = BASE_URL

export default {
  /**
   * 获取签名
   * @returns {Promise.<*>}
   */
  getUploadSign() {
    const url = `${baseURL.upload}/post_vod_sign`
    return request.post(url, {}, false)
  },
  /**
   * 数据入库
   * @param data
   * @returns {Promise.<*>}
   */
  saveFile(data) {
    const url = `${baseURL.upload}/api/merchant/check_default_image`
    return request.post(url, data)
  }
}
