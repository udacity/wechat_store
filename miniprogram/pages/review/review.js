// pages/review/review.js

const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  /**
   * Page initial data
   */
  data: {
    product: {},
    reviewList: [],
  },

  onLoad(options) {
    this.setProduct(options)
    this.getReviews(options.productId)
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

  getReviews(productId) {
    db.getReviews(productId).then(result => {
      const data = result.data
      if (data.length) {
        this.setData({
          reviewList: data.map(review => {
            review.createTime = util.formatTime(review.createTime, 'yyyy/MM/dd')
            return review
          })
        })
      }
    }).catch(err => {
      console.error(err)
    })
  },
})