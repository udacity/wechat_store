// pages/home/home.js

const db = require('../../utils/db')
const util = require('../../utils/util')

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
      data.forEach(product => product.price = util.formatPrice(product.price))

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