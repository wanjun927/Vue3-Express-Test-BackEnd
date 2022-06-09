/*
 * @Author: Mia
 * @Date: 2022-04-27 10:46:05
 * @Description: 
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    code: 200,
    msg: 'success'
  })
});

module.exports = router;
