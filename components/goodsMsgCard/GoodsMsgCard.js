// components/goodsMsgCard/GoodsMsgCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    carts:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDetails (e) {
      const { id } = e.currentTarget.dataset
      this.triggerEvent('showDetails', id)
    }
  }
})
