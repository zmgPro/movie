// pages/commentEdit/commentEdit.js
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
    type:"voice",
    content:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type:options.type,
      title:options.title,
      image:options.image
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

  //开始录音的时候
  start: function () {
    const options = {
      duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'acc',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
    console.log('recorder start')
    })
   
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //停止录音
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      innerAudioContext.src = res.tempFilePath
      innerAudioContext.onCanplay(() => {
        innerAudioContext.duration //类似初始化-必须触发-不触发此函数延时也获取不到
        setTimeout(()=>{
          //在这里就可以获取到大家梦寐以求的时长了
          // console.log(innerAudioContext.duration);//延时获取长度 单位：秒
          this.setData({
            duration: innerAudioContext.duration,
            tempFilePath:res.tempFilePath
          })
        }, 1000) 

         //这里设置延时1秒获取
      })
      
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
      let temp = res.tempFilePath.replace("=","%3D")
      console.log(res.tempFilePath)

      this.setData({
        content: temp
      })

    })
  },
  //播放声音
  play: function () {
    
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.tempFilePath,
    // innerAudioContext.play()
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  touchStart: function () {
    console.log('touchStart....')
    this.start();
  },
  touchEnd: function () {
    console.log('touchEnd....')
    this.stop()
  },
  finish(){

    // if (this.data.content.length==)
    wx.navigateTo({
      url: '/pages/commentPreview/commentPreview?content=' + this.data.content + "&type=" + this.data.type + "&title=" + this.data.title +"&image=" + this.data.image+"&duration=" + this.data.duration,
    })
  },
  textInput(e){

    this.setData({
      content:e.detail.value
    })
  }
})