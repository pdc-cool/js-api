const fs = require('fs');

//订阅发布者模式   订阅和发布没有关系
//1.构造函数的写法
function Events() {
	this.callbacks = [];
	this.results = [];
}
Events.prototype.on = function(callback) { //订阅
	this.callbacks.push(callback);
}
Events.prototype.emit = function(data) {  //发布
	this.results.push(data);
	this.callbacks.forEach(fn => fn(this.results))
}
let e = new Events();

e.on(function(arr) {
	if(arr.length === 3) {
		console.log(arr);
	}
});

fs.readFile('./JS/Async/data/age.txt', 'utf-8', (err, value) => {
    e.emit(data);
});
fs.readFile('./JS/Async/data/name.txt', 'utf-8', (err, value) => {
	e.emit(data);
});
fs.readFile('./JS/Async/data/job.txt', 'utf-8', (err, value) => {
	e.emit(data);
});

//2.普通对象的写法
let pubSub = {
	on(callback) {
		this.callbacks.push(callback);
	},
	emit() {
		this.callbacks.forEach(fn => fn());
	},
	callbacks: []
};
let data = [];


// 观察者模式   被观察者：宝宝  观察者：爸爸&&妈妈
class Subject {
	constructor(name) {
		this.name = name;
		//存放了观察者，被观察者状态变化的时候通知被观察者
		this.observers = [];
		this.state = '心情很好';
	}
	//被观察者要提供一个接受观察者的方法
	attach(observer) {
		this.observers.push(observer); //存放所有的观察者
	}
	//更改被观察者的状态
	setState(newState) {
		this.state = newState;
		this.observers.forEach(o => o.update())
	}
}

class Observer {
	constructor(name) {
		this.name = name;
	}
	//用来通知所有的观察者状态更新了
	update(newState) {
		console.log(this.name, newState);
	}
}

let sub = new Subject('宝宝');
let o1 = new Observer('爸爸');
let o2 = new Observer('妈妈');

sub.attach(o1);
sub.attach(o2);

sub.setState('心情不好了');

// call的实现
Function.prototype.call = function() {
	console.log('call实现');
}

//apply的实现
Function.prototype.apply = function() {
	console.log('apply实现');
}

//instanceof的实现:先将左右两边的值都转换为原型；然后比较不同就false，接着下一层比较，一直到leftValue.__proto__为null或者undefied
function instanceOf(leftValue, rightValue) {
	//1.先将左右两边的值都转换为原型
	let prototype = rightValue.prototype;
	leftValue = leftValue.__proto__;
	while(true) {
		//2.判断边界boundary问题
		if(leftValue === null || leftValue === undefined) return false;
		//3.判断当相等即可return true
		if(prototype === leftValue) return true;
		//4.不符合接着循环
		leftValue = leftValue.__proto__;
	}
}


//new的实现
function _new() {
	// 创建一个对象
	let target = {};
	let [constructor, ...args] = [...arguments];
	//连接到原型
	target.__proto__ = constructor.prototype; 
	//将this指向为创建的对象
	let result = constructor.apply(target, args);
	//如果constructor构造函数中return object类型的值，则返回return的内容;否则返回this
	typeof(result) === 'object' ? result : target;
}

//防抖的实现
function debounce() {

}

//节流的实现
function throttle() {

}

//深拷贝的实现
function deepCopy() {

}

//浅拷贝的实现
function shallowCopy() {

}

