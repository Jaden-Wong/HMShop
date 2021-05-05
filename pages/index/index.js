import { request } from '../../request/index.js'
//Page Object
Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },

  onLoad: function(options) {
    this.getSwiperList()
    this.getCatesList()
    this.getFloorList()
  },

  async getSwiperList () {
    const result = await request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    })
    this.setData({
      swiperList: result.data.message
    })
  },

  async getCatesList () {
    const result = await request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    })
    this.setData({
      catesList: result.data.message
    })
  },
  
  async getFloorList () {
    const result = await request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'
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
  