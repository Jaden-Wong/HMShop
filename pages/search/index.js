import { request } from '../../request/index.js'
// pages/search/index.js
Page({
  data: {
    goods: [],
    valueEmpty: false,
    inputValue: ''
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },

  Timer: null,

  handleInput (e) {
    // console.log(e.detail.value)
    const { value } = e.detail
    if (value.trim() === '') {
      this.setData({
        goods: [],
        valueEmpty: true
      })
      return
    } else {
      this.setData({
        valueEmpty: false
      })
    }
    clearTimeout(this.Timer)
    this.Timer = setTimeout(() => {
      this.getSearchRes(value)
    }, 600)
  },

  async getSearchRes (value) {
    const result = await request({
      url: '/goods/search',
      data: {
        query: value
      }
    })
    if (this.data.valueEmpty) return
    // console.log(result)
    const { goods } = result.data.message
    goods.map(i => {
      i.goods_name = i.goods_name.split(' ').splice(0, 2).join(' ')
    })
    // const textGood = goods[0].goods_name
    // console.log(textGood)
    // console.log(textGood.split(' ').splice(0,2).join(' '))
    this.setData({
      goods: goods.sort((a, b) => {
        return a.goods_name.length - b.goods_name.length
      })
    })
  },

  handleTapLike (e) {
    // console.log(e.currentTarget.dataset.value)
    this.handleInput({
      detail: {
        value: e.currentTarget.dataset.value
      }
    })
    this.setData({
      inputValue: e.currentTarget.dataset.value
    })
  },

  handleCancel () {
    this.handleInput({
      detail: {
        value: ''
      }
    })
    this.setData({
      inputValue: ''
    })
  }
})