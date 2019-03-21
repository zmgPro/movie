//app.js
wx.cloud.init({
  env: 'test-ae7227'
})
App({
  onLaunch(){
    wx.cloud.callFunction({
      name:"login"
    }).then(res=>{
      this.globalData.openId = res.result.openid
    })
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              this.globalData.userInfo = res.userInfo
            }
          })
        }
      }
      
    })
  },
  globalData:{
    userInfo:{},
    openId:""
  },

})
