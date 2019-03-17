// pages/moviesList/moviesList.js
const getDb = require('../../db/database.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    let condition = {}
    getDb.getMovieList(condition).then(res => {
      let movieList = res.data
      this.getImage(movieList)
     
     
     
     
    })
  },

  getImage(movieList){
    let promise = movieList.map(item=>{
        return getDb.getMovieImage(item.src)
        .then(res=>{
          item.url =res
          return item
        })
      })
    
    Promise.all(promise).then(all=>{
     console.log(all)
     this.setData({
       movieList:all
     })
   })
  },
  toDetail(e){
    console.log(e)
    let temp = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/moviesDetail/moviesDetail?title=' + temp.title + '&image=' + temp.url + "&description=" + temp.des,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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

  }
})