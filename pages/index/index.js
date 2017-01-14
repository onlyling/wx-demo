//index.js
//获取应用实例
var app = getApp()

var _util = require('../../utils/util.js')

var _getDayTime = _util.getDayTime

Page({
  data: {
    today: _util.formatTime(new Date()).split(' ')[0],
    nowTime: (new Date()).getTime(),
    todays: [],
    list: [],
    loading: false
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goToNews(event) {

    let _dataset = event.target.dataset

    let _query = [
      'id=' + _dataset.id,
      'title=' + _dataset.title,
      'time=' + _dataset.time
    ]

    wx.navigateTo({
      url: '../news/index?' + _query.join('&')
    })
  },
  onLoad() {

    let self = this

    self.getData(_util.formatTime(new Date(_getDayTime.now())).split(' ')[0].replace(/\-/g, ''))

    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  },
  getData(day) {

    var self = this

    return _util.$get('/news/before/' + day)
      .then((res) => {

        let _todays = self.data.todays.concat()

        _todays.push({
          today: day,
          list: res.stories
        })

        self.setData({
          todays: _todays
        })

        return Promise.resolve()

      })

  },
  getMore() {

    let self = this

    self.setData({
      loading: true
    })

    self.getData(_util.formatTime(new Date(_getDayTime.next())).split(' ')[0].replace(/\-/g, ''))
      .then(() => {

        self.setData({
          loading: false
        })

      })

  }
})
