wx.cloud.init({
  env: 'test-ae7227'
})
const db = wx.cloud.database()
function getMovieList(){
    return db
      .collection('movie')
      .where({})
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
exports.getMovieList = getMovieList;
exports.getMovieImage = getMovieImage;