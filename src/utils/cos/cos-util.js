export default {
  createFile(options) {
    let buffer = new ArrayBuffer(options.size || 0)
    let arr = new Uint8Array(buffer);
    [].forEach.call(arr, function (char, i) {
      arr[i] = 0
    })
    let opt = {}
    options.type && (opt.type = options.type)
    let blob = new Blob([buffer], options)
    return blob
  },
  isAllImage(arr) {
    return arr.some(val => /image/.test(val.type))
  },
  isAllVideo(arr) {
    return arr.some(val => /video/.test(val.type))
  },
  changeToArray(files) {
    return Array.from(files)
  },
  getObjectURL(file) {
    let url
    if (window.createObjcectURL !== undefined) {
      url = window.createOjcectURL(file)
    } else if (window.URL !== undefined) {
      url = window.URL.createObjectURL(file)
    } else if (window.webkitURL !== undefined) {
      url = window.webkitURL.createObjectURL(file)
    }
    return url
  },
  // base64转流
  getBlobBydataURI(dataURI, type = 'image/jpeg') {
    let binary = atob(dataURI.split(',')[1])
    let array = []
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    return new Blob([new Uint8Array(array)], {type: type})
  },
  checkCreateFileType(obj) {
    switch (typeof obj) {
      case 'object':
        return obj.type ? 'file' : 'blob'
      case 'string':
        return 'base64'
      default:
        break
    }
  }
}
