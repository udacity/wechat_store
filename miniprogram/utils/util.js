module.exports = {
  priceFormat(price){
    return parseFloat(Math.round(price * 100) / 100).toFixed(2)
  },

  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo'] === false) {
            // have refused the authorization
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
