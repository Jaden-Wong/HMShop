import { request } from '../../request/index.js'
import { login } from '../../utils/login.js'
// pages/auth/index.js
Page({
  data: {

  },

  onLoad: function (options) {

  },

  async handleGetUserInfo (e) {
    try {
      // console.log(e)
      const { encryptedData, rawData, iv, signature } = e.detail
      const { code } = await login()
      const loginParams = { encryptedData, rawData, iv, signature, code }
      console.log(loginParams);
      // const { token } = await request({
      const result = await request({
        url: '/users/wxlogin',
        data: loginParams,
        method: 'post'
      })
      // console.log(result)
      // console.log(token)
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
      wx.setStorageSync('token', token)
      wx.navigateBack({
        delta: 1
      })
    } catch (error) {
      console.log(error)
    }
  }

})