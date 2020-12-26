/*
 * @Author: pengdongchu
 * @Descripttion: 优秀简介代码片段
 * @Date: 2020-12-26 11:01:55
 * @LastEditors: pengdongchu
 * @LastEditTime: 2020-12-26 11:03:59
 */

/* 统计字符串出现字母的次数 */
const str = 'sfhjasfjgfasjuwqrqadqeiqsajsdaiwqdaklldflas-cmxzmnha';
const res = str.split('').reduce((accumulator, cur) => {accumulator[cur] ? accumulator[cur]++ : accumulator[cur] = 1; return accumulator;}, {});
