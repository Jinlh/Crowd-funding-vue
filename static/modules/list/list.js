// 定义列表组件模块
	//引入工具方法模块
	var Util = require("../Util/Util");
	var listComponent = Vue.extend({
		props: ["ctype", "cattrs", "csearch"],
		template: Util.tpl('tpl_list'),
		data: function () {
			return {
				sorts: [
					{value: '全部分类', key: 'type', id:1},
					{value: '全城', key: 'city', id: 2},
					{value: '所有项目', key: 'financingStatus', id:3}
				],
				city: [
					{value: '北京', id: '1'},
					{value: '湖南', id: '2'},
					{value: '河北', id: '3'},
					{value: '重庆', id: '4'},
					{value: '安徽', id: '5'},
					{value: '黑龙江', id: '6'},
					{value: '天津', id: '7'},
					{value: '福建', id: '8'},
					{value: '江西', id: '9'},
					{value: '西藏', id: '10'},
					{value: '湖北', id: '11'},
					{value: '上海', id: '12'},
					{value: '河南', id: '13'},
					{value: '新疆', id: '14'},
					{value: '辽宁', id: '15'},
					{value: '陕西', id: '16'},
					{value: '江苏', id: '17'},
					{value: '广西', id: '18'},
					{value: '浙江', id: '19'}
				],
				status: [
					{value: '筹资成功', id:'1'},
					{value: '筹资失败', id:'2'},
					{value: '筹资中', id:'3'}
				],
				list: [],
				copyList: [],
				page: 0,
				listIndex: ""
			}	
		},
		created: function () {
			var me = this;
			Util.ajax('data/list.json', function (res) {
				if (res && res.errno === 0) {
					me.list = res.result;
					me.copyList = res.result;
					me.nowPage = res.nowPage;
					me.totalPage = res.totalPage;
				}
			})
		},
		// 监听cquery属性，当用户执行搜索业务时重新发送ajax请求
		watch: {
			'cquery': function () {
				// 得到query字符串
				var me = this;
				var query = me.$parent.query;
				var str = '?';
				if (query[0] && query[1]) {
					str += query[0] + '=' + query[1]
				}
				// 发送ajax请求
				Util.ajax('data/list.json' + str, function (res) {
					if (res && res.errno === 0) {
						me.list = res.result;
						me.nowPage = res.nowPage;
						me.totalPage = res.totalPage;
					}
				})
			}
		},
		methods: {
			// 点击“下一页加载更多”
			loadMore: function () {
				var me = this;
				me.page++;
				Util.ajax('data/list' + me.page + '.json', function (res) {
					if (res && res.errno === 0) {
						me.list = me.list.concat(res.result);
						me.nowPage = res.nowPage;
						me.totalPage = res.totalPage;
					}
				})
			},
			// 点击分类导航，通过改变listIndex的值，控制下拉框和页面遮罩层的显隐
			showList: function () {
				if(this.listIndex === $(event.target).attr("idx")) {
					this.listIndex = "";
					$("#layer").hide();
				} else {
					this.listIndex = $(event.target).attr("idx");
					$("#layer").css('top', "4.4rem").show();
				}
				
			},
			// 点击下拉框选项后隐藏下拉框和遮罩层
			hideList: function () {
				this.listIndex = "";
				$("#layer").hide();
			},
			showAll: function () {
				//隐藏下拉框和遮罩层
				this.listIndex = "";
				$("#layer").hide();
				//cquery重置
				this.csearch = "";
				//page清零
				this.page = 0;
				// 显示全部list
				this.list = this.copyList;
			}
		}
	})
	
	module.exports = listComponent;
