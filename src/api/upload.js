import request from 'common/js/request'

export default {
  // 授权
  upLoadImage(data, loading) {
    const url = `/api/merchant/images`
    return request.post(url, data, loading)
  }
}
