var _config = require('../config.js')

export const formatTime = (date) => {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const _getUrl = (route) => {
  return `https://${_config.host}${_config.basePath}${route}`
}

export const $ajax = (opt) => {


  return new Promise((resolve, reject) => {

    wx.request({
      url: _getUrl(opt.url),
      type: opt.type || 'GET',
      data: opt.data,
      dataType: opt.dataType || 'json',
      header: opt.header || {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res.errMsg)
        }
      },
      fail(err) {
        reject(err)
      }
    })

  })

}

export const $get = (url, data) => {
  return $ajax({
    url,
    data
  })
}

export const getDayTime = (() => {

  let _today = (new Date()).getTime()

  return {
    now() {
      return _today
    },
    next() {
      _today -= 1000 * 60 * 60 * 24
      return _today
    }
  }
})()

// module.exports = {
//   formatTime: formatTime
// }
