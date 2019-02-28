// pages/order/order.js
const util = require('../../utils/util')

Page({
  /**
  * Page initial data
  */
  data: {
    userInfo: null,
  },

  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },
})