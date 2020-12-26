/*
 * @Author: pengdongchu
 * @Descripttion: 优秀简介代码片段
 * @Date: 2020-12-26 11:01:55
 * @LastEditors: pengdongchu
 * @LastEditTime: 2020-12-26 15:12:07
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

