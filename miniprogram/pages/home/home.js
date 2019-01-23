// pages/home/home.js

const db = wx.cloud.database({
  env: 'store-91fad3'
})


Page({
  data: {
    productList: [], // Products List
  },

  onLoad(options) {
    this.getProductList()
  },

  getProductList() {
    wx.showLoading({
      title: 'Still Loading...',
    })

    db.collection('product').get().then(result => {
      console.log(result)
      wx.hideLoading()

      const data = result.data
      // 2 digits for price
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