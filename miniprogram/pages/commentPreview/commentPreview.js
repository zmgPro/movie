// pages/commentPreview/commentPreview.js
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: "/images/p449619623.jpg",
    title: "热血警探",
    content:"",
    durationInfo:"",
    playStatus:"PLAY"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let temp = options.content.replace("%3D","=")
    // let regex = new RegExp(/[^=]+(?=.)/,"g");
    let duration = + temp.match(/=(.*).acc/)[1]/1000
    let durationInfo = duration + "s"
    this.setData({
      content:temp,
      duration,
      durationInfo
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
  play: function () {
    console.log(this.data.content)
    innerAudioContext.src = this.data.content,
    innerAudioContext.play()
    this.setData({
      playStatus: "STOP"
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
})