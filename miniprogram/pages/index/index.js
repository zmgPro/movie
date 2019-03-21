//index.js
const app = getApp()
const getDb = require('../../db/database.js')

Page({
  data: {
    image:"",
    title:"",
    comment:"xx给你推荐了一部电影",
    des:"",
    auth:false
  },

  onLoad: function() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            auth:true
          })
        }
      }
    })
  
    },
  onShow:function(){
    let condition={}
    getDb.getMovieList(condition).then(res => {
      var index = Math.floor((Math.random() * res.data.length));
      let movieInfo = res.data[index]
      getDb.getMovieImage(movieInfo.src)
        .then(res=>{
          console.log(res)
          this.setData({
            image:res
          })
        })
      this.setData({
        title : res.data[index].title,
        description: res.data[index].description
      })
    })
  },
  movieDetail(e){
    console.log(e)
    let title = e.currentTarget.dataset.movie
    console.log(title)
    wx.navigateTo({
      url: '/pages/moviesDetail/moviesDetail?title='+title+'&image='+this.data.image + "&description="+this.data.description,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindGetUserInfo(e){
    console.log(e)
    if (e.detail.rawData != undefined){
      this.setData({
        auth:true
      })
      app.globalData.userInfo = e.detail.rawData
      wx.showToast({
        title: '登陆成功',
        icon: 'none',
        image: '',
        duration: 1000,
      })
    }
    else{
      wx.showToast({
        title: '登陆失败，请确认授权',
        icon: 'none',
        image: '',
        duration: 2000,
      })
    }
    
  }
  



  


})
