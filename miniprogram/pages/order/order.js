// pages/order/order.js
const util = require('../../utils/util')
const db = require('../../utils/db')

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: null,
<<<<<<< HEAD
    orderList: [
      {
        id: 0,
        list: [{
          count: 1,
          image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
          name: 'Product 1',
          price: 50.5,
        }]
      },
      {
        id: 1,
        list: [{
          count: 1,
          image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
          name: 'Product 2',
          price: 40.1,
        },
        {
          count: 1,
          image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product3.jpg',
          name: 'Product 3',
          price: 30.5,
        }
        ]
      },
      {
        id: 2,
        list: [{
          count: 1,
          image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product4.jpg',
          name: 'Product 4',
          price: 70.4,
        }]
      }
    ], // orderList
=======
    orderList: [],
>>>>>>> order page with get orders cloud function
  },

  onLoad() {
    // 2 digits for price
    this.data.orderList.forEach(order => {
      order.list.forEach(product => product.price = util.priceFormat(product.price))
    })
    this.setData({
      orderList: this.data.orderList
    })
  },

  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })

      this.getOrders()
    })
    .catch(err => {
      console.log(err)
    })
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })

    this.getOrders()
  },

  getOrders() {
    wx.showLoading({
      title: 'Loading...'
    })

    db.getOrders().then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        this.setData({
          orderList: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'failed',
      })
    })
  }
})