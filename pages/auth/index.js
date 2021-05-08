import { request } from '../../request/index.js'
import { login } from '../../utils/async.js'
import { token } from '../../utils/token.js'
// pages/auth/index.js
Page({
  data: {

  },

  onLoad: function (options) {

  },

  async handleGetUserInfo (e) {
    // 1.获取用户token
    try {
      // console.log(e)
      const { encryptedData, rawData, iv, signature } = e.detail
      const { code } = await login()
      const loginParams = { encryptedData, rawData, iv, signature, code }
      // console.log(loginParams)
      // const { token } = await request({
      const result = await request({
        url: '/users/wxlogin',
        data: loginParams,
        method: 'post'
      })
      // console.log(result)
      // console.log(token)
      wx.setStorageSync('token', token)
      wx.navigateBack({
        delta: 1
      })
    } catch (error) {
      // console.log(error)
    }
  }

})