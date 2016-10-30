// 定义投资人组件模块
	//引入Util模块
	var Util = require("../Util/Util");
	var investorComponent = Vue.extend({
		template: Util.tpl("tpl_investor"),
		props: ["ctype", "cattrs", "csearch"],
		data: function () {
			return {
				list: []
			}
		},
		created: function () {
			var me = this;
			Util.ajax('data/investor.json', function (res) {
				if(res && res.errno === 0) {
					me.list = res.result;
				}
			})
		}
	})

	module.exports = investorComponent;