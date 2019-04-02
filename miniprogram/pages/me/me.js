Page({
  data: {
    userInfo: null,
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },
})