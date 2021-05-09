import { request } from '../../request/index.js'
//Page Object
Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: [],
    swiperURL: [{
      id: 0,
      navigator_url: '/pages/goods_list/index?cid=946'
    },{
      id: 1,
      navigator_url: '/pages/goods_list/index?cid=12'
    },{
      id: 2,
      navigator_url: '/pages/goods_list/index?cid=723'
    }]
  },

  onLoad: function(options) {
    this.getSwiperList()
    this.getCatesList()
    this.getFloorList()
  },

  async getSwiperList () {
    const result = await request({
      url: '/home/swiperdata'
    })
    result.data.message.forEach(i => {
      // console.log(i.navigator_url.split('').splice(20, 4).join(''))
      // console.log(i.navigator_url = i.navigator_url.split('').splice(0, 20).join('') + 'index' + i.navigator_url.split('').splice(24).join(''))
      // console.log(i.navigator_url)
      return i.navigator_url = i.navigator_url.replace('main', 'index')
    })
    // console.log(result.data.message)
    this.setData({
      swiperList: result.data.message
    })
  },

  async getCatesList () {
    const result = await request({
      url: '/home/catitems'
    })
    this.setData({
      catesList: result.data.message
    })
  },
  
  async getFloorList () {
    const result = await request({
      url: '/home/floordata'
    })
    result.data.message.forEach(i => {
      i.product_list.forEach(i => {
        return i.navigator_url = i.navigator_url.split('').splice(0, 17).join('') + '/index' + i.navigator_url.split('').splice(17).join('')
      })
    })
    this.setData({
      floorList: result.data.message
    })
  }

    // getSwiperList () {
    //   wx.request({
    //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //     success: (result) => {
    //       // console.log(result)
    //       this.setData({
    //         swiperList: result.data.message
    //       })
    //       // console.log(this.data.swiperList)
    //     },
    //     fail: () => {},
    //     complete: () => {}
    //   })
    // }

})
  