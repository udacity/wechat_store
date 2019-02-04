// pages/me/me.js
const util = require('../../utils/util')
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: null,
  },

  onTapLogin(event) {

    this.setData({
      userInfo: event.detail.userInfo
    })
    
  },

  onTapAddress() {
    wx.showToast({
      icon: 'none',
      title: 'This function is not open yet.'
    })
  },

  onTapService() {
    wx.showToast({
      icon: 'none',
      title: 'This function is not open yet.'
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function (options) {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
  },
})