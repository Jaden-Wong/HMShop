import { request } from '../../request/index.js'
import { payment } from '../../utils/async.js'
// pages/pay/index.js
Page({
  data: {
    address: {},
    carts: [],
    sumPrice: 0,
    count: 0,
  },

  onShow: function () {
    this.getAddress()
    this.getCarts()
  },

  onLoad: function (options) {
    
  },

  handleChooseAdress () {
    wx.chooseAddress({
      success: (result)=>{
        // console.log(result)
        wx.setStorageSync('address', result)
      }
    })
  },

  getAddress () {
    const address = wx.getStorageSync('address')||{}
    this.setData({
      address
    })
  },

  getCarts () {
    let carts = wx.getStorageSync('cart')||[]
    if (carts.length === 0) return false

    carts = carts.filter(i => i.checked)

    let sumPrice = 0
    let count = 0
    carts.forEach(i => {
      sumPrice += i.goods_price * i.num
      count += i.num
    })
    this.setData({
      carts: carts,
      sumPrice: sumPrice,
      count: count,
    })
  },

  handleGoodsNumChange (e) {
    const { carts } = this.data
    const { id, type } = e.currentTarget.dataset
    const index = carts.findIndex(i => i.goods_id === id)
    carts[index].num += parseInt(type)

    let sumPrice = 0
    let count = 0
    carts.forEach(i => {
      sumPrice += i.goods_price * i.num
      count += i.num
    })
    this.setData({
      carts: carts,
      sumPrice: sumPrice, 
      count: count,
    })
    // const carts2 = wx.getStorageSync('cart')
    // carts2[index].num += parseInt(type)
    // wx.setStorageSync('cart', carts2)
  },

  async handleOrderPay () {
    try {
      // 1.验证token是否存在 若不存在 跳转获取
      const token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        })
        return false
      }

      // 2.创建订单
      const header = { Authorization: token }
      const order_price = this.data.sumPrice
      const consignee_addr = this.data.address.cityName + this.data.address.countyName + this.data.address.detailInfo
      const carts = this.data.carts
      let goods = []
      carts.forEach(i => {
        goods.push({
          goods_id: i.goods_id,
          goods_number: i.goods_number,
          goods_price: i.goods_price
        })
      })
      const order = await request({
        url: '/my/orders/create',
        method: 'post',
        header,
        data: {
          order_price,
          consignee_addr,
          goods
        }
      })
      // 获取订单编号
      const { order_number } = order.data.message

      // 3.获取支付参数
      const payMsg = await request({
        url: '/my/orders/req_unifiedorder',
        method: 'post',
        header,
        data: { order_number }
      })
      const { pay } = payMsg.data.message
      // console.log(pay)

      // 4.发起支付
      await payment(pay)

      // 5.查看订单支付状态
      const paymentStatusMsg = await request({
        url: '/my/orders/chkOrder',
        method: 'post',
        header,
        data: { order_number }
      })
      const paymentStatus = paymentStatusMsg.data.message
      // console.log(paymentStatus)

      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 1500,
        mask: true,
      })

      // 更新本地购物车缓存数据
      let newCart = wx.getStorageSync('cart')
      newCart = newCart.filter(i => !i.checked)
      wx.setStorageSync('cart', newCart)

      wx.navigateTo({
        url: '/pages/order/index'
      })
    } catch (error) {
      wx.showToast({
        title: '支付失败',
        icon: 'error',
        duration: 1500,
        mask: true,
      })
    }
      
  }

})