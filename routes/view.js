/*
 * @Author: Mia
 * @Date: 2022-04-27 13:17:51
 * @Description: 服务端页面路由
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
