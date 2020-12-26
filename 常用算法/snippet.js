/*
 * @Author: pengdongchu
 * @Descripttion: 优秀简介代码片段
 * @Date: 2020-12-26 11:01:55
 * @LastEditors: pengdongchu
 * @LastEditTime: 2020-12-26 11:18:13
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
