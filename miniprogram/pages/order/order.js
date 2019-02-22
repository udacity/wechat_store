// pages/order/order.js
const util = require('../../utils/util')
const db = require('../../utils/db')

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: null,
    orderList: [],
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