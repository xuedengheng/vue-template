import COS from 'cos-js-sdk-v5'
import Upload from './api-upload'
import Util from './cos-util'
import { fileType } from './file-config'

const {IMAGE_TYPE, VIDEO_TYPE} = fileType

const SIGN_ERROR = 1
const CHOICE_ERROR = 2
const UPLOAD_ERROR = 3
const SAVE_ERROR = 4

const ERR_OK = 0

/**
 * 实例COS
 */
let cos = new COS({
  getAuthorization: function (params, callback) {
    Upload.getUploadSign().then((res) => {
      let obj = {Authorization: res.data.sign}
      callback(obj)
    }).catch((err) => {
      if (err) {
        throw _handleException(SIGN_ERROR)
      }
    })
  }
})

// let sign = `'q-sign-algorithm=sha1&q-ak=AKIDhKsMsWwDvUacZMvQrGRYWiv0ufGc2561&q-sign-time=1538206913;1538207513&q-key-time=1538206913;1538207513&q-header-list=&q-url-param-list=&q-signature=5df7c55da8d8a8969b01b86ff3c949658b619d01'`
// let cos = new COS({
//   getAuthorization: function (params, callback) {
//     Upload.getUploadSign().then((res) => {
//       // callback(res.data.sign)
//       callback(sign)
//     }).catch((err) => {
//       if (err) {
//         throw _handleException(SIGN_ERROR)
//       }
//     })
//   }
// })
// let cos = new COS({
//   getAuthorization: 'q-sign-algorithm=sha1&q-ak=AKIDhKsMsWwDvUacZMvQrGRYWiv0ufGc2561&q-sign-time=1538206913;1538207513&q-key-time=1538206913;1538207513&q-header-list=&q-url-param-list=&q-signature=5df7c55da8d8a8969b01b86ff3c949658b619d01'
// })

/**
 * 选择文件
 * @param fileType 文件类型
 * @param showProcess 展示进度条回调方法
 * @param processCallBack 进度条回调方法
 * @param count 选择数量
 * @returns {Promise}
 */
export function chooseFiles(fileType, showProcess, processCallBack, count = 9) {
  return new Promise((resolve, reject) => {
    _fileController(fileType, count).then((files) => {
      showProcess && showProcess()
      let type = fileType !== IMAGE_TYPE ? 'video' : 'image'
      let requests = files.map((file) => {
        return Upload.getUploadParam().then((res) => {
          const data = res.data
          if (data) {
            let params = _reorganizeParams(data, file, processCallBack)
            console.log(params)
            return postObject(params, type)
          }
        }).catch((err) => {
          if (err) {
            reject(_handleException(UPLOAD_ERROR))
          }
        })
      })
      Promise.all(requests).then((res) => {
        resolve(res)
      }).catch((err) => {
        if (err) {
          reject(err)
        }
      })
    }).catch(err => {
      err && console.error(err, '选择图片失败')
    })
  })
}

/**
 * 跳过选择图片的操作，直接上传
 * @param fileType 文件类型
 * @param catelog 文件目录
 * @param filePaths 文件路径
 * @param showProcess 展示进度条方法
 * @param processCallBack 进度条回调方法
 * @returns {Promise<any>}
 */
export function uploadFiles(fileType, filePaths, showProcess, processCallBack) {
  return new Promise((resolve, reject) => {
    showProcess && showProcess()
    let type = fileType !== IMAGE_TYPE ? 'video' : 'image'
    let requests = filePaths.map((filePath) => {
      return Upload.getUploadParam().then((res) => {
        const data = res.data
        if (data) {
          let params = _reorganizeParams(data, filePath, processCallBack)
          return postObject(params, type)
        }
      }).catch((err) => {
        if (err) {
          reject(_handleException(UPLOAD_ERROR))
        }
      })
    })
    Promise.all(requests).then((res) => {
      resolve(res)
    }).catch((err) => {
      if (err) {
        reject(err)
      }
    })
  })
}

/**
 * @param type 文件类型
 * @param count 选择数量
 * @returns {Promise}
 */
function _fileController(type, count) {
  return new Promise((resolve, reject) => {
    let input = document.createElement('input')
    input.type = 'file'
    if (count > 1) {
      input.multiple = 'multiple'
    }
    input.onchange = function () {
      let files = this.files
      let arr = Util.changeToArray(files)
      arr = arr.splice(0, count)
      switch (type) {
        case IMAGE_TYPE:
          if (!Util.isAllImage(arr)) {
            reject(_handleException(CHOICE_ERROR))
          }
          resolve(arr)
          break
        case VIDEO_TYPE:
          if (!Util.isAllVideo(arr)) {
            reject(_handleException(CHOICE_ERROR))
          }
          resolve(arr)
          break
        default:
          break
      }
    }
    input.click()
  })
}

/**
 * 整理数据工具类
 * @param data 签名回调数据
 * @param filepath 文件路径
 * @param callback 进度条回调函数
 * @returns {{Bucket: *, Region: *, Key: *, FilePath: *, onProgress: onProgress}}
 */
function _reorganizeParams(data, file, callback) {
  const {bucket, region} = data
  let type = Util.checkCreateFileType(file)
  let blob = type === 'base64' ? Util.getBlobBydataURI(file) : type === 'file' ? Util.createFile(file) : file
  let key = file.name || '' + Date.now()
  const params = {
    Bucket: bucket,
    Region: region,
    Key: key,
    Body: blob,
    onProgress: function (info) {
      if (callback && typeof callback === 'function') {
        callback(info)
      }
    }
  }
  return params
}

/**
 * 抽象上传数据工具类
 * @param params 上传参数
 * @param fileType 上传文件类型（入库用到）
 * @returns {Promise}
 */
function postObject(params, fileType) {
  return new Promise((resolve, reject) => {
    cos.putObject(params, function (err, data) {
      console.info(err)
      console.info(data)
      if (!err && data.statusCode === 200) {
        Upload.saveFile({path: `/${params.Key}`, file_type: fileType || ''}).then(files => {
          // Todo 隐藏加载器
          if (files.error === ERR_OK) {
            resolve(files.data)
          } else {
            reject(_handleException(SAVE_ERROR))
          }
        }).catch(err => {
          if (err) {
            // Todo 隐藏加载器
            reject(_handleException(SAVE_ERROR))
          }
        })
      } else {
        reject(_handleException(UPLOAD_ERROR))
      }
    })
  })
}

// /**
//  * 获取后缀名字符串
//  * @param path 文件名及路径
//  * @returns {string}
//  */
// function _getSuffix(path) {
//   let dotIndex = path.lastIndexOf('.')
//   let length = path.length
//   return path.substring(dotIndex, length)
// }

/**
 * 处理异常
 * @param type 异常类型
 * @returns {*}
 */
function _handleException(type) {
  switch (type) {
    case SIGN_ERROR:
      return new Error('签名失败')
    case UPLOAD_ERROR:
      return new Error('上传失败')
    case SAVE_ERROR:
      return new Error('入库失败')
    case CHOICE_ERROR:
      return new Error('选择失败')
    default:
      return new Error('系统异常')
  }
}
