const util = require('../../utils/util')
const db = require('../../utils/db')

Page({
  data: {
    userInfo: null,
    cartList: [],
    isSelectAllChecked: false,
    isCartEdit: false,
    cartCheckMap: {},
    cartTotal: 0,
  },

  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })

      this.getCart()

    }).catch(err => {
      console.log('Not Authenticated yet');
    })
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })

    this.getCart()
  },

  getCart() {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getCart().then(result => {
      wx.hideLoading()

      const data = result.result

      if (data.length) {
        // update the total price for cart
        let checkout = 0;
        data.forEach(product => {
          checkout += product.price * product.count
        })

        this.setData({
          cartTotal: util.formatPrice(checkout),
          cartList: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },
})