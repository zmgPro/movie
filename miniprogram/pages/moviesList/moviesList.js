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
    wx.showToast({
      title: '载入中',
      icon: 'loading',
      image: '',
      duration: 3000,
    })
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    let condition = {}
    getDb.getMovieList(condition).then(res => {
      let movieList = res.data
      this.getImage(movieList)
      wx.stopPullDownRefresh(
    
      )
    })
  },
  onPullDownRefresh: function () {

    // wx.startPullDownRefresh()
    this.onShow()
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      image: '',
      duration: 1000,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
  }

})