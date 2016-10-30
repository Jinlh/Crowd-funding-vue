// 定义新闻列表组件模块
	var Util = require("../Util/Util");
	var newsComponent = Vue.extend({
		template: Util.tpl('tpl_news'),
		props: ["ctype", "cattrs", "csearch"],
		data: function () {
			return {
				list: [],
				page: 0
			}	
		},
		created: function () {
			var me = this;
			Util.ajax('data/news.json', function (res) {
				if (res && res.errno === 0) {
					me.list = res.result;
				}
			})
		},
		methods: {
			// 点击“下一页加载更多”
			loadMore: function () {
				var me = this;
				me.page++;
				Util.ajax('data/news' + me.page + '.json', function (res) {
					if (res && res.errno === 0) {
						me.list = me.list.concat(res.result);
						me.nowPage = res.nowPage;
						me.totalPage = res.totalPage;
					}
				})
			}
		}
		
	})

	module.exports = newsComponent;