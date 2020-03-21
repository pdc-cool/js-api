import axios from 'axios'
import qs from 'qs'

// 根据环境变量区分接口默认地址
switch (process.env.NODE_ENV) {
    case 'production':
        axios.defaults.baseURL = 'http://127.0.0.1:3000'
        break
    case 'test':
        axios.defaults.baseURL = 'http://10.0.0.99:3000'
        break
    default: 
        axios.defaults.baseURL = 'http://127.0.22.1:3000'
}

// 设置超时时间和是否允许携带凭证
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true

// 设置请求传递数据格式（看服务器要求什么格式）
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

// 只对 post 请求有作用, data 就是往请求体中的数据
axios.defaults.transformRequest = data => qs.stringify(data)

// 请求拦截器
// 客户端发送请求 -> [请求拦截器] -> 服务器
// TOKEN 校验（JWT）：接收服务器返回的 token，存储到 vuex/本地存储，每一次向服务器发送请求，我们应该把 token 带上
axios.interceptors.request.use(config => {
    // 携带 token
    let token = localStorage.getItem('token')
    token && (config.headers.Authorization = 'Bearer ' + token)
    return config
}, error => Promise.reject(error)
)

// 响应拦截器
// 服务器返回信息 -> [拦截的统一处理] -> 客户端 JS 获取信息
// axios.defaults.validateStatus = status => {
//     // 自定义响应成功的 HTTP 状态码
//     return /^(2|3)\d{2}$/.test(status)
// }
axios.interceptors.response.use(res => {
    return res.data
}, error => {
    let {
        response
    } = error

    if (response) {
        // 服务器起码返回结果
        switch (response.status) {
            case 401: // 当前请求需要用户验证（一般是未登录）
                break
            case 403: // 服务器已经理解请求但拒绝执行（一般是 Token 过期）
                localStorage.removeItem('token')
                // 跳转到登录页
                break
            case 404: // 请求失败，请求所希望得到的资源未被在服务器上发现
                break
        }
    } else {
        // 服务器连结果都没有返回
        if (!window.navigator.onLine) {
            // 断网处理：可以跳转到断网页面
            return
        }

        return Promise.reject(error)
    }
})


export default axios