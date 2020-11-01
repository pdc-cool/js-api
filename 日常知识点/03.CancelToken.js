/*------------------------------------------------
简介：项目中遇到点击 tab 栏，切换获取数据，但是可能会出现
响应时间最慢的数据慧覆盖之前响应的数据
思路：
  1.每次点击 tab，确保上一个 tab 的请求数据回来之后；
  2.使用 axios 的 CancelToken
引用地址：https://juejin.im/post/6844904056721260558#comment
-------------------------------------------------*/

// vue 例子
import axios from 'axios';
export default {
  data() {
    return {
      cancelRequest: null, // 初始时没有请求需要取消，设为null
    };
  },
  methods: {
    // 点击标签后发送请求的函数
    getCourse() {
      const that = this;
      // 2. 准备执行新的请求前，先将前一个请求取消
      // 如果前一个请求执行完了，执行取消请求不会有其他操作
      if (typeof that.cancelRequest === 'function') {
        that.cancelRequest();
      }
      // 这里配置请求的参数，略
      let params = {};
      // 发送请求
      axios.get('/api/app/course', {
        params: params,
        cancelToken: new CancelToken(function executor(c) {
          // 1. cancel函数赋值给cancelRequest属性
          // 从而可以通过cancelRequest执行取消请求的操作
          that.cancelRequest = c;
        }),
      });
    },
  },
};

// api
// /api/modules/course.js
// _this为vue组件实例对象
export function getCourseReq(params, _this) {
  return axios
    .get('/api/app/course', {
      params: params,
      cancelToken: new CancelToken(function executor(c) {
        // 1. cancel函数赋值给cancelRequest属性
        // 从而可以通过cancelRequest执行取消请求的操作
        _this.cancelRequest = c;
      }),
    })
    .then(res => {})
    .catch(err => {});
}
