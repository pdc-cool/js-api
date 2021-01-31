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







/** axios封装 请求拦截、响应拦截 */
import axios from 'axios';
import router from '../router';
import store from '../store/index';
import qs from 'qs';

const CancelToken = axios.CancelToken,
	apiCach = {
		cacheMap: new Map() /** 缓存列表 */,
		taskList: [] /** 请求任务列表 */,
		/** 新增任务 */
		addTask(config, cancelToken) {
			this.taskList.push({ original: `${config.url}&${config.method}`, cancelToken });
		},
		/** 删除任务 */
		deleteTask(config, start, cancelToken) {
			let cancel = false;
			for (let i in this.taskList) {
				if (this.taskList[i]['original'] == `${config.url}&${config.method}`) {
					this.taskList[i].cancelToken('');
					this.taskList.splice(i, 1);
					cancel = true;
					break;
				}
			}
			if (!cancel && start) {
				this.deleteCach(config, cancelToken);
			}
		},
		/** 创建key */
		createKey(config) {
			let str = '';
			config.url && (str += config.url);
			if (config.method) {
				str += ',method:' + config.method;
				if (config.method === 'get') {
					str += ',data:' + qs.stringify(config.params) + '';
				} else {
					str += ',data:' + config.data;
				}
			}
			return str;
		},
		/** 删除缓存 */
		deleteCach(config, cancelToken) {
			let cacheMap = this.cacheMap;
			const key = this.createKey(config),
				now = new Date().getTime();
			let cach = cacheMap.get(key) || {};
			if (cach && cach.expirationTime && now <= cach.deadline && cach.data) {
				cach.cach = true;
				cancelToken(cach.data);
			}
		},
		/** 新增缓存 */
		addCach(config, cancel) {
			const key = this.createKey(config),
				expirationTime = config.headers.expirationTime || 0;
			if (expirationTime) {
				this.cacheMap.set(key, { expirationTime, deadline: new Date().getTime() + expirationTime, data: '', cancel });
			}
		},
		/** 更新缓存 */
		updateCach(res) {
			if (!res || !res.config) {
				return false;
			}
			const key = this.createKey(res.config),
				oldVal = this.cacheMap.get(key);
			if (!oldVal) {
				return false;
			}
			this.cacheMap.set(key, { expirationTime: oldVal.expirationTime, deadline: oldVal.deadline, data: res });
		},
	},
	/** 创建axios实例 */
	instance = axios.create({
		timeout: 1000 * 12,
	});

/** 设置post请求头 */
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/** 请求拦截器*/
instance.interceptors.request.use(
	(config) => {
		config.cancelToken = new CancelToken((c) => {
			/** 删除任务 | 缓存 */
			apiCach.deleteTask(config, true, c);
			/** 新增任务 | 缓存 */
			apiCach.addTask(config, c);
			apiCach.addCach(config, c);
		});
		config.headers.expirationTime = void 0;
		let token = window.localStorage.getItem('token');
		token = token ? token : '';
		token && (config.headers.Authorization = token);
		return config;
	},
	(error) => Promise.reject(error)
);

/** 响应拦截器 */
instance.interceptors.response.use(
	(res) => {
		apiCach.deleteTask(res.config, false);
		apiCach.updateCach(res);
		return Promise.resolve(res);
	},
	// 请求失败
	(error) => {
		if (error) {
			let { response } = error;
			/** 浏览器报错 */
			if (response) {
				if (response.status == 401 || response.status == 403) {
					localStorage.removeItem('token');
					store.commit('loginSuccess', null);
          router.replace('/login');
				}
			}
			if (error.message) {
				if (typeof error.message === 'string') {
					response = { code: 100002, message: error.message };
				} else if (typeof error.message === 'object') {
					response = error.message;
				}
			} else {
				response = {};
			}
			return Promise.resolve(response ? response : { code: 100002 });
		} else {
			return Promise.resolve({ code: 100002 });
		}
	}
);

export default instance;
