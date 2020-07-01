/**
 * v-model 原理：bind 属性和 value 语法糖
 */

// <input v-model="inputValue"></input> 
// <input @input="inputValue = $event.target.value" :value="inputValue"></input>

/**
 * keepAlive 组件：(https://juejin.im/post/5b4320f9f265da0f7f4488f6)
 * keep-alive是Vue.js的一个内置组件。<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
 * 它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 
 * 这两个生命周期钩子函数将会被对应执行。它提供了include与exclude两个属性，允许组件有条件地进行缓存。
 */


/**
 * Vue.mixin()、Vue.extends()、Vue.component()、extends：(https://juejin.im/post/5d4175a76fb9a06ae17d5589)
 */