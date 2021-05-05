export const request = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      // 传进来的 params 为对象形式 需要展开为字符串
      ...params,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
