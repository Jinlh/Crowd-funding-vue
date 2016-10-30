//定义注册页组件模块
	var Util = require("../Util/Util");
	var registerComponent = Vue.extend({
		template: Util.tpl('tpl_register'),
		props: ["ctype", "cattrs", "csearch"]
	})
	module.exports = registerComponent;