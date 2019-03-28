const db = require('../../utils/db')
const util = require('../../utils/util')

Page({
  data: {
    productList: [], // Products List
  },

  onLoad() {
    this.getProductList()
  },

  getProductList() {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getProductList().then(result => {
      wx.hideLoading()

      const productList = result.data
      // get 2 digits price
      productList.forEach(product => product.price = util.formatPrice(product.price))

      if (productList.length) {
        this.setData({
          productList
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },
})
