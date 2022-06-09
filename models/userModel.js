/*
 * @Author: Mia
 * @Date: 2021-10-14 13:21:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-27 11:12:08
 * @Description: user数据库定义
 */
const mongoose = require("mongoose");

// 连接数据库
// mongoose.connect("mongodb://127.0.0.1:27017/test");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String },
    pwd: { type: String },
  },
  { versionKey: false }
);
// const bookSchema = new Schema(
//   {
//     name: { type: String },
//     author: { type: String },
//   },
//   {
//     versionKey: false,
//   }
// );
// const tagSchema = new Schema(
//   {
//     name: { type: String },
//     author: { type: String },
//   },
//   {
//     versionKey: false,
//   }
// );
// 取消数据库中的版本号

// const database = mongoose.connection;
// database.on("error", function (error) {
//   console.log("数据库连接失败");
// });

// database.once("open", function () {
//   console.log("连接成功");
// });

const db = {
  userModel: mongoose.model("userModel", userSchema),
  // bookSchema: mongoose.model("bookModel", bookSchema),
  // tagSchema: mongoose.model("tagModel", tagSchema)
};

module.exports = db;
