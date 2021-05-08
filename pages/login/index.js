import { getUserMsg } from '../../utils/async.js'
// pages/login/index.js
Page({
  data: {

  },

  onLoad: function (options) {

  },

  async handleGetUserProfile () {
    const { userInfo } = await getUserMsg()
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({
      delta: 1
    })
  }

})