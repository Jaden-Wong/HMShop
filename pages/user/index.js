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
  },
  manageAddress () {
    wx.chooseAddress()
  },
  
  aboutUs () {
    wx.showModal({
      title: '关于我们',
      content: '该案例仅用于学习',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F'
    })
  }
})