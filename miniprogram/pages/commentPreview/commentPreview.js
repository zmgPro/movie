// pages/commentPreview/commentPreview.js
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
const app = getApp()
const getDb = require('../../db/database.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: "/images/p449619623.jpg",
    title: "热血警探",
    content:"",
    durationInfo:"",
    playStatus:"PLAY",
    type:"voice"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(app.globalData)
    let durationInfo = options.duration + 's'
    this.setData({
      type: options.type,
      title: options.title,
      image: options.image,
      userImage: app.globalData.userInfo.avatarUrl,
      userName: app.globalData.userInfo.nickName,
      durationInfo,
      duration:options.duration
    })
    let temp = ""
    if(options.type == "text"){
      this.setData({
        content: options.content,
      })
    }
    else{
      temp = options.content.replace("%3D", "=")
      console.log(temp)
      // console.log(temp.match(/=(.*).mp3/))

  
      // let duration = + temp.match(/=(.*).mp3/)[1] / 1000
      // let durationInfo = duration + "s"
      this.setData({
        content: temp,
        // duration,
        // durationInfo
      })
    }

 
    

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
    this.getImageSrc()
  },
  getImageSrc(){
    let c = {}
    c.title = this.data.title
    getDb.getMovieList(c)
      .then(res=>{
        console.log(res.data[0].src)
        this.setData({
          imageSrc : res.data[0].src
        })
      })
  },
 
  play: function () {
    console.log(this.data.content)
    innerAudioContext.src = this.data.content,
    innerAudioContext.play()
    this.setData({
      playStatus: "PLAYING"
    })
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    setTimeout(() =>{
      console.log('停止播放')
      this.setData({
        playStatus: "PLAY"
      })},this.data.duration*1000)
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  edit(){
    wx.navigateBack({
      
    })
  },
  addComment(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      image: 'none',
      duration: 2000,
    })
    if(this.data.type=="text"){
      wx.cloud.callFunction({
        name: "addComment",
        data: {
          title: this.data.title,
          openId: app.globalData.openId,
          type: this.data.type,
          imageSrc:this.data.imageSrc,
          content: this.data.content,
          userImage: app.globalData.userInfo.avatarUrl,
          userName: app.globalData.userInfo.nickName,
          duration:'0'
        }
      }).then(res => {
        wx.navigateTo({
          url: '/pages/commentsList/commentsList?title=' + this.data.title
        })
        console.log(res)
      
        })
    }
    else{
      let timestamp = new Date().getTime() 
      let cloudPath = 'voice/' + app.globalData.userInfo.nickName + timestamp+'.mp3'
      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: this.data.content, // 文件路径
      }).then(res => {
        wx.cloud.callFunction({
          name: "addComment",
          data: {
            title: this.data.title,
            openId: app.globalData.openId,
            imageSrc: this.data.imageSrc,
            type: this.data.type,
            content: res.fileID,
            userImage: app.globalData.userInfo.avatarUrl,
            userName: app.globalData.userInfo.nickName,
            duration:this.data.durationInfo
          }
        }).then(res => {
              wx.navigateTo({
                url: '/pages/commentsList/commentsList?title=' + this.data.title})
        })
        

      }).catch(error => {
        // handle error
        console.log(error)
      })
    }
    wx.showToast({
      title: '上传中',
      icon:'loading',
      duration:2000
    })

  }
  

})