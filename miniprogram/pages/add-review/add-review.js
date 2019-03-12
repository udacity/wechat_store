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
    previewImages: []
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

    this.uploadImage(images => {
      db.addReview({
        username: this.data.userInfo.nickName,
        avatar: this.data.userInfo.avatarUrl,
        content,
        productId: this.data.product.productId,
        images,
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
    })
  },

  chooseImage() {
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.setData({
          previewImages: res.tempFilePaths
        })
      }
    })
  },

  previewImage(event) {
    const target = event.currentTarget
    const src = target.dataset.src
    console.log(src)

    wx.previewImage({
      current: src,
      urls: [src]
    })
  },

  uploadImage(callback) {
    const previewImages = this.data.previewImages
    const images = []

    if (previewImages.length) {
      let imageCount = previewImages.length
      for (let i = 0; i < imageCount; i++) {
        db.uploadImage(previewImages[i]).then(result => {
          images.push(result.fileID)
          if (i === imageCount - 1) {
            callback && callback(images)
          }
        }).catch(err => {
          console.log('err', err)
        })
      }
    } else {
      callback && callback(images)
    }
  },
})