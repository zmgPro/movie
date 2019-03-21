// pages/moviesDetail/moviesDetail.js
const getDb = require('../../db/database.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:"/images/p449619623.jpg",
    title:"热血警探",
    des:"尼古拉斯?安奇尔（西蒙?佩吉Simon Pegg 饰）在伦敦担任高级巡警，抓贼破案似乎是他最大的乐趣。为此他成为警局中最敬业最能干的警员。但这却招致了警长的妒嫉，可怜的尼古拉斯被调至一个偏僻平静的小镇当警察。"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.description.length)
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
            url: '/pages/commentEdit/commentEdit?type=text&title='+this.data.title,
          })
        }
        else{
          wx.navigateTo({
            
            url: '/pages/commentEdit/commentEdit?type=voice&title=' + this.data.title,
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})