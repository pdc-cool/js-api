// 参考地址：http://blog.haoji.me/js-excel.html#dao-chu-excel

// 1.读取 excel
// 读取excel主要是通过 XLSX.read(data, {type: type});方法来实现，返回一个叫WorkBook的对象，type主要取值如下
// base64: 以base64方式读取；
// binary: BinaryString格式(byte n is data.charCodeAt(n))
// string: UTF8编码的字符串；
// buffer: nodejs Buffer；
// array: Uint8Array，8位无符号数组；
// file: 文件的路径（仅nodejs下支持）

// 读取本地excel文件
function readWorkbookFromLocalFile(file, callback) {
	var reader = new FileReader();
	reader.onload = function(e) {
		var data = e.target.result;
		var workbook = XLSX.read(data, {type: 'binary'});
		if(callback) callback(workbook);
	};
	reader.readAsBinaryString(file);
}

// 从网络上读取某个excel文件，url必须同域，否则报错
function readWorkbookFromRemoteFile(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(e) {
		if(xhr.status == 200) {
			var data = new Uint8Array(xhr.response)
			var workbook = XLSX.read(data, {type: 'array'});
			if(callback) callback(workbook);
		}
	};
	xhr.send();
}

// 详解 workbook：这块内容可以直接通过上面链接查看

// 导出 excel: 链接文档中的方法都封装在 xlsx npm 包中

// XLSX.utils.sheet_to_csv：生成CSV格式
// XLSX.utils.sheet_to_txt：生成纯文本格式
// XLSX.utils.sheet_to_html：生成HTML格式
// XLSX.utils.sheet_to_json：输出JSON格式

