const cloud = require('wx-server-sdk')


cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    console.log(event)
    return await db.collection('favorite').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        commentId:event.commentId,
        openIdFav:event.openIdFav,
        openId: event.openId,
        title: event.title,
        content: event.content,
        type: event.type,
        userImage: event.userImage,
        userName: event.userName,
        duration: event.duration,
        time: new Date(),
        imageSrc: event.imageSrc,
      }
    })
  } catch (e) {
    console.error(e)
  }






}