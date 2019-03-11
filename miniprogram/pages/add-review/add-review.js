// pages/add-review/add-review.js
Page({

  /**
   * Page initial data
   */
  data: {
    product: {
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
      name: 'Product 1',
      price: '50.50',
    },
    reveiwContent: ''
  },

  onLoad(options) {
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

  onInput(event) {
    this.setData({
      reviewContent: event.detail.value.trim(),
    })
  },
})