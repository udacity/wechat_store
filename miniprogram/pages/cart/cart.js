// pages/cart/cart.js
const util = require('../../utils/util')

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: null,
    cartList: [{
      id: 1,
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
      name: 'Wallet',
      price: '100.00',
      source: 'CHINA',
      count: 1,
    }, {
      id: 2,
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
      name: 'Guitar',
      price: '200.00',
      source: 'SWEDEN',
      count: 3,
    }, {
      id: 3,
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product3.jpg',
      name: 'Stapler',
      price: '300.00',
      source: 'GERMANY',
      count: 4,
    }, {
      id: 4,
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product4.jpg',
      name: 'Leafy vegetables',
      price: '400.00',
      source: 'NEW ZEALAND',
      count: 2,
    }, {
      id: 5,
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product5.jpg',
      name: 'Compass',
      price: '500.00',
      source: 'USA',
      count: 1,
    }],
    isAllProductSelected: false,
    isCartEdit: false,
    cartCheckMap: {},
    cartTotal: '45.00',
  },

  onShow: function (options) {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    }).catch(err => {
      console.log('Not Authenticated yet');
    })
  },

  onTapLogin(event) {

    this.setData({
      userInfo: event.detail.userInfo
    })
  },
})