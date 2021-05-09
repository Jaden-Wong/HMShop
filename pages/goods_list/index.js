import { request } from '../../request/index.js'
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTabSel: [{
      id: 0,
      value: '综合',
      isActive: true
    },{
      id: 1,
      value: '销量',
      isActive: false
    },{
      id: 2,
      value: '价格',
      isActive: false
    }],
    goodsList: [],
    total: 0,
    searchLoading: true, //"上拉加载"的变量，默认false，隐藏
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏
    goodsListSortBySell: [],
    goodsListSortByPrice: []
  },

  // 请求参数
  params: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 跳转页面时携带的参数
    // console.log(options)
    this.params.cid = options.cid||''
    this.params.query = options.query||''
    this.getGoodsList()
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

  async getGoodsList () {
    const result = await request({
      url: '/goods/search',
      data: this.params
    })
    // console.log(result.data.message.goods)
    this.setData({
      total: result.data.message.total,
      // 综合
      goodsList: [...this.data.goodsList, ...result.data.message.goods],
      // 销量
      goodsListSortBySell:[...this.data.goodsList, ...result.data.message.goods].sort(function(a, b) {
        return a.hot_mumber - b.hot_mumber
      }),
      // 价格
      goodsListSortByPrice: [...this.data.goodsList, ...result.data.message.goods].sort(function(a, b) {
        return a.goods_price - b.goods_price
      })
    })
    wx.stopPullDownRefresh()
  },

  // 触发下拉刷新时执行
  onPullDownRefresh: function() {
    this.data.goodsList = []
    this.params.pagenum = 1
    this.getGoodsList()
  },

  // 到达底部
  onReachBottom: function () {
    if (this.params.pagenum >= Math.ceil(this.data.total / this.params.pagesize)) {
      this.setData({
        searchLoading: false,
        searchLoadingComplete: true
      })
      wx.showToast({
        title: '已经到底啦！',
        icon: 'none',
        duration: 1500,
      })
    } else {
      this.setData({
        searchLoading: true,
        searchLoadingComplete: false
      })
      this.params.pagenum ++
      this.getGoodsList()
    }
  }
  
})
