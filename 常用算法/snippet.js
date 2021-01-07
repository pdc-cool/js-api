/*
 * @Author: pengdongchu
 * @Descripttion: 优秀简介代码片段
 * @Date: 2020-12-26 11:01:55
 * @LastEditors: pengdongchu
 * @LastEditTime: 2021-01-07 09:53:52
 */

/* 统计字符串出现字母的次数 */
const str = `sfhjasfjgfasjuwqrqadqeiqsajsdaiwqdaklldflas-cmxzmnha`;
const res = str.split('').reduce((accumulator, cur) => {
  accumulator[cur] ? accumulator[cur]++ : (accumulator[cur] = 1);
  return accumulator;
}, {});

/* 数组 --> 对象 */
const streams = [
  { name: '技术', id: 1 },
  { name: '设计', id: 2 },
];
const obj = streams.reduce((accumulator, cur) => {
  accumulator[cur.id] = cur;
  return accumulator;
}, {});

/**
 * 批量引入文件或者注册
 * require.context: https://juejin.cn/post/6844903583113019405
 */
module.exports.install = function (Vue) {
  /*
    所有在./components目录下的.vue组件自动注册为全局组件
    以<mv-***></mv-***>为组件标签名，***是组件的.name，没有name的时候是组件的文件名
   */
  const requireAll = context => context.keys().map(context);

  const component = require.context('./components', false, /\.vue$/);

  requireAll(component).forEach(item => {
    const name = (item.name || /(\S+\/)(\S+)\.vue/.exec(item.hotID)[2]).toLowerCase();
    Vue.component(`mv-${name}`, item);
  });
};

/**
 * router.addRoutes 后，$router.options.routes 不更新问题,
 * 如何获取 addRoutes 添加的路由： 
 *  1、在addroutes时，手动使用 router.options.routes 重新赋值
 *  2、参考 vue-element-admin 作者方案，store 里维护一个 routes 
 *  对象，然后使用这个对象遍历生成侧面导航栏（https://github.com/PanJiaChen/vue-element-admin）
 * answer: options is the object passed to the vuerouter constructor. It's not modified afterwards.
 * doc: https://github.com/vuejs/vue-router/issues/1859
 */

/**
 * addRoutes 不能在已存在的路由下面添加子路由
 */

/**
 * 函数只调用一次
 * once 函数保证了这个调用函数只在系统中调用一次
 */
function once (fn) {
  // 利用闭包特性将 called 作为标志位
  var called = false;
  return function () {
    // 调用过则不再调用
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

/**
 * 高阶组件：接收一个组件作为参数，返回一个新的组件
 * 接收一个纯对象，并返回一个新的纯对象
 * https://juejin.cn/post/6844903545607553032
 */