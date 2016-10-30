
	//定义工具方法
	var Util = {
		//获取页面元素的内容
		g: function (id) {
			return document.getElementById(id);
		},
		tpl: function (id) {
			return document.getElementById(id).innerHTML;
		},
		//封装ajax函数
		ajax: function (url, fn) {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						var data = JSON.parse(xhr.responseText);
						fn && fn(data);
					}
				}
			}
			xhr.open('GET', url, true);
			xhr.send(null);
		}
	}

	module.exports = Util;
