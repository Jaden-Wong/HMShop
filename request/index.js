export const request = (params) => {
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      // 传进来的 params 为对象形式 需要展开为字符串
      ...params,
      url: `${baseURL}${params.url}`,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
