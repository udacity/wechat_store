// pages/cart/cart.js
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
    }).catch(err => {
      console.log('Not Authenticated yet');
    })
  },

  onTapLogin(event) {

    this.setData({
      userInfo: event.detail.userInfo
    })
  },
})