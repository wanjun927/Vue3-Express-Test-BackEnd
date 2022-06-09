<!--
 * @Author: Mia
 * @Date: 2021-11-05 15:18:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-27 13:29:35
 * @Description: server 基于 Express 框架搭建的服务器
-->

# 启动后端项目

node index.js

# 整个架构的文件结构(可以是)

```
 app.js
    /bin
        www
    package.json
    /node_modules
        [约 4,500 个子文件夹和文件]
    /public
        /images
        /javascripts
        /stylesheets
            style.css
    /routes
        book.js
        tag.js
    /views
        index.pug
        layout.pug
```
- bin/www 调用应用入口的启动脚本
- routes 目录中用不同模块保存应用路由
- views 目录保存模块
- index(app) 来完成其余工作


# 记录 server 里的一下问题

## 1. 跨域问题

大部分服务器能够识别的请求头为 `application/x-www-form-urlencoed` ,而 `axios` 的 post 请求的请求头是 `application/json`

所以对 `axios` 的 post 请求参数进行序列化

```javascript
axios.post(url, qs.stringify(params));
```

post 请求头设置

```javascript
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
```

`express` 取到的 req.body 为 undefined
express 本身是没有解析 req.body 的，如果不安装解析 req.body 的插件，打印出来的 req.body 就会是 undefined

为了解析 req.body 一般可以安装 body-parser 这个插件：

```
// 假设 `app` 是 `express` 的实例：

const bodyParser = require('body-parser')

// 在所有路由前插入这个中间件：

app.use(bodyParser.urlencoded())
```

bodyParser.urlencoded()是 HTML 中默认的查询字符串形式的编码,即 application/x-www-form-urlencoded. 如果需要解析其他格式的，则需要分别加入其他格式的中间件，比如：

bodyParser.json() 支持 JSON 格式（application/json）

bodyParser.raw() 将会把 req.body 置为一个 Buffer (Content-Type：application/octet-stream)

bodyParser.text() 将会把 req.body 置为一个 string (Content-Type: text/plain)

然而上传文件用的 multipart/form-data 格式却没有被 bodyParser 所支持，需要使用 busboy 之类的其他中间件。

## 2. Mongoose 的数据自增处理问题

## 3. 接口按类型拆分到文件

```javascript
const express = require("express");
const router = express.Router();
router.get("/", function (req, res, next) {
  res.json({
    code: 200,
    msg: "success",
  });
});
module.exports = router;
// 在index 文件夹中
const testRouter = require("./routes/test");
app.use("/api/test", testRouter);
```

## 4. #!/user/bin/env node 的含义

其实就是 unix 类操作系统中一个普通文件带有#!开头的，就会当做一个执行文件来运行，因为#在很多脚本里面是用作注释开头的符号，如果当做执行脚本运行的话，相当于这行就是注释，其实没有什么用，只是标识的作用，说明这个文件可以当做脚本来运行

上面说了带有#!就是代表此文件可以当做脚本运行，那么怎么运行呢，运行什么呢
/usr/bin/env node 这行的意思就是用 node 来执行此文件，node 怎么来呢，就去用户(usr)的安装根目录(bin)下的 env 环境变量中去找，简单的说就是如果在 windows 上面，就去安装 node 的 bin 目录去找 node 执行器，一般我们都放在环境变量中，所以就能正确找到 node 来执行

[参考链接](https://www.jianshu.com/p/322dbb06f9ef)

## 5. nodemon

```txt
npm install --save-dev nodemon
```

项目文件更新时，重启服务器
