// pages/detail/detail.js

const db = require('../../utils/cloud')

Page({
  data: {
    product: {},
  },

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
      data.price = parseFloat(Math.round(data.price * 100) / 100).toFixed(2)

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