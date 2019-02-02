// pages/me/me.js
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

  onTapLogin() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
    .catch(() => {
      console.log('unauthorized')
    })
  },

  /**
   * Lifecycle function--Called when page load
   */


  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})