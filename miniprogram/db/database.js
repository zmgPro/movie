wx.cloud.init({
  env: 'test-ae7227'
})
const db = wx.cloud.database()
function getMovieList(condition){
    return db
      .collection('movie')
      .where(condition)
      .get()
      .then(res=>{
        console.log(res)
        return res
      })
}
function getMovieImage(imageName){
  return wx.cloud.downloadFile({
    fileID: 'cloud://test-ae7227.7465-test-ae7227/image/'+imageName
  }).then(res => {
    // get temp file path
    
    return res.tempFilePath
  }).catch(error => {
    // handle error
    return error
  })
}
function getCustomer(){
  return wx.cloud.callFunction({
    name:"login"
  }).then(res=>{
    console.log(res)
    let openid={}
    openid.openid = res.result.openid
    console.log(openid)
    return db.collection('customer').where(openid)
      .get()
      .then(res => {
        console.log(res)
        return res
      })
  })
}
exports.getCustomer = getCustomer;
exports.getMovieList = getMovieList;
exports.getMovieImage = getMovieImage;