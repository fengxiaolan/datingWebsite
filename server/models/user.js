var mongoose = require('mongoose');

var UserSchema = require("../schemas/user");

//model封装数据库操作函数

var User = mongoose.model('users',UserSchema); //创建model的时候

module.exports  = User;

