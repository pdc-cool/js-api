// 后台项目区别于其他项目，不同的权限对应不同的路由，同时侧边栏也需要根据不同的权限，异步生成
// 1.登录：拿到token之后（我会将这个token存贮到cookie中，保证刷新页面后能记住用户登录状态），前端会根据token再去拉取一个 user_info 的接口来获取用户的详细信息（如用户权限，用户名等等信息
// 2. 权限验证：通过token获取用户对应的 role，动态根据用户的 role 算出其对应有权限的路由，通过 router.addRoutes 动态挂载这些路由

// 刷新页面后 vuex 的内容也会丢失

// 用户登录成功之后，我们会在全局钩子router.beforeEach中拦截路由，判断是否已获得token，在获得token之后我们就要去获取用户的基本信息了
//router.beforeEach
if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
    store.dispatch('GetInfo').then(res => { // 拉取user_info
        const roles = res.data.role;
        next();//resolve 钩子
    })
}

//