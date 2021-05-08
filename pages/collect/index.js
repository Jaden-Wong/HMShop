// pages/collect/index.js
Page({
  data: {
    navTabSel: [{
      id: 0,
      value: '商品收藏',
      isActive: true
    },{
      id: 1,
      value: '品牌收藏',
      isActive: false
    },{
      id: 2,
      value: '店铺收藏',
      isActive: false
    },{
      id: 3,
      value: '浏览足迹',
      isActive: false
    }],
    collect: []
  },

  onShow: function () {
    const collect = wx.getStorageSync('collect')||[]
    this.setData({
      collect
    })
      
  },

  onLoad: function (options) {

  },

  handelNavItemTab (e) {
    const { index } = e.detail
    console.log(index)
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

  handleShowDetails (e) {
    // console.log(e.detail)
    wx.navigateTo({
      url: `/pages/goods_detail/index?goods_id=${e.detail}`
    })
  }
  
})