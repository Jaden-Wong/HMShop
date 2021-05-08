export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (result) => {
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

export const payment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

export const getUserMsg = () => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用于完善用户授权信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (result) => {
        resolve(result)
      },
      ail: (error) => {
        reject(error)
      }
    })
  })
}