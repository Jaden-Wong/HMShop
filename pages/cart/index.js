// pages/cart/index.js
Page({
  data: {
    address: {},
    carts: [],
    allChecked: false,
    sumPrice: 0,
    count: 0,
    carriage: true,
    allCheckDisable: true,
    cartEmpty: true
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
    const carts = wx.getStorageSync('cart')||[]
    if (carts.length === 0) return false

    this.setBottomData(carts)

  },

  // 单选
  handleGoodsCheckChange (e) {
    const { carts } = this.data
    // console.log(e.currentTarget.dataset)
    const { id } = e.currentTarget.dataset
    const index = carts.findIndex(i => i.goods_id === id)
    carts[index].checked = !carts[index].checked

    this.setBottomData(carts)

  },

  // 全选
  handleAllCheckChange () {
    let { carts, allChecked } = this.data
    allChecked = !allChecked
    carts.forEach(i => i.checked = allChecked)

    this.setBottomData(carts)

  },

  setBottomData (carts) {
    let allChecked = true
    let sumPrice = 0
    let count = 0
    let allCheckDisable = false
    let cartEmpty = false
    carts.forEach(i => {
      if (i.checked) {
        sumPrice += i.goods_price * i.num
        count += i.num
      } else {
        allChecked = false
      }
    })
    if (!carts.length) {
      allChecked = false
      allCheckDisable = true
      cartEmpty = true
    }
    this.setData({
      carts: carts,
      allChecked: allChecked,
      sumPrice: sumPrice,
      count: count,
      allCheckDisable: allCheckDisable,
      cartEmpty: cartEmpty
    })
    wx.setStorageSync('cart', carts)
  },

  handleGoodsNumChange (e) {
    const { carts } = this.data
    const { id, type } = e.currentTarget.dataset
    const index = carts.findIndex(i => i.goods_id === id)
    carts[index].num += parseInt(type)

    this.setBottomData(carts)

  },

  chooseGoods () {
    wx.switchTab({
      url: '/pages/category/index'
    })
  },
  
  handleLongPress (e) {
    const { carts } = this.data
    const { id } = e.currentTarget.dataset
    const index = carts.findIndex(i => i.goods_id === id)
    const that = this
    wx.showModal({
      title: '提示',
      content: '是否删除该商品？',
      success (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          carts.splice(index, 1)
          that.setBottomData(carts)
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },

  showDetails (e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goods_detail/index?goods_id=${id}`
    })
  },

  handlePay () {
    // 三验一跳
    if (this.data.carts.length === 0) {
      wx.showToast({
        title: '购物车空空如也~',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
      return false
    }
    if (this.data.count === 0) {
      wx.showToast({
        title: '请选择商品~',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
      return false
    }
    if (JSON.stringify(this.data.address) == '{}') {
      wx.showToast({
        title: '请选择收货地址~',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
      return false
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }

})