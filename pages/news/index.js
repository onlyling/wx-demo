
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

            self.setData({
                content: res.body
            })

        })

  }
})
