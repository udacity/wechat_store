// pages/order/order.js
const util = require('../../utils/util')

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: null,
    orderList: [
      {
        id: 0,
        list: [{
          count: 1,
          image: 'cloud://yancey-ce9f04.7961-yancey-ce9f04/product1.jpg',
          name: 'product1',
          price: 50.5,
        }]
      },
      {
        id: 1,
        list: [{
          count: 1,
          image: 'cloud://yancey-ce9f04.7961-yancey-ce9f04/product2.jpg',
          name: 'product2',
          price: 50.5,
        },
        {
          count: 1,
          image: 'cloud://yancey-ce9f04.7961-yancey-ce9f04/product3.jpg',
          name: 'product3',
          price: 50.5,
        }
        ]
      },
      {
        id: 2,
        list: [{
          count: 1,
          image: 'cloud://yancey-ce9f04.7961-yancey-ce9f04/product4.jpg',
          name: 'product4',
          price: 50.5,
        }]
      }
    ], // orderList
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