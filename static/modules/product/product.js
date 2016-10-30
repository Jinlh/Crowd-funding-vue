//定义产品组件模块
	//引入工具方法模块
	var Util = require("../Util/Util");
	var productComponent = Vue.extend({
		template: Util.tpl('tpl_product'),
		props: ["ctype", "cattrs", "csearch"],
		data: function () {
			return {
				data: {},
				imgSrc: "",
				returnList: [],
				list: [],
				isShow: false
			}	
		},
		created: function () {
			var me = this;
			var query = me.$parent.query;
			var str = '?';
			if (query[0] && query[1]) {
				str += query[0] + '=' + query[1];
			}
			Util.ajax('data/product.json' + str, function (res) {
				if (res && res.errno === 0) {
					me.data = res.result;
					me.imgSrc = res.result.imgSrc;
					me.list = res.result.returnn;
					me.returnList = me.list.slice(0, 3);
				}
			})
		},
		methods: {
			//点击“展示详情”
			showDetails: function () {
				this.isShow = !this.isShow;
			},
			// 显示全部回报
			loadMore: function () {
				if($(".sta1").hasClass('dis-n')) {
					$(".sta1").removeClass('dis-n');
					$(".sta2").addClass('dis-n');
					this.returnList = this.list.slice(0, 3);
				} else {
					$(".sta2").removeClass('dis-n');
					$(".sta1").addClass('dis-n');
					this.returnList = this.list;
				}
			}
		} 
	})

	module.exports = productComponent;