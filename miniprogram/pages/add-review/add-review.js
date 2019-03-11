// pages/add-review/add-review.js

const util = require('../../utils/util')
const db = require('../../utils/db')

Page({

  /**
   * Page initial data
   */
  data: {
    product: {},
    reviewValue: '',
    userInfo: null,
  },

  onLoad(options) {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })

      this.setProduct(options)
    }).catch(err => {
      console.log('Not Authenticated yet')
    })
  },

  onInput(event) {
    this.setData({
      reviewContent: event.detail.value.trim(),
    })
  },

  setProduct(options) {
    let product = {
      productId: options.productId,
      name: options.name,
      price: options.price,
      image: options.image
    }
    this.setData({
      product,
    })
  },

  addReview(event) {
    let content = this.data.reviewContent
    if (!content) return

    wx.showLoading({
      title: 'Submiting...'
    })

    db.addReview({
      username: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl,
      content,
      productId: this.data.product.productId
    }).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })

        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
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
})