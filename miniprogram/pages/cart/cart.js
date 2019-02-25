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
      name: 'Product 1',
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
      price: '28.00',
      source: 'Oversea·Swidden',
      count: 1,
    }, {
      id: 2,
      name: 'Product 2',
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
      price: '158.90',
      source: 'Oversea·New Zealand',
      count: 3,
    }], // Cart Shopping List
    cartCheckMap: [undefined, true, undefined], // The selected product ID
    cartTotal: 45, // The total price of Cart
    isCartEdit: false, // if Cart is under editing
    isAllProductSelected: false, // if all products are selected
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