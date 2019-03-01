// pages/order/order.js
const util = require('../../utils/util')

Page({
  /**
  * Page initial data
  */
  data: {
    userInfo: null,
    orderList: [{
      id: 0,
      productList: [{
        count: 1,
        image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
        name: 'Product 1',
        price: '50.50',
      }]
    },
    {
      id: 1,
      productList: [{
          count: 1,
          image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
          name: 'Product 2',
          price: '40.10',
        },
        {
          count: 1,
          image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product3.jpg',
          name: 'Product 3',
          price: '30.50',
        }
      ]
    },
    {
      id: 2,
      productList: [{
        count: 2,
        image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product4.jpg',
        name: 'Product 4',
        price: '70.40',
      }]
    }],
  },

  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },
})