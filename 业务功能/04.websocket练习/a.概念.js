// Websockt 解决了什么问题：
// 客户端(浏览器)和服务器端进行通信，只能由客户端发起ajax请求，才能进行通信，服务器端无法主动向客户端推送信息。
// 当出现类似体育赛事、聊天室、实时位置之类的场景时，客户端要获取服务器端的变化，就只能通过轮询(定时请求)来了解服务器端有没有新的信息变化
// 轮询效率低，非常浪费资源(需要不断发送请求，不停链接服务器)
// WebSocket的出现，让服务器端可以主动向客户端发送信息，使得浏览器具备了实时双向通信的能力,这就是WebSocket解决的问题
