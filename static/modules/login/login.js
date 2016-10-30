//定义登录页组件模块
	var Util = require("../Util/Util");
	var loginComponent = Vue.extend({
		template: Util.tpl('tpl_login'),
		props: ["ctype", "cattrs", "csearch"],
		methods: {
			goBack: function () {
				history.go(-1)
			}
		}
	})
	module.exports = loginComponent;