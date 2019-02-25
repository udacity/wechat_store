const util = require('./util')

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
        id: id
      },
    })
  },
  
  /**
   * add to order
   */
  addToOrder(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'addToOrder',
          data,
        })
      })
      .catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },
}