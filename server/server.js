const express = require('express')
const app = express();
const server = require('http').createServer(app);
var path = require('path');
const io = require('socket.io')(server);
const bodyparser = require('body-parser');

//解决跨域
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

//连接数据库
const mongoose = require('mongoose');
	mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/weChat",{useMongoClient: true})
	.then(function(db) {
		console.log("数据库连接成功");
	});

//监听端口
app.listen(8989, function() {
	console.log("后台连接成功")
});
server.listen(8888, function() {
	console.log("create socket")
});

//访问路径以及解析
app.use(express.static(path.join(__dirname, 'dist')));
const upload = require('./static/upload');
app.use(express.static("uploadcache"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ //处理form格式提交的post请求
	extended: true
}));

//请求数据库
const user = require("./models/user");

//处理用户登录
app.post("/user/login",function(req,res){
	//console.log(req.body)
	let {username,pwd} = req.body;
	user.find({"username":username},function(err,doc){
//		console.log(doc);
		if(doc.length == 0){
			res.json({
				code:1,
				msg:"用户未注册"
			});
			return
		}
		if(doc[0].pwd !== pwd){
			res.json({
				code:1,
				msg:"密码错误"
			});
			return
		}
		// loginUser.push(phone)
		res.json({
				code:0,
				msg:"登录成功",
				username:doc[0].username,
				id:doc[0]._id
			})
			
	})
	
});
//处理用户注册
app.post("/user/regist",function(req,res){
	console.log(req.body);
	let {username,pwd,phone} = req.body;
	let flag = false;
	user.find({
		"username": username
	}, function(err, doc) {
		if(doc.length == 0) {
			user.find({
				"phone": phone
			}, function(err, doc) {
				if(doc.length == 0) {
					let u = new user({ //user实例
						username,
						pwd,
						phone
				   });
				   u.save(function(err, doc) {
					   if(err) {
						   console.log(err);
						   res.json({
							   code: 1,
							   msg: "发生错误！"
						   })
						   return
					   };
					   res.json({
						   code: 0,
						   msg: "注册成功"
					   })
				   })
				} else {
					res.json({
						code: 1,
						msg: "电话号码已被注册"
					})
				}
			})
		} else {
			res.json({
				code: 1,
				msg: "用户名已存在"
			})
		}
	})

});


/*websocket组*/
var Messages = require('../models/messages')
var users = {};

io.on('connection', function (socket) {
	console.log('init socket')
	socket.on('message',res => {
		console.log(res);
		var mes = {
            username: res.username,
            src: res.src,
            msg: res.msg,
            img: res.img,
            roomid: res.room,
            time: res.time
        };
        io.to(mes.roomid).emit('message', mess);
        global.logger.info(obj.username + '对房' + mes.roomid+'说：'+ mess.msg)
        // console.log(obj.username + '对房' + mess.roomid+'说：'+ mess.msg)
        if (res.img === '') {
            var messages = new Messages(mes)
            messages.save(function (err, mes) {
                if (err) {

                    global.logger.error(err)
                }

                global.logger.info(mes)
            })
        }
	});

    socket.on('login',function (obj) {
        socket.name = obj.name
        socket.room = obj.roomid
        if (!users[obj.roomid]) {
            users[obj.roomid] = {}
        }
        users[obj.roomid][obj.name] = obj
        socket.join(obj.roomid)
        io.to(obj.roomid).emit('login', users[obj.roomid])
        global.logger.info(obj.name + '加入了' + obj.roomid)
    })

    socket.on('logout',function (obj) {
        try{
            const is = Object.hasOwnProperty.call(users[obj.roomid], obj.name)
            if (is) {
                delete users[obj.roomid][obj.name]
                global.logger.info(obj.name + '退出了' + obj.roomid)
                io.to(obj.roomid).emit('logout', users[obj.roomid])
                socket.leave(obj.roomid)
            }
        } catch (e) {
            global.logger.error(e)
        }
    })

    socket.on('disconnect', function () {
        console.log(socket.room, socket.name);
        if (users[socket.room] && users[socket.room].hasOwnProperty(socket.name)) {
            delete users[socket.room][socket.name]
            // 用户监听用退出聊天室
            global.logger.info(socket.name + '退出了' + socket.room)
            socket.leave(socket.roomid)
            io.to(socket.room).emit('logout', users[socket.room])
        }
    })
});
