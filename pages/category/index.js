import { request } from '../../request/index.js'
// pages/category/index.js
Page({
  data: {
    cates_menu: [],
    cates_content: [],
    currentIndex: 0,
    scrollTop: 0
  },
  cates: [],

  onLoad: function (options) {
    // 取出缓存
    const Cates = wx.getStorageSync('cates')
    if (!Cates) {
      this.getCates()
    } else {
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
      this.getCates()
      } else {
        this.cates = Cates.data
        this.setData({
          cates_menu: this.cates.map(i => i.cat_name),
          cates_content: this.cates[0].children
        })
      }
    }
  },

  async getCates () {
    const result = await request({
      url: '/categories'
    })
    this.cates = result.data.message
    // 设置缓存
    wx.setStorageSync('cates', { time: Date.now(), data: this.cates});
    this.setData({
      cates_menu: this.cates.map(i => i.cat_name),
      cates_content: this.cates[0].children
    })
  },

  handleItemTap (e) {
    // console.log(e.currentTarget.dataset);
    const { index } = e.currentTarget.dataset
    this.setData({
      currentIndex: index,
      cates_content: this.cates[index].children,
      scrollTop: 0
    })
  }

})