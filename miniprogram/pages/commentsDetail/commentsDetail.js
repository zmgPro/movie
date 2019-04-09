// pages/commentsDetail/commentsDetail.js
const getDb = require('../../db/database.js')
const innerAudioContext = wx.createInnerAudioContext()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:{},
    playStatus:'PLAY',
    image:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      commentId:options.commentId
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
    condition._id = this.data.commentId
    getDb.getcommentsList(condition)
      .then(res => {
        console.log(res)
        let result = res.data[0]
        this.setData({
          comment:res.data
        })
        let title={}
        title.title = res.data[0].title
        getDb.getMovieList(title)
        .then(res=>{
          getDb.getMovieImage(res.data[0].src)
            .then(res=>{
              this.setData({
                image:res
              })
            })
        })
      })
  },

  addComment() {
    wx.showActionSheet({
      itemList: ['文字', '语音'],
      success: (res) => {

        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '/pages/commentEdit/commentEdit?type=text&title=' + this.data.comment[0].title + '&image=' + this.data.image,
          })
        }
        else {
          wx.navigateTo({

            url: '/pages/commentEdit/commentEdit?type=voice&title=' + this.data.comment[0].title + '&image=' + this.data.image,
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  play(){
    console.log(this.data.comment[0].content)
    wx.cloud.getTempFileURL({
      fileList: [{
        fileID: this.data.comment[0].content,
        maxAge: 60 * 60, // one hour
      }]
    }).then(res => {
      // get temp file URL
      console.log(res)
      let url = res.fileList[0].tempFileURL
      let s= this.data.comment[0].duration
      let durationTime = + s.substring(0, s.length - 1)
      console.log(durationTime)

      innerAudioContext.src = url
        innerAudioContext.play()
      this.setData({
        playStatus: "PLAYING"
      })
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      setTimeout(() => {
        console.log('停止播放')
        this.setData({
          playStatus: "PLAY"
        })
      }, durationTime * 1000)
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    }).catch(error => {
      // handle error
      console.log(error)
    })
  },
  addFav(){
   
    let c = this.data.comment[0]
    console.log(c)
    console.log(app.globalData.openId)
    wx.cloud.callFunction({
      name:'addFav',
      data: {
        commentId: c._id,
        openIdFav: app.globalData.openId,
        openId: c.openId,
        title: c.title,
        content: c.content,
        type: c.type,
        userImage: c.userImage,
        userName: c.userName,
        imageSrc: c.imageSrc,
        duration: c.duration,
      }
    }).then(res=>{
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        image: '',
        duration: 2000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      console.log(res)
    })
  }

})