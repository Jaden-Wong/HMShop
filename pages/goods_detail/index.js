import { request } from '../../request/index.js'
// pages/goods_detail/index.js
Page({
  data: {
    goodsDetail: {},
    isCollected: false
  },

  pics: [],
  // 当前商品对象
  goodsInfo: {},

  onShow () {
    const page =  getCurrentPages()
    const { options } = page[page.length -1]
    this.getGoodsDetail(options)
  },

  // onLoad: function (options) {
  //   // console.log(options)
  //   this.getGoodsDetail(options)
  // },

  async getGoodsDetail (options) {
    const result = await request({
      url: '/goods/detail',
      data: { goods_id: options.goods_id }
    })
    this.goodsInfo = result.data.message
    this.pics = result.data.message.pics
    // 获取商品是否被搜藏的信息
    const collect = wx.getStorageSync('collect')||[]
    const isCollected = collect.some(i => i.goods_id === this.goodsInfo.goods_id)
    this.setData({
      goodsDetail: {
        pics: result.data.message.pics,
        goods_price: result.data.message.goods_price,
        goods_name: result.data.message.goods_name,
        goods_introduce: result.data.message.goods_introduce.replace(/\.webp/g, '.jpg')
      },
      isCollected
    })
  },

  hangdlePicsClick (e) {
    // console.log(this.data.goodsDetail.pics.map(i => i.pics_big))
    wx.previewImage({
      urls: this.pics.map(i => i.pics_big),
      current: e.currentTarget.dataset.url
    })
  },

  handleAddToCart () {
    // 1.获取缓存中的购物车数组
    const cart = wx.getStorageSync('cart')||[]
    // if (cart.length === 0) {
    //   wx.setStorageSync('cart', [])
    // }
    // 2.当前商品是否已在购物车中？
    const index = cart.findIndex(i => i.goods_id === this.goodsInfo.goods_id)
    if (index === -1) {
      // 3.购物车中没有该商品
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      cart.unshift(this.goodsInfo)
    } else {
      // 4.购物车中有该商品
      cart[index].num++
    }
    // 5.把新数据更新到缓存中
    wx.setStorageSync('cart', cart)
    // 6.弹框提示成功
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1500,
      mask: true,
    })
  },

  handleBuyNow () {
    const cart = wx.getStorageSync('cart')||[]
    cart.map(i => i.checked = false)
    {
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      cart.unshift(this.goodsInfo)
    }
    wx.setStorageSync('cart', cart)
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  },
  
  handleCollect () {
    let isCollected = false
    const collect = wx.getStorageSync('collect')||[]
    const index = collect.findIndex(i => i.goods_id === this.goodsInfo.goods_id)
    if (index === -1) {
      // 没有收藏
      collect.push(this.goodsInfo)
      isCollected = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1500,
        mask: true,
      })
    } else {
      // 已收藏过
      collect.splice(index, 1)
      isCollected = false
      wx.showToast({
        title: '取消收藏',
        icon: 'error',
        duration: 1500,
        mask: true,
      })
    }
    wx.setStorageSync('collect', collect)
    // console.log(isCollected)
    this.setData({
      isCollected
    })
  }

})