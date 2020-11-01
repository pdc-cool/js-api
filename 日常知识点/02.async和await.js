// 注意点
// 1.await 命令后面的 promise 对象运行结果可能是 project，导致 async函数的返回值变为 rejected 状态，可以使用 try catch
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 2.多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发
let foo = await getFoo()
let bar = await getBar()

// 可以同时触发（由于是相互独立的异步操作）
let [foo, bar] = await Promise.all([getFoo(), getBar()])

// 3.await命令只能用在async函数之中，如果用在普通函数，就会报错
