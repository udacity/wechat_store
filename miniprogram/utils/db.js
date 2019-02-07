const db = wx.cloud.database({
  env: 'yancey-ce9f04'
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
        id: id
      },
    })
  },
}