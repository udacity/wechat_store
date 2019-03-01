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
        this.setData({
          cartTotal: util.formatPrice(0),
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

  onTapCheck(event) {
    const checkId = event.currentTarget.dataset.id
    const cartCheckMap = this.data.cartCheckMap
    let isSelectAllChecked = this.data.isSelectAllChecked
    const cartList = this.data.cartList
    let cartTotal = 0

    if (checkId === 'selectAll') {
      isSelectAllChecked = !isSelectAllChecked
      cartList.forEach(product => {
        cartCheckMap[product.productId] = isSelectAllChecked
      })
    } else {
      cartCheckMap[checkId] = !cartCheckMap[checkId]
      isSelectAllChecked = true
      cartList.forEach(product => {
        if (!cartCheckMap[product.productId]) {
          // not all product selected
          isSelectAllChecked = false
        }
      })
    }

    cartTotal = this.updateTotalPrice(cartList, cartCheckMap)

    this.setData({
      cartTotal,
      isSelectAllChecked,
      cartCheckMap
    })
  },

  updateTotalPrice(cartList, cartCheckMap) {
    let checkout = 0
    cartList.forEach(product => {
      if (cartCheckMap[product.productId]) checkout += product.price * product.count
    })

    return util.formatPrice(checkout)
  },

  onTapEditCart() {
    if (!this.data.isCartEdit) {
      this.setData({
        isCartEdit: true,
      })
    } else {
      this.updateCart()
    }
  },

  adjustCartProductCount(event) {
    const dataset = event.currentTarget.dataset
    const adjustType = dataset.type
    const productId = dataset.id
    const cartCheckMap = this.data.cartCheckMap
    let cartList = this.data.cartList
    const productToAdjust = cartList.find(product => product.productId === productId) || {}

    if (adjustType === 'add') {
      productToAdjust.count++
    } else {
      if (productToAdjust.count >= 2) {
        productToAdjust.count--
      } else {
        delete cartCheckMap[productId]
        cartList = cartList.filter(product => product.productId !== productId)
      }
    }

    const cartTotal = this.updateTotalPrice(cartList, cartCheckMap)

    this.setData({
      cartTotal,
      cartList,
    })

    if (!cartList.length) {
      this.updateCart()
    }
  },

  updateCart() {
    wx.showLoading({
      title: 'Loading...',
    })

    const cartList = this.data.cartList

    db.updateCart(cartList).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        this.setData({
          isCartEdit: false
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