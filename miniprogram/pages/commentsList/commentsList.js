// pages/commentsList/commentsList.js
const getDb = require('../../db/database.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'千与千寻',
    comments:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let condition = new Object()
    condition.title = this.data.title
    getDb.getcommentsList(condition)
      .then(res=>{
        console.log(res)
        this.setData({
          comments:res.data
        })
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/commentsDetail/commentsDetail?commentId='+e.currentTarget.dataset.id,
    })
  }
})