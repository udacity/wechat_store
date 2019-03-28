const db = wx.cloud.database({
    env: 'store-91fad3'
  })

   module.exports = {
    getProductList() {
      return db.collection('product').get()
    },

     getProductDetail(id) {
      return wx.cloud.callFunction({
        name: 'productDetail',
        data: {
          id
        },
      })
    },
  }
