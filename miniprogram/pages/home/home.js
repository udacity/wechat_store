// pages/home/home.js

const db = require('../../utils/cloud')

Page({
  data: {
    productList: [], // Products List
  },

  onLoad(options) {
    this.getProductList()
  },

  getProductList() {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getProductList().then(result => {
      wx.hideLoading()

      const data = result.data
      // get 2 digits price
      data.forEach(product => product.price = parseFloat(Math.round(product.price * 100) / 100).toFixed(2))

      if (data.length) {
        this.setData({
          productList: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },
})