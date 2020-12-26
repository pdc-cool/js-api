/*
 * @Author: pdc
 * @Date: 2020-11-01 11:12:35
 * @LastEditTime: 2020-11-01 11:42:01
 * @LastEditors: Please set LastEditors
 * @Description: 观察者模式简介
 * @FilePath: \js-api\设计模式\01.观察者模式.js
 */

/*---------------------------------------------------
简介：观察者模式,当对象间存在一对多关系时，则使用观察者
模式（Observer Pattern）。比如，当一个对象被修改时，则
会自动通知依赖它的对象。观察者模式属于行为型模式。
例如 token 处理中，token 即观察目标(Subject)，当 token 改变时，
执行 subscribers(内部的回调函数即为观察者 Observer) 数组中的回调函数，
观察目标和观察者是一对多的关系
----------------------------------------------------*/