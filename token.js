const jwt = require('jsonwebtoken')
const jwtScret = 'hwj_first_token' // 此处为签名

// 生成签名的方法
const setToken = function(name, id) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign({
      name: name,
      id: id
    }, jwtScret, {
      expiresIn: '24h'
    })
    resolve(token)
  })
}

// 验证token
const getToken = function(token) {
  return new Promise((resolve, reject) => {
    if(!token) {
      console.log('token为空')
      reject({
        error: 'token为空'
      })
    } else {
      let info = jwt.verify(token.split(' ')[1], jwtScret)
      resolve(info)
    }
  })
}

module.exports = {
  setToken,
  getToken
}