// 定义首页组件模块
	//引入工具方法模块
	var Util = require("../Util/Util");
	var homeComponent = Vue.extend({
		template: Util.tpl('tpl_home'),
		props: ["ctype", "cattrs", "csearch"],
		data: function () {
			return {
				banner: [
					{id: 1, 'src' : '01.jpg'},
					{id: 2, 'src' : '02.jpg'},
					{id: 1, 'src' : '03.jpg'}
				],
				list: [],
				others: []
			}
		},
		computed: {
			maintype: function () {
				return this.ctype.slice(0, 8);
			}
		},
		created: function () {
			var me = this;
			Util.ajax('data/home.json', function (res) {
				if(res && res.errno === 0) {
					me.list = res.result.slice(0,4);
					me.others = res.result.slice(4);
					//启动轮播图
					 var mySwiper = new Swiper ('.swiper-container', {
					 	loop: true,
					    autoplay : 2000,
					    pagination: '.swiper-pagination',
					    autoplayDisableOnInteraction : false,
					  }) 
				} 
			})
		},
		methods: {
			// 返回顶部
			goTop: function () {
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
			// 显隐搜索下拉框和页面遮罩层
			showSearch: function () {
				if ($search.hasClass('show-search')) {
					$search.removeClass('show-search');
					$layer.removeClass('show-layer');
				} else {
					$search.addClass('show-search');
					$layer.addClass('show-layer');
				}	
			},
			// 显示登录弹框和页面遮罩层
			showLoginBounced: function () {
				$loginBounced.show();
				$layer.css('top', 0).show();
			},
			// 隐藏登录弹框和页面遮罩层
			hideLoginBounced: function () {
				$loginBounced.hide();
				$layer.hide();
			}
		}
	})
	
	module.exports = homeComponent;