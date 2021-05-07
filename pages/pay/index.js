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

  handleOrderPay () {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
    }
  }

})