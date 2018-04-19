$(function() {
	var _id = 0; //记录id
	var pageLen = 0; //记录分页数

	//加载导航栏样式
	$.when(
		$.get("nav.html", function(data) {
			var name = location.search.split("=")[1];
			//				console.log(data);
			$(".nav").append(data);
			$(".guanli").css("background", "black");
			$(".guanli a").css("color", "white")
			$(".index a").on("click", function() {
				location = "index.html?username=" + name;
			})

			if(name != undefined) {
				$(".bo").html("欢迎：" + name + "<a class='zhuxiao'>注销</a>").css("color", "white").attr("flag", "exist");
				$(".zhuxiao").on("click", function() {
					location = "index.html";
				})
			} else {
				$(".bo").html("<a href='index.html'>请先登录</a>")
			}
		})
	).then(function() {
		//用户登录后的处理
		if($(".bo").attr("flag") == "exist") {
			//获取id
			$.get("/getid", function(data) {
				if(data.list.length != 0) {
					_id = data.list[data.list.length - 1].id;
				}
			})

			//加载page
			loadpage(1);

			//处理删除职位
			$("tbody").on("click", ".sub", function() {

				var _span = Number($(".page").find(".active").text());
				var _row = $(this).parents(".tb_body");

				$.post("/del", {
					id: _row.find(".id").html()
				}, function(res) {

					if(!res.code) {
						
						pageonclick(10, _span - 1);

						if($(".tb_body").length <= 1) {
							
							
							
							if(_span != 1) {
								loadpage(_span - 1);
							}

						}
					}

				})

			});

			//处理图片上传
			$(".logoImg").on('change', function(event) {
				event.preventDefault();
				//console.log(123);
				//判断文件的类型
				var type = this.files[0].type;
				if(type == "image/png" || type == "image/jpeg") {
					//我们可以通过JavaScript用一些键值对来模拟一系列表单控件 ,html5 
					var form = new FormData();
					form.append("upload", this.files[0]);
					console.log(form)
					$.ajax({ //如果我们使用jq，zp的ajax上传文件需要额外的配置2个参数
							url: '/upload',
							type: 'POST',
							dataType: "JSON",
							contentType: false, //发送信息到服务器的内容类型 告诉jq不要去设置Content-Type请求头//默认是 application/x-www-form-urlencoded （form类型） 
							processData: false, //processData 是jq 独有的参数 用于对data参数进行序列化处理，默认值是true，
							//所谓序列化 就是比如{ width:1680, height:1050 }参数对象序列化为width=1680&height=1050这样的字符串。
							data: form
						})
						.done(function(res) {

							$(".remImg").attr({
								code: res.code,
								src: res.img
							})
						})
				};
			});
			//修改图片上传
			$(".mdlogoImg").on('change', function(event) {
				event.preventDefault();
				//console.log(123);
				//判断文件的类型
				var type = this.files[0].type;
				if(type == "image/png" || type == "image/jpeg") {
					//我们可以通过JavaScript用一些键值对来模拟一系列表单控件 ,html5 
					var form = new FormData();
					form.append("upload", this.files[0]);

					$.ajax({ //如果我们使用jq，zp的ajax上传文件需要额外的配置2个参数
							url: '/upload',
							type: 'POST',
							dataType: "JSON",
							contentType: false, //发送信息到服务器的内容类型 告诉jq不要去设置Content-Type请求头//默认是 application/x-www-form-urlencoded （form类型） 
							processData: false, //processData 是jq 独有的参数 用于对data参数进行序列化处理，默认值是true，
							//所谓序列化 就是比如{ width:1680, height:1050 }参数对象序列化为width=1680&height=1050这样的字符串。
							data: form
						})
						.done(function(res) {

							$(".mdremImg").attr({
								code: res.code,
								src: res.img
							})
						})
				};
			});

			//处理添加职位
			$("#addbtn").on("click", function() {
				var addlen = 1;

				var _span = Number($(".page").find(".active").text());

				_id = Number(_id) + 1;
				
				var $workname = $("#workname"),
					$companyname = $("#companyname"),
					$workexp = $("#workexp"),
					$worktype = $("#worktype"),
					$workaddress = $("#workaddress"),
					$salay = $("#salay");
				var params = {}
				params.id = _id;

				if($(".remImg").attr("src") != undefined) {
					params.logoimg = $(".remImg").attr("src").split("/")[1];
				} else {
					params.logoimg = "";
				}

				params.workname = $workname.val();
				params.companyname = $companyname.val();
				params.workexp = $workexp.val();
				params.worktype = $worktype.val();
				params.workaddress = $workaddress.val();
				params.salay = $salay.val();
				if(!params.logoimg) {
					$("#inputInfo").html("请上传图片").css("color", "red");
					_id = Number(_id) - 1;
					return;
				}
				if(!params.workname || !params.companyname || !params.workexp || !params.worktype || !params.workaddress || !params.salay) {
					$("#inputInfo").html("数据项不能为空").css("color", "red");
				}

				$.get("/getlen", function(res) {

					addlen = res.count % 10;

					$.post("/addmsg", params, function(res) {
						if(!res.code) {
							var item = res.list;
							$('#add').modal('hide');
							var html = `<tr class="tb_body">
												<td class="id">${_id}</td>
												<td class="logoImg"><img src="${item.logoimg}" /></td>
												<td class="workname">${item.workname}</td>
												<td class="companyname">${item.companyname}</td>
												<td class="workexp">${item.workexp}</td>
												<td class="worktype">${item.worktype}</td>
												<td class="workaddress">${item.workaddress}</td>
												<td class="salay">${item.salay}</td>
												<td class "caozuo">
												<a class="modifyLink" data-toggle="modal" data-target="#modify" data-whatever="@mdo" style="margin-right: 10px; cursor: pointer;">修改</a>
												<a class="sub" style="cursor: pointer;">删除</a>
													</td>
											</tr>`;

							if($(".tb_body").length <= 9) {
								$(".tab_c tbody").append(html);
								return;
							}
							if(addlen == 0) {

								loadpage(_span + 1);
							}

						}
					})
				})

			})

			//处理职位修改
			$("tbody").on("click", ".modifyLink", function() {

				$("#mdinputInfo").html("");
				var _row = $(this).parents(".tb_body");
				var params = {};

				params.id = _row.find(".id").html();
				params.logoimg = _row.find(".logoImg img").attr("src");
				params.workname = _row.find(".workname").html();
				params.companyname = _row.find(".companyname").html();
				params.workexp = _row.find(".workexp").html();
				params.worktype = _row.find(".worktype").html();
				params.workaddress = _row.find(".workaddress").html();
				params.salay = _row.find(".salay").html();

				$("#modify").modal("show");
				
				$(".lomdremImg").attr("src", params.logoimg);
				$("#mdworkname").val(params.workname);
				$("#mdcompanyname").val(params.companyname);
				$("#mdworkexp").val(params.workexp);
				$("#mdworktype").val(params.worktype);
				$("#mdworkaddress").val(params.workaddress);
				$("#mdsalay").val(params.salay);

				$("#modifybtn").on("click", function() {
					var mdparams = {}
					mdparams.id = params.id;

					if($(".mdremImg").attr("src") != undefined) {
						mdparams.logoimg = $(".mdremImg").attr("src").split("/")[1];
					} else {
						mdparams.logoimg = $(".lomdremImg").attr("src");
					}

					mdparams.workname = $("#mdworkname").val();
					mdparams.companyname = $("#mdcompanyname").val();
					mdparams.workexp = $("#mdworkexp").val();
					mdparams.worktype = $("#mdworktype").val();
					mdparams.workaddress = $("#mdworkaddress").val();
					mdparams.salay = $("#mdsalay").val();

					if(!mdparams.logoimg || !mdparams.workname || !mdparams.companyname || !mdparams.workexp || !mdparams.worktype || !mdparams.workaddress || !mdparams.salay) {
						$("#mdinputInfo").html("数据项不能为空").css("color", "red");
						return;
					}

					$.post("/modfiymsg", mdparams, (res) => {

						if(!res.code) {

							_row.find(".id").html(mdparams.id);
							_row.find(".logoImg img").attr("src", mdparams.logoimg);
							_row.find(".workname").html(mdparams.workname);
							_row.find(".companyname").html(mdparams.companyname);
							_row.find(".workexp").html(mdparams.workexp);
							_row.find(".worktype").html(mdparams.worktype);
							_row.find(".workaddress").html(mdparams.workaddress);
							_row.find(".salay").html(mdparams.salay);

							$("#mdinputInfo").html("修改中，请稍后");

							setTimeout(function() {
								$('#modify').modal('hide');
							}, 0.5);

						}
					})

				})

			})

		}

	})

	//分页按钮点击处理函数
	function pageonclick(pageNum, page) {
		$.get("/load", {
			pageNum,
			page
		}, function(data) {

			//					console.log(data);

			var html = template("work-temp", data) //第二个参数一定是对象
			$(".tab_c tbody").html(html);
		});
	};

	//加载分页函数
	function loadpage(current) {
		//加载分页页数
		$.when(
			$.get("/getlen", function(data) {

				pageLen = Math.ceil(data.count / 10);

				
				if(data.count == 0){
					data.count = 1;
				}
				$('.page').pagination({
					totalData: data.count,
					showData: 10,
					keepShowPN: true,
					"current": current
				});

			})
		).then(function() {
			//加载职位数据
			fectchList('/load', 10, current - 1);

			

			//记录当前页数
			var _span = Number($(".page").find(".active").text());

			//分页点击事件
			$(".page").on("click", "a", function() {

				var _thisText = $(this).text();

				if(_thisText == "<") {
					if(_span > 1) {
						_span = _span - 1;

						pageonclick(10, _span - 1);

					}

					return;
				}

				if(_thisText == ">") {
					if(_span < pageLen) {

						_span = _span + 1;

						pageonclick(10, _span - 1);
					}

					return;
				}

				pageonclick(10, _thisText - 1);

				_span = Number(_thisText);

			})

		})
	};
	
function fectchList(url, pageNum, page) {
				$.get(url, {
					pageNum,
					page
				}, function(data) {
					//console.log(data);

					var html = template("work-temp", data) //第二个参数一定是对象

					//							console.log(html)

					$(".tab_c tbody").html(html);
				});
			};
			
})