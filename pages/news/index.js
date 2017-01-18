/**
 * 新闻详情页
 * 
 * WxParse
 * wxParse-微信小程序富文本解析自定义组件，支持HTML及markdown解析
 * 
 * https://github.com/icindy/wxParse
 * 
 */

var WxParse = require('../../wxParse/wxParse.js')

var _util = require('../../utils/util.js')

Page({
  data: {
      id: '',
      title: '',
      time: '',
      content: ''
  },
  onLoad(option) {

    let self = this

    self.setData({
        id: option.id,
        title: option.title,
        time: option.time
    })

    _util.$get('/news/'+ option.id)
        .then((res) => {

            console.log(res)

            WxParse.wxParse('article', 'html', res.body, self,5);

            // self.setData({
            //     content: res.body
            // })

        })

  }
})
