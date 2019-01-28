const db = wx.cloud.database({
    env: 'store-91fad3'
  })

   module.exports = {
    /**
     * get products list
     */
    getProductList() {
      return db.collection('product').get()
    },

     /**
     * get product detail
     */
    getProductDetail(id) {
      return wx.cloud.callFunction({
        name: 'productDetail',
        data: {
          id
        },
      })
    },
  }