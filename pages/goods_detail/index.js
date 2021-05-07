import { request } from '../../request/index.js'
// pages/goods_detail/index.js
Page({
  data: {
    goodsDetail: {}
  },

  pics: [],
  goodsInfo: {},

  onLoad: function (options) {
    // console.log(options)
    this.getGoodsDetail(options)
  },

  async getGoodsDetail (options) {
    const result = await request({
      url: '/goods/detail',
      data: { goods_id: options.goods_id }
    })
    this.goodsInfo = result.data.message
    this.pics = result.data.message.pics
    this.setData({
      goodsDetail: {
        pics: result.data.message.pics,
        goods_price: result.data.message.goods_price,
        goods_name: result.data.message.goods_name,
        goods_introduce: result.data.message.goods_introduce.replace(/\.webp/g, '.jpg')
      }
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
  }
})