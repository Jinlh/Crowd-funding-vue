//设置规范
fis.hook('commonjs');
// 配置模块化,并打包压缩功能js文件
fis.match('static/modules/**.js', {
	isMod: true,
	packTo: 'static/modules.js',
	optimizer: 'uglify-js'
})
//打包并压缩css文件
fis.match('static/modules/css/**.css', {
	packTo: 'static/modules.css',
	optimizer: 'clean-css'
})
// 打包并压缩js库文件
fis.match('static/lib/**.js', {
	packTo: 'static/lib.js',
	optimizer: 'uglify-js'
})
//加Md5戳
fis.match('**.{js,css}', {
	useHash: true
})
//匹配打包阶段，加载打包插件
fis.match('::package', {
	postpackager: 'loader'
})