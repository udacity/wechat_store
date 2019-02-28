module.exports = {
  // make price with 2 digits
  formatPrice(price){
    return parseFloat(Math.round(price * 100) / 100).toFixed(2)
  },

  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo'] === false) {
            // 已拒绝授权
            reject()
          } else {
            wx.getUserInfo({
              success(res) {
                const userInfo = res.userInfo
                resolve(userInfo)
              }
            })
          }
        }
      })
    })
  },

  /**
   * check login state
   */
  checkSession() {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success: resolve,
        fail() {
          wx.login({
            success: resolve,
            fail: reject,
          })
        },
      })
    })
  },
}