
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()

Page({

  data: {

  },


  /**  
   * 生命周期函数--监听页面加载  
   */
  onLoad: function (options) {

    console.log(recorderManager)



  },

  //开始录音的时候
  start: function () {
    //https://www.cnblogs.com/danielWise/p/9020884.html
    const options = {
      duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },

  //停止录音
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  },


  //播放声音
  play: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.tempFilePath,
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


  //发送图片
  updata_img: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'],
      success: function (res) {


        console.log('tempFiles', res.tempFiles[0].size)
        var size = res.tempFiles[0].size;
        var size_kb = (size / 1000).toFixed(2);//
        if (size_kb > 2048) {
          console.log('2048', '2048')
        }
        console.log('size_kb', size_kb)
      }
    })
  },

});