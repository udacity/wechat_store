// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  const productId = event._id

  const cartRes = await db.collection('cart').where({
    productId,
    user,
  }).get()
  const cartList = cartRes.data

  if (!cartList.length) {
    await db.collection('cart').add({
      data: {
        productId,
        count: 1,
        user,
        image: event.image,
        name: event.name,
        price: event.price,
      },
    })
  } else {
    const count = cartList[0].count + 1
    await db.collection('cart').doc(cartList[0]._id).update({
      data: {
        count,
      },
    })
  }

  return {}
}