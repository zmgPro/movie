// pages/moviesDetail/moviesDetail.js
const getDb = require('../../db/database.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:"",
    title:"",
    des:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let description = ""
    if (options.description.length>120){
      description = options.description.slice(0,120) + "..."
    }
    else{
      description = options.description
    }

    this.setData({
      image:options.image,
      title:options.title,
      des:description
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
  addComment(){
    wx.showActionSheet({
      itemList: ['文字', '语音'],
      success:(res) =>{
        console.log(res.tapIndex)
        if(res.tapIndex==0){
          wx.navigateTo({
            url: '/pages/commentEdit/commentEdit?type=text&title=' + this.data.title + '&image=' + this.data.image,
          })
        }
        else{
          wx.navigateTo({
            
            url: '/pages/commentEdit/commentEdit?type=voice&title=' + this.data.title + '&image=' + this.data.image,
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  toCommmentDetail(){
    wx.navigateTo({
      url: '/pages/commentsList/commentsList?title='+this.data.title,
    })
  }
})