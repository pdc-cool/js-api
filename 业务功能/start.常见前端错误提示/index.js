// 1. JS错误 Uncaught SyntaxError: Unexpected token u in JSON at position 0
// 在解析的时候出现 undefined 时，会出现此类报错 
let result = JSON.parse(undefined);

// 2.iphone x 适配底部问题
// 文档：https://www.cnblogs.com/WQLong/p/7778368.html
// https://juejin.im/post/5d6cb884f265da03ae788f28