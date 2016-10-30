//定义新闻详情组件模块
	//引入工具方法模块
	var Util = require("../Util/Util");
	var infoComponent = Vue.extend({
		template: Util.tpl('tpl_info'),
		props: ["ctype", "cattrs", "csearch"],
		data: function () {
			return {
				title: "",
				time: "",
				paras: []
			}	
		},
		created: function () {
			var me = this;
			//得到query字符串
			var query = me.$parent.query;
			var str = '?';
			if (query[0] && query[1]) {
				str += query[0] + '=' + query[1];
			}
			// 发送ajax请求
			Util.ajax('data/info.json' + str, function (res) {
				var image = [];
				if (res && res.errno === 0) {
					//遍历返回的段落数据，找到图片数据，预加载
					res.result.paras.forEach(function (value, index) {
						if(value.type === "") {
							image.push(new Image());
							$(image).attr("src", "../../../img/info/" + value.content);
						}
					})
					// 段落数据中的所有图片加载完成后，将ajax返回数据传递到组件内
					image.forEach(function (value) {
						value.onload = function () {
							me.paras = res.result.paras;
							me.title = res.result.title;
							me.time = res.result.time;
						}
					})
				}
			})
		}
	})

	module.exports = infoComponent;