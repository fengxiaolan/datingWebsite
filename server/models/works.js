var mongoose = require('mongoose');

var workSchema = require("../schemas/works");

//model封装数据库操作函数

var works = mongoose.model('works',workSchema); //创建model的时候

module.exports  = works;