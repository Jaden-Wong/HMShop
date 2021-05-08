import { request } from '../../request/index.js'
// pages/order/index.js
Page({
  data: {
    navTabSel: [{
      id: 0,
      value: '全部',
      isActive: true
    },{
      id: 1,
      value: '待付款',
      isActive: false
    },{
      id: 2,
      value: '待发货',
      isActive: false
    },{
      id: 3,
      value: '退货/退款',
      isActive: false
    }],
    orders: []
  },

  onLoad: function (options) {

  },

  onShow: function () {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return false
    }
    const header = { Authorization: token }
    const pages =  getCurrentPages()
    const currentPage = pages[pages.length - 1]
    // console.log(currentPage.options)
    const { type } = currentPage.options
    this.changeItemTab(type - 1)
    this.getOrder(type, header)
  },

  handelNavItemTab (e) {
    const { index } = e.detail
    // console.log(index)
    this.changeItemTab(index)
    const token = wx.getStorageSync('token')
    const header = { Authorization: token }
    this.getOrder(index + 1, header)
  },

  changeItemTab (index) {
    const { navTabSel } = this.data
    navTabSel.forEach(item => {
      if (index === item.id) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
    this.setData({
      navTabSel: navTabSel
    })
  },

  async getOrder (type, header) {
    const result = await request({
      url: '/my/orders/all',
      header,
      data: { type }
    })
    // console.log(res)
    this.setData({
      orders: result.data.message.orders.map(i => ({
        ...i, 
        create_time_cn: (new Date(i.create_time * 1000).toLocaleString())
      }))
    })
  }

})