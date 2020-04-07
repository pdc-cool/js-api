/**
 * ES6 之前异步编程使用的有下面四种方法
 *  - 回调函数
 *  - 事件监听
 *  - 发布/订阅
 *  - Promise 对象
 */

 // 1.回调函数
 // Node 约定回调函数第一个参数是 err（如果没有错误该参数就是 null）
const fs  = require("fs");

fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
  if (err) throw err;
  console.log(data);
})

// 回调函数会出现多个回调嵌套，多个异步操作形成了强耦合，例如下面）
fs.readFile(fileA, 'utf-8', function (err, data) {
  fs.readFile(fileB, 'utf-8', function (err, data) {
    // ...
  });
});

// 2.Promise 对象允许将回调函数的嵌套，改成链式调用。采用 Promise，连续读取多个文件
const readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function (data) {
  console.log(data.toString());
})
.then(function () {
  return readFile(fileB);
})
.then(function (data) {
  console.log(data.toString());
})
.catch(function (err) {
  console.log(err);
});

// Promise 的最大问题是代码冗余，原来的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆then，原来的语义变得很不清楚

// 3.Generator 函数
//  - Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权
//  - Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制
//    -- 1.next返回值的 value 属性，是 Generator 函数向外输出数据；next方法还可以接受参数，向 Generator 函数体内输入数据
//    -- 2.Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误，使用指针对象的throw方法抛出的错误，可以被函数体内的try...catch代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的

// 4.异步任务的封装
const fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});

// 5.Thunk 函数
//  - Thunk 函数是自动执行 Generator 函数的一种方法