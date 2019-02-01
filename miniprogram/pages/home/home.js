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
      // 2 digits for price
      data.forEach(product => product.price = util.priceFormat(product.price))

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