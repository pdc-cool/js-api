function socketConnect(url) {
    // 客户端与服务器进行连接
    let ws = new WebSocket(url); // 返回`WebSocket`对象，赋值给变量ws
    // 连接成功回调
    ws.onopen = e => {
        console.log('连接成功', e)
        ws.send('我发送消息给服务端'); // 客户端与服务器端通信
    }
    // 监听服务器端返回的信息
    ws.onmessage = e => {
        console.log('服务器端返回：', e.data)
        // do something
    }
    return ws; // 返回websocket对象
}
let wsValue = socketConnect('ws://121.40.165.18:8800'); // websocket对象


// 工作中封装对应的类
class WebSocketClass {
    /**
     * @description: 初始化实例属性，保存参数
     * @param {String} url ws的接口
     * @param {Function} msgCallback 服务器信息的回调传数据给函数
     * @param {String} name 可选值 用于区分ws，用于debugger
     */
    constructor(url, msgCallback, name='default') {
        this.url = url;
        this.msgCallback = msgCallback;
        this.name = name;
        this.ws = null; // websockt 对象
        this.status = null; // websockt 是否关闭
    }

    /**
     * @description: 初始化 链接 websockt 或重连websockt时调用
     * @params {*}可选值 要穿的数据
     */
    connect(data) {
        // 新建websockt 对象
        this.ws = new WebSocket(this.url);
        this.ws.onopen = e => {
            // 连接 ws 成功回调
            this.status = 'open';
            console.log(`${this.name}连接成功`, e)
            // this.heartCheck();
            if (data !== undefined) {
                // 有要传的数据，就发给后端
                return this.ws.send(data);
            }
        }

        // 监听服务器返回的信息
        this.ws.onmessage = e => {
            // 把数据传给回调函数，并执行回调
            // if (e.data === 'pong') {
            //     this.pingPong = 'pong'; // 服务器端返回pong,修改pingPong的状态
            // }
            return this.msgCallback(e.data);
        }
        // ws关闭回调
        this.ws.onclose = e => {
            this.closeHandle(e); // 判断是否关闭
        }
        // ws出错回调
        this.ws.onerror = e => {
            this.closeHandle(e); // 判断是否关闭
        }
    }
    // heartCheck() {
    //     // 心跳机制的时间可以自己与后端约定
    //     this.pingPong = 'ping'; // ws的心跳机制状态值
    //     this.pingInterval = setInterval(() => {
    //         if (this.ws.readyState === 1) {
    //             // 检查ws为链接状态 才可发送
    //             this.ws.send('ping'); // 客户端发送ping
    //         }
    //     }, 10000)
    //     this.pongInterval = setInterval(() => {
    //         this.pingPong = false;
    //         if (this.pingPong === 'ping') {
    //             this.closeHandle('pingPong没有改变为pong'); // 没有返回pong 重启webSocket
    //         }
    //         // 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启
    //         console.log('返回pong')
    //         this.pingPong = 'ping'
    //     }, 20000)
    // }

    // 发送信息到服务器
    sendHandle(data) {
        console.log(`${this.name}断开，重连websockt`, e)
        return this.ws.send(data)
    }
    closeHandle(e = 'err') {
        // 因为 websockt 并不稳定，规定只能手动关闭（调closeMyself方法）,否则重连
        if (this.status !== 'close') {
            console.log(`${this.name}断开，重连websocket`, e)
            // if (this.pingInterval !== undefined && this.pongInterval !== undefined) {
            //     // 清除定时器
            //     clearInterval(this.pingInterval);
            //     clearInterval(this.pongInterval);
            // }
            this.connect(); // 重连
        } else {
            console.log(`${this.name}websocket手动关闭`)
        }
    }
     // 手动关闭WebSocket
    closeMyself() {
        console.log(`关闭${this.name}`)
        this.status = 'close';
        return this.ws.close();
    }
}

function someFn(data) {
    console.log('接收服务器消息的回调：', data);
}
// const wsValue = new WebSocketClass('ws://121.40.165.18:8800', someFn, 'wsName'); // 这个链接一天只能发送消息50次
const wsValue = new WebSocketClass('wss://echo.websocket.org', someFn, 'wsName'); // 阮一峰老师教程链接
wsValue.connect('立即与服务器通信'); // 连接服务器
// setTimeout(() => {
//     wsValue.sendHandle('传消息给服务器')
// }, 1000);
// setTimeout(() => {
//     wsValue.closeMyself(); // 关闭ws
// }, 10000)


// WebSockt不稳定
// WebSocket并不稳定，在使用一段时间后，可能会断开连接，貌似至今没有一个为何会断开连接的公论，所以我们需要让WebSocket保持连接状态，这里推荐两种方法。:
// 1.WebSocket设置变量，判断是否手动关闭连接：
// class类中就是用的这种方式:设置一个变量，在webSocket关闭/报错的回调中，判断是不是手动关闭的，如果不是的话，就重新连接，这样做的优缺点如下：
// 优点：请求较少(相对于心跳连接)，易设置
// 缺点： 可能会导致丢失数据,在断开重连的这段时间中，恰好双方正在通信

// 2.WebSocket心跳机制：
// 因为第一种方案的缺点，并且可能会有其他一些未知情况导致断开连接而没有触发Error或Close事件。
// 这样就导致实际连接已经断开了，而客户端和服务端却不知道，还在傻傻的等着消息来
// 心跳机制：客户端就像心跳一样每隔固定的时间发送一次ping，来告诉服务器，我还活着，而服务器也会返回pong，来告诉客户端，服务器还活着。

