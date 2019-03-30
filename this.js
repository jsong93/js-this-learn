console.log(this === window) // true
a = 1
console.log(window.a) // 1
console.log(this.a) // 1

this.b = 'jsong'
console.log(window.b) // jsong
console.log(b) // jsong




console.log(this === window) // true

function f1() {
    return this;
}

console.log(f1() === window) // true

function f2() {
    'use strict'
    return this;
}

console.log(f2() === window) // false
console.log(f2() === undefined) // true




var obj = {
    a: 'obj-a'
}

var a = 'window-a'

function whatsThis(arg) {
    return this.a // this 的值取决于函数的调用方式
}

console.log(whatsThis()) // window-a
console.log(whatsThis.call(obj)) // obj-a
console.log(whatsThis.apply(obj)) // obj-a




// call apply
function add(c, d) {
    return this.a + this.b + c + d
}

var obj = {
    a: 1,
    b: 2
}

// 给obj增加add属性，并调用它 add中的lthis指向obj
console.log(add.call(obj, 5, 6)) // 1+2+5+6=14

console.log(add.apply(obj, [10, 20])) // 1+2+10+20=32






// bind

function fn() {
    return this.a
}

var bindFn = fn.bind({
    a: 'jsong'
})
console.log(bindFn()) // jsong

var againFn = bindFn.bind({
    a: 'haha'
})
console.log(againFn()) // jsong  bind只生效一次！

var obj = {
    a: 22,
    f1: bindFn(),
    f2: againFn()
}

console.log(obj.a, obj.f1, obj.f2) // 22, jsong, jsong





const globalThis = this
const fn = () => this
console.log(fn() === globalThis) //true

const obj = {
    fn: fn
}

// 无论怎么改变fn的调用方式，this的指向始终保持不变
console.log(obj.fn() === globalThis) // true
console.log(fn.call(obj) === globalThis) // true
console.log(fn.apply(obj) === globalThis) // true

const fnn = fn.bind(obj)
console.log(fnn() === globalThis) // true




// 创建一个含有bar方法的obj对象
// bar返回一个函数
// 这个函数返回this
// 这个返回的函数是箭头函数
// 所以this被永久绑定到他的外层函数的this
// bar的值可以在调用值设置，这反过来又设置了返回函数的值 ？？？
var obj = {
    bar: function () {
        // 'use strict'
        // var x = () => this
        // return x
        return () => this
    }
}

// this绑定到obj
// 将返回的函数的引用赋值给fn
var fn = obj.bar()
console.log(fn() === obj) // true
// 只引用 不调用
var fn2 = obj.bar
console.log(fn2()() === window) // true
console.log(fn2()() === undefined) // 'use strict' true




var obj = {
    prop: 11,
    fn: function () {
        return this.prop
    }
}

console.log(obj.fn()) // 11

const obj = {
    prop: 11,
    fn: function () {
        return this.prop
    }
}

function fn() {
    return this.prop
}
obj.fn = fn
console.log(obj.fn()) // 11

obj.b = {
    fn: fn,
    prop: 22
}

console.log(obj.b.fn()) // 22


const obj = {
    fn: function () {
        return this.a + this.b
    }
}
const p = Object.create(obj)
p.a = 1
p.b = 2
console.log(p.fn()) // 3



function sum() {
    return this.a + this.b + this.c
}

var obj = {
    a: 1,
    b: 2,
    c: 3,
    get average() {
        return (this.a + this.b + this.c) / 3
    }
}

Object.defineProperty(obj, 'sum', {
    get: sum,
    enumerable: true,
    configurable: true
})

console.log(obj.average, obj.sum) // 2 6


/**
 *构造函数这样工作
 *
 */
// function myconstrucotor() {
// 函数实体写在里面
// 根据需要在this上创建属性，然后赋值给他们，比如
// this.name = 'jsong'

// 如果函数具有返回对象的return语句
// 则该对象是new表达式的结果
// 否则，表达式的结果是当前绑定到this的对象

// }

function fn() {
    this.a = 33
}

const obj = new fn()
console.log(obj.a) // 33

function fn2() {
    this.a = 33
    return {
        a: 22
    }
}
const obj2 = new fn2()
console.log(obj2.a) // 2