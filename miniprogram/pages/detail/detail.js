// pages/detail/detail.js
const db = require('../../utils/db')
const util = require('../../utils/util')

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
  onLoad(options) {
    this.getProductDetail(options.id)
  },

  getProductDetail(id) {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getProductDetail(id).then(result => {
      wx.hideLoading()

      const data = result.result


      // get 2 digits price
      data.price = util.priceFormat(data.price)

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
  }
})