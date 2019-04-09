const cloud = require('wx-server-sdk')


cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
    try {
      return await db.collection('comments').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          openId: event.openId,
          title:event.title,
          content:event.content,
          type:event.type,
          imageSrc:event.imageSrc,
          userImage: event.userImage,
          userName: event.userName,
          duration:event.duration,
          time: new Date(),
        }
      })
    } catch (e) {
      console.error(e)
    }
  





}