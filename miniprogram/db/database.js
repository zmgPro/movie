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

    let openid={}
    openid.openid = res.result.openid

    return db.collection('customer').where(openid)
      .get()
      .then(res => {

        return res
      })
  })
}
function getcommentsList(condition){

  return db
    .collection('comments')
    .where(condition)
    .get()
    .then(res => {

      return res
    })
}
function getFavComments(condition){
  return db
    .collection('favorite')
    .where(condition)
    .get()
    .then(res => {

      return res
    })
}

exports.getFavComments = getFavComments;
exports.getcommentsList = getcommentsList;
exports.getCustomer = getCustomer;
exports.getMovieList = getMovieList;
exports.getMovieImage = getMovieImage;