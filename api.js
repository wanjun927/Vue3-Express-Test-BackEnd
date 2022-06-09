const db = require("./models/userModel");
const vertoken = require("./token");
const Book = require("./models/bookModel");
const Tag = require("./models/tagModel");

module.exports = function (app) {
  // 解决跨域问题
  app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // access-control-allow-headers 允许跨域请求的请求头
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // 使用*通配符，因为post请求会请求两次，options
    // Access-Control-Allow-Methods 允许跨域请求的请求方式
    res.header("Access-Control-Allow-Methods", "*");
    res.header("X-Powered-By", " 3.2.1");
    // res.header("Content-Type", "application/json;charset=utf-8");
    // next()
    req.method === "OPTIONS" ? res.status(204).end() : next();
  });

  // 登录接口
  app.get("/api/user/login", function (req, res) {
    // 对前端数据进行验空
    if (!req.query.name && !req.query.pwd) {
      res.json({
        code: 600,
        msg: "账户或账号不能为空",
      });
      return;
    }
    db.userModel.findOne({ name: req.query.name }, function (err, doc) {
      if (err) {
        console.log("查询报错" + err);
      } else {
        if (!doc) {
          res.json({
            code: 700,
            msg: "该用户不存在",
          });
          return;
        } else {
          console.log(req.query.pwd, doc.pwd);
          if (req.query.pwd != doc.pwd) {
            res.json({
              code: 700,
              msg: "密码不正确",
            });
            return;
          } else {
            // Token设置
            vertoken.setToken(doc.name, doc.pwd).then((token) => {
              return res.json({
                code: 200,
                msg: "密码正确，登录成功",
                token: token,
              });
            });
            // res.json({
            //   code: 200,
            //   msg: '密码正确，登录成功',
            // })
            // return
          }
        }
      }
    });
  });

  // 注册接口
  app.post("/api/user/register", function (req, res) {
    console.log(req.body);
    if (!req.body.name && !req.body.pwd) {
      res.json({
        code: 600,
        msg: "账户和密码不能为空",
      });
    }
    db.userModel.findOne({ name: req.body.name }, function (err, doc) {
      if (doc) {
        return res.json({
          code: 600,
          msg: "该用户已存在",
        });
      } else {
        // 创建新用户
        let params = {
          name: req.body.name,
          pwd: req.body.pwd,
        };
        db.userModel.create(params, function (err, doc) {
          if (doc) {
            return res.json({
              code: 200,
              msg: "注册成功",
            });
          }
        });
      }
    });
    // return res.json({
    //   code:1
    // })
  });

  // 获取所有数据接口
  app.get("/api/user/getUserList", function (req, res) {
    db.userModel.find({}, function (err, doc) {
      return res.json({
        code: 200,
        msg: "成功",
        data: doc,
      });
    });
    // return res.json({
    //   code: 200,
    //   msg: '请求成功'
    // })
  });

  // 创建新书籍
  app.post("/api/book/createBook", (req, res) => {
    // console.log(req)
    // var book = req.body;
    Book.getBookByTitle({ title: req.body.title }, (err, book) => {
      if (book) {
        res.json({
          code: 600,
          msg: "书籍已存在",
        });
      } else {
        let temp;
        Tag.searchTag(req.body.genre, (err, info) => {
          if(err) {
            console.log('lallalal')
          }
          temp = info.map(item => {
            return item.tagName
          })
          Book.addBook({...req.body, genreName: temp}, (err, bookInfo) => {
            if (err) {
              console.log("查询报错" + err);
            }
            res.json({
              code: 200,
              data: bookInfo,
            });
          });
        })
      }
    });
  });

  // 获取书籍内容
  // app.get("/api/book/getInfo", (req, res) => {
  //   Book.getBookById(req.query.id, (err, book) => {
  //     if (err) {
  //       console.log("查询错误" + err);
  //     }
  //     res.json({
  //       code: 200,
  //       data: book,
  //       msg: "成功",
  //     });
  //   });
  // });

  // 获取全部书籍信息
  // app.get("/api/book/getAllBooksInfo", (req, res) => {
  //   Book.getBooks((err, book) => {
  //     if (err) {
  //       console.log("查询错误" + err);
  //     }
  //     res.json({
  //       code: 200,
  //       data: book,
  //       msg: "成功",
  //     });
  //   }, 100);
  // });

  // 删除书籍
  // app.post("/api/book/deleteBook", (req, res) => {
  //   console.log(req.query);
  //   Book.removeBook(req.body.id, (err, book) => {
  //     if (err) {
  //       console.log("删除失败" + err);
  //     }
  //     res.json({
  //       code: 200,
  //       // data: book,
  //       msg: "成功",
  //     });
  //   });
  // });

  // 编辑书籍
  // app.post("/api/book/updateBook", (req, res) => {
  //   console.log(req.body['_id'])
  //   Tag.searchTag(req.body.genre, (err, info) => {
  //     if(err) {
  //       console.log('lallalal')
  //     }
  //     temp = info.map(item => {
  //       return item.tagName
  //     })
  //     console.log('temp', temp)
  //     Book.updateBook(req.body['_id'], {...req.body, genreName: temp}, (err, book) => {
  //       if (err) {
  //         console.log("编辑失败" + err);
  //       }
  //       res.json({
  //         code: 200,
  //         msg: "成功",
  //       });
  //     });
  //   })
  // });

  // 获取全部tag
  app.get("/api/tag/getTagList", (req, res) => {
    Tag.getTagList((err, tag) => {
      if (err) {
        console.log("查询错误" + err);
      }
      res.json({
        code: 200,
        data: tag,
        msg: "成功",
      });
    });
  });

  // 创建新的tag
  app.post("/api/tag/createTag", (req, res) => {
    console.log("reqqqqq", req.body);
    Tag.addTag(req.body, (err, tagInfo) => {
      if (err) {
        console.log("查询报错" + err);
      }
      res.json({
        code: 200,
        data: tagInfo,
      });
    });
  });

  // 删除tag
  app.post("/api/tag/deleteTag", (req, res) => {
    Tag.removeTag(req.body.id, (err,book) => {
      if(err) {
        console.log("删除失败" + err)
      }
      res.json({
        code: 200,
        msg: '成功'
      })
    })
  })
};
