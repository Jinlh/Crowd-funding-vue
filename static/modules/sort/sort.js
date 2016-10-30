// 定义分类组件模块
	//引入Util模块
	var Util = require("../Util/Util");
	var sortComponent = Vue.extend({
		props: ["ctype", "cattrs", "csearch"],
		template: Util.tpl('tpl_sort')
	})
	module.exports = sortComponent;
