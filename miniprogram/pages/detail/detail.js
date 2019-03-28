// pages/detail/detail.js
Page({

    /**
    * Page initial data
    */
   data: {
      product: {},
    },

    /**
    * Lifecycle function--Called when page load
    */
   onLoad: function (options) {
    wx.showLoading({
      title: 'Loading...',
    })

    wx.cloud.callFunction({
      name: 'productDetail',
      data: {
        id: options.id
      },
    }).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        this.setData({
          product: data
        })
      } else {
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      setTimeout(() => {
        wx.navigateBack()
      }, 2000)
    })
    },
 })