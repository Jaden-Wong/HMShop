// pages/user/index.js
Page({
  data: {
    userInfo: {},
    collectNums: 0,
    isLogin: false
  },

  onLoad: function (options) {
    this.getUserInfo()
  },

  onShow: function () {
    const collect = wx.getStorageSync('collect')||[]
    this.setData({
      collectNums: collect.length
    })
      
    this.getUserInfo()
    this.setData({
      isLogin: JSON.stringify(this.data.userInfo) != '{}'
    })
  },

  getUserInfo () {
    const userInfo = wx.getStorageSync('userInfo')||{}
    this.setData({
      userInfo
    })
  }
})