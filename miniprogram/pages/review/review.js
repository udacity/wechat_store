// pages/review/review.js
Page({

  /**
   * Page initial data
   */
  data: {
    product: {},

    reviewList: [{
      avatar: '/images/me-sel.png',
      username: 'test1',
      createTime: '2019/01/01',
      content: 'test comment',
    },
    {
      avatar: '/images/me-sel.png',
      username: 'test2',
      createTime: '2019/01/01',
      content: 'test comment'
    }],

  },

  onLoad(options) {
    this.setProduct(options)
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
})