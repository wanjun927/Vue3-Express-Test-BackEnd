/*
 * @Author: Mia
 * @Date: 2022-04-27 10:50:17
 * @Description:
 */
const express = require("express");
const Book = require("../models/bookModel");
const Tag = require("../models/tagModel")

const router = express.Router();

router.all("*", function (req, res, next) {
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

// 获取全部书籍信息
router.get("/getAllBooksInfo", (req, res) => {
  Book.getBooks((err, book) => {
    if (err) {
      console.log("查询错误" + err);
    }
    res.json({
      code: 200,
      data: book,
      msg: "成功",
    });
  }, 100);
});

// 获取单本书籍信息
router.get("/getInfo", (req, res) => {
  Book.getBookById(req.query.id, (err, book) => {
    if (err) {
      res.json({
        code: 600,
        msg: err
      })
    }
    res.json({
      code: 200,
      data: book,
      msg: "成功",
    });
  });
});

// 删除书籍
router.post("/deleteBook", (req, res) => {
  Book.removeBook(req.body.id, (err, book) => {
    if (err) {
      console.log("删除失败" + err);
    }
    res.json({
      code: 200,
      // data: book,
      msg: "成功",
    });
  });
});

// 编辑更新书籍
router.post("/updateBook", (req, res) => {
  console.log(req.body['_id'])
  Tag.searchTag(req.body.genre, (err, info) => {
    if(err) {
      console.log('lallalal')
    }
    temp = info.map(item => {
      return item.tagName
    })
    console.log('temp', temp)
    Book.updateBook(req.body['_id'], {...req.body, genreName: temp}, (err, book) => {
      if (err) {
        console.log("编辑失败" + err);
      }
      res.json({
        code: 200,
        msg: "成功",
      });
    });
  })
});

module.exports = router;
