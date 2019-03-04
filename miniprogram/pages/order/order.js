const util = require('../../utils/util')
const db = require('../../utils/db')

Page({
  data: {
    userInfo: null,
    orderList: [],
  },

  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })

      this.getOrders()
    }).catch(err => {
      console.log('Not Authenticated yet');
    })
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  getOrders() {
    wx.showLoading({
      title: 'Loading...'
    })

    db.getOrders().then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        this.setData({
          orderList: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed',
      })
    })
  },
})
