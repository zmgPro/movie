//index.js
const app = getApp()
const getDb = require('../../db/database.js')

Page({
  data: {
    image:"",
    title:"",
    comment:"",
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
          this.setData({
            image:res,
            imageSrc:movieInfo.src
          })
        })
      let c = {}
      c.title = res.data[index].title
      getDb.getcommentsList(c)
        .then(res=>{

        if(res.data.length==0){
          this.setData({
            comment:"该电影暂无评论"
          })
        }
        else{
          let num = Math.floor((Math.random() * res.data.length));
          let name = res.data[num].userName
          this.setData({
            comment: name+"给你推荐了一部电影",
            commentId: res.data[num]._id
          })
        }
      })
      this.setData({
        title : res.data[index].title,
        description: res.data[index].description
      })
    })
  },
  movieDetail(e){

    let title = e.currentTarget.dataset.movie

    wx.navigateTo({
      url: '/pages/moviesDetail/moviesDetail?title='+title+'&image='+this.data.image + "&description="+this.data.description,
    })
  },
  bindGetUserInfo(e){

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
    
  },
  toCommentDetail(e){

    let id = e.currentTarget.dataset.commentid 
    if(id != undefined ){
      wx.navigateTo({
        url: '/pages/commentsDetail/commentsDetail?commentId='+this.data.commentId,
      })
    }
    else{
      this.setData({
        commentId:undefined
      })
    }
  }
  



  


})
