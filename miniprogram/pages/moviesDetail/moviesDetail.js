// pages/moviesDetail/moviesDetail.js
const getDb = require('../../db/database.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:"/images/p449619623.jpg",
    title:"热血警探",
    des:"尼古拉斯?安奇尔（西蒙?佩吉Simon Pegg 饰）在伦敦担任高级巡警，抓贼破案似乎是他最大的乐趣。为此他成为警局中最敬业最能干的警员。但这却招致了警长的妒嫉，可怜的尼古拉斯被调至一个偏僻平静的小镇当警察。小镇已经几十年没有过恶性犯罪事件。尼古拉斯在那里过得相当郁闷，他觉得自己的擒贼本领没有施展空间。更令他烦恼的是，镇里警察局局长儿子丹尼?巴特曼（尼克?弗罗斯特 Nick Frost 饰）也来凑热闹，成为他的搭档。这个新搭档麻烦至极，整天询问大城市的警员经历。正在尼古拉斯烦心于镇里鸡毛蒜皮的事务和身边的苯搭档时，镇里却发生了一桩案件，让尼古拉斯?嗅到了大展拳脚的机会，惊心动魄的战役开始了。)"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.description.length)
    let description = ""
    if (options.description.length>120){
      description = options.description.slice(0,120) + "..."
    }
    else{
      description = options.description
    }
    this.setData({
      image:options.image,
      title:options.title,
      des:description
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

  }
})