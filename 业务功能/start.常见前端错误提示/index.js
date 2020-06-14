// 1. JS错误 Uncaught SyntaxError: Unexpected token u in JSON at position 0
// 在解析的时候出现 undefined 时，会出现此类报错 
let result = JSON.parse(undefined);