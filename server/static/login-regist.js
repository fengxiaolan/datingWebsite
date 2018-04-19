			//登录功能
			$("#login").on("click",function(){
					var params = {};
						params.username = $("#loginUsername").val();
						params.pwd = $("#loginPassword").val();
						
						if(!params.username || !params.pwd){
							alert("用户名或密码不能为空");
							return;
						}
						console.log(params);
						$.post('/user/login',params,function(res){
	                		console.log(res.msg);
	                		if(!res.code){
	                			location = "guanli.html?username=" +params.username;
	                		}
	                		$("#loginInfo").text(res.msg);
	                	})
			})
			
			//注册功能
			$("#regist").on("click",function(){
				var params = {};
					params.username = $("#registUsername").val();
					params.pwd = $("#registPassword").val();
					params.email = $("#email").val();
					
					var repwd = $("#rspassword").val();
					
					if(!params.username || !params.pwd){
						$("#registInfo").text("用户名或密码不能为空");
						return;
					}
					
					if(params.pwd !== repwd){
						$("#registInfo").text("输入密码不一致");
						return;
					}
					
					if(!params.email){
						$("#registInfo").text("email不能为空");
						return;
					}
					
					$.post("/user/regist",params,function(res){
						console.log(res);
						if(res.code){
							$("#registInfo").text("用户名已存在");
							return;
						}
						$("#registInfo").text("注册成功");
						setTimeout(function(){
							location = "index.html";
						},1000)
						
					})
					
			})
		