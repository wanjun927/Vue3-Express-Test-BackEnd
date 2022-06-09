/*
 * @Author: Mia
 * @Date: 2021-10-14 13:30:26
 * @Description: 
 */
const express = require('express')
const api = require('./api')
var path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

const testRouter = require('./routes/test')
const bookRouter = require('./routes/book')
const viewRouter = require('./routes/view')

var app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 设置默认连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/test");
// 取得默认链接
const database = mongoose.connection;
// 将链接与错误事件绑定
database.on('error', console.error.bind(console, '数据库链接错误'))


// const cors = require("cors");

// post请求表单处理
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded())


// 托管静态文件
app.use(express.static('public'));

// 路由管理
app.use('/view', viewRouter);
app.use('/api/test', testRouter);
app.use('/api/book', bookRouter);
api(app)

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('出错误了')
})

// 监听端口号
// const port = 3000
// app.listen(port, () => {
//   console.log(console.log(`Example app listening at http://localhost:${port}`))
// })

// 将app添加到 exports 模块
module.exports = app;