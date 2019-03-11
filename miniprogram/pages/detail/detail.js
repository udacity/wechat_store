const db = require('../../utils/db')
const util = require('../../utils/util')

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
      data.price = util.formatPrice(data.price)

       if (data) {
        this.setData({
          product: data
        })
      } else {
        setTimeout(() => {
          wx.navigateBack()
        }, 7000)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

       setTimeout(() => {
        wx.navigateBack()
      }, 7000)
    })
  },

  buy() {
    wx.showLoading({
      title: 'Purchasing...',
    })

    const productToBuy = Object.assign({
      count: 1
    }, this.data.product)
    productToBuy.productId = productToBuy._id

    db.addToOrder({
      list: [productToBuy]
    }).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },

  addToCart() {
    wx.showLoading({
      title: 'Loading...',
    })

    db.addToCart(this.data.product).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },

  onTapReviewEntry() {
    const product = this.data.product
    wx.navigateTo({
      url: `/pages/review/review?productId=${product._id}&price=${product.price}&name=${product.name}&image=${product.image}`,
    })
  },
})
