module.exports = {
  priceFormat(price) {
    return parseFloat(Math.round(price * 100) / 100).toFixed(2)
  },

  /**
   * 检查是否可以拿到用户信息，如果可以则返回用户信息
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

}
