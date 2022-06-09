/*
 * @Author: Mia
 * @Date: 2022-04-26 10:59:20
 * @Description:
 */
// 导入 mongoose 模块
const mongoose = require("mongoose");

let counter = 1;
let CountedId = { type: Number, default: () => counter++ };

const tagSchema = mongoose.Schema({
  tagName: {
    type: String,
  },
  tagValue: CountedId
});

const Tag = (module.exports = mongoose.model("Tag", tagSchema));

module.exports.getTagList = (callback, limit) => {
  Tag.find(callback).limit(limit);
};

// Add Tag
module.exports.addTag = (tag, callback) => {
  Tag.create(tag, callback);
};

// delete Tag
module.exports.removeTag = (id, callback) => {
  var query = {tagValue: id}
  // TODO: 使用 deleteOne 或者是 deleteMany 来优化
  Tag.remove(query, callback)
}

// 根据tagValue 查询 tagName
module.exports.searchTag = (tagValue, callback) => {
  Tag.find({tagValue: {$in: tagValue}}, callback)
}


// 实现 tagValue 自增
Tag.find({ tagValue: { $gt: 0 } })
  .sort({ tagValue: -1 })
  .then(([first, ...others]) => {
    if (first) counter = first.tagValue + 1;
  });
