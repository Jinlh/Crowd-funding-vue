
	//引入home模块
	var homeComponent = require("home/home");
	//引入list模块
	var listComponent = require("list/list");
	//引入product模块
	var productComponent = require("product/product");
	//引入login模块
	var loginComponent = require("login/login");
	//引入register模版
	var registerComponent = require("register/register");
	//引入sort模版
	var sortComponent = require("sort/sort");
	//引入investor模块
	var investorComponent = require("investor/investor");
	//引入newsList模块
	var newsComponent = require("news/news");
	//引入info模块
	var infoComponent = require("info/info");

	//注册组件
	Vue.component('home', homeComponent);
	Vue.component('list', listComponent);
	Vue.component('product', productComponent);
	Vue.component('login', loginComponent);
	Vue.component('register', registerComponent);
	Vue.component('sort',sortComponent);
	Vue.component('investor', investorComponent);
	Vue.component('news', newsComponent);
	Vue.component('info', infoComponent);

	//获取元素
	var $search = $("#search-container");
	var $layer = $("#layer");
	var $loginBounced = $("#login-bounced");
	var $footerNav = $("#footer-nav");
	var $slider = $("#slider");

	//实例化Vue对象
	var app = new Vue({
		el: '#app',
		data: {
			view: '',
			search: '',
			dealSearch: '',
			query: [],
			type: [
				{id: 1, title: '科技'},
				{id: 2, title: '艺术'},
				{id: 3, title: '农业'},
				{id: 4, title: '设计'},
				{id: 5, title: '娱乐'},
				{id: 6, title: '游戏'},
				{id: 7, title: '书籍'},
				{id: 8, title: '影视'},
				{id: 9, title: '商铺'},
				{id: 10, title: '其他'},
				{id: 9, title: ''},
				{id: 10, title: ''}
			],
			attrs: [
				{id: 1, title: '推荐项目'},
				{id: 2, title: '正在预热'},
				{id: 3, title: '最新上新'}
			]
		},
		methods: {
			// 搜索功能函数
			goSearch: function () {
				this.dealSearch = this.search;
			},
			//定义不同页面的公共事件
			publicEvent: function (event) {
				// 定义公共事件对象
				var targetEventFun={
					//判断点击元素类名是search时，显隐搜索框，同时显隐页面遮罩层
					"search":function(){
						if ($search.hasClass('show-search')) {
							$search.removeClass('show-search');
							$layer.hide();
						} else {
							$search.addClass('show-search');
							$layer.css('top', "2.25rem").show();
						}
					},
					//当点击搜索按钮时，隐藏搜索框
					"search-icon":function(){
						$search.removeClass('show-search');
						$layer.hide();
						this.search = "";
					},
					// 当点击搜索下拉框的扽类按钮时，隐藏搜索下拉框和遮罩层
					"type-tab": function () {
						$search.removeClass('show-search');
						$layer.hide();
					},
					//判断点击元素类名是go-back时，返回前一页
					"go-back": function () {
						history.go(-1);
					},
					//判断点击元素类名是go-top时，返回顶部
					"go-top": function () {
						var step = $(window).scrollTop() / 50; 
						var timer = setInterval(function () {
							if ($(window).scrollTop() === 0) {
								clearInterval(timer);
								return;
							}
							var endPosition = $(window).scrollTop() - step;
							window.scroll(0, endPosition);
						}, 5);
					},
					//判断点击元素类名是initiate、publish、ask、follow、compose、recommend时，显示提示框，出现遮罩层
					"initiate": loginBouncedShow,
					"publish": loginBouncedShow,
					"ask": loginBouncedShow,
					"follow": loginBouncedShow,
					"compose": loginBouncedShow,
					"recommend": loginBouncedShow,
					//判断点击元素类名是close时，隐藏提示框，隐藏遮罩层
					"close": function () {
						$loginBounced.hide();
						$layer.hide();
					}
				}
				// 定义登录弹框显示事件
				function loginBouncedShow () {
					$loginBounced.show();
					$layer.css('top', 0).show();
				}
				// 为目标事件函数传递事件对象，并调用执行
				if(typeof targetEventFun[event.target.className]==='function'){
					targetEventFun[event.target.className].apply(this, arguments);
				}
				
			}
		}
	})

	//定义路由函数
	var router = function () {
		var str = location.hash;
		str = str.slice(1);
		str = str.replace(/^\//, '');
		str = str.split('/');
		var map = {
			'home': true,
			'list': true,
			'product': true,
			'login': true,
			'register': true,
			"sort": true,
			"investor": true,
			"news": true,
			"info": true
		}
		
		if (map[str[0]]) {
			//为不同的路由配置对应组件模版
			app.view = str[0]
		}else {
			//设置默认路由
			app.view = 'home'
		}
		app.query = str.slice(1);
	}

	//定义窗口卷动事件
	function scrollEvent() {
		//控制主页导航
		if ($(window).scrollTop() >= 520 ) {
			$('#home-nav').addClass('pof');
		} else {
			$('#home-nav').removeClass('pof');
		}
		//控制列表页导航
		if ($(window).scrollTop() >= 85 ) {
			$('#list #list-nav').addClass('pof');
		} else {
			$('#list-nav').removeClass('pof');
		}
	}

	//定义html字号函数
	function setHTMLFontSize () {
		var ww = parseFloat(document.documentElement.clientWidth);
		if (ww >= 720) {
			ww = 720;
		}
		var fontSize = ww / (360 / 20);
		document.documentElement.style.fontSize = fontSize + 'px';
	}
	setHTMLFontSize ();

	//定义touch事件，通过移动方向，控制底部导航的显隐
	$('body').on('touchstart', function (e) {
		startY = e.touches[0].pageY;
		$('body').on('touchmove', function (e) {
			moveEndY = e.touches[0].pageY;
			deltaY = moveEndY - startY;
			if (deltaY > 0) {
				$footerNav.show();
			} else {
				$footerNav.hide();
			}
		})
	})
	
	//添加hash监听
	window.addEventListener('load', router);
	//添加路由改变事件监听
	window.addEventListener('hashchange', router);
	//添加窗口卷动事件监听
	window.addEventListener('scroll', scrollEvent);
	//添加窗口尺寸监听
	window.addEventListener('resize', setHTMLFontSize);	
