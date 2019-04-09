// pages/customer/customer.js
const app = getApp()
const getDb = require('../../db/database.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myComment:{},
    favComment:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  onShow: function () {
    this.getMyComment()
    this.getFavComment()
  },
  getMyComment(){
    let condition = new Object()
    condition.openId = app.globalData.openId
      getDb.getcommentsList(condition)
      .then(res => {

        let movieList = res.data
        this.getImage(movieList)
          .then(res=>{

             this.setData({
                myComment:res
              })
          })
       
    
      })
  },
  getFavComment(){
    let condition = new Object()
    condition.openIdFav = app.globalData.openId
    getDb.getFavComments(condition)
      .then(res => {
        let movieList = res.data
        this.getImage(movieList)
          .then(res => {
            console.log(res)
            this.setData({
              favComment: res
            })
          })
      
      })
  },
 


toCommentDetail(e){

    // let id = e
    wx.navigateTo({
      url: '/pages/commentsDetail/commentsDetail?commentId='+e.currentTarget.dataset.commentid,
    })
  },
  getImage(movieList) {
    let promise = movieList.map(item => {
      return getDb.getMovieImage(item.imageSrc)
        .then(res => {
          item.url = res
          return item
        })
    })
    return Promise.all(promise).then(all => {
      // console.log(all)
      return all
      // this.setData({
      //   myComment: all
      // })
    })
  },
})