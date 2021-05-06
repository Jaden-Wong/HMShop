// pages/cart/index.js
Page({
  data: {

  },

  onLoad: function (options) {

  },

  handleChooseAdress () {
    wx.chooseAddress({
      success: (result)=>{
        console.log(result)
      }
    })
  }

})