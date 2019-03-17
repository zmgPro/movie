//index.js
const app = getApp()
const getDb = require('../../db/database.js')

Page({
  data: {
    image:"",
    title:"",
    comment:"xx给你推荐了一部电影",
    des:""
  },

  onLoad: function() {
     
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
  }



  


})
