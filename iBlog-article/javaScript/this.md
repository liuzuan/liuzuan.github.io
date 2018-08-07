---
title: this
dir: javaScript
date: 2018-06-09 22:41:17
categories:
- javaScript
tags:
comments:
thumbnail: /blog/image/this.jpg
---

# **<center>JavaScript-this指向</center>**

## **写在前面**

在函数中 this 到底取何值，是在函数真正被调用执行的时候确定下来的，函数定义的时候确定不了。
因为 this 的取值是执行上下文环境的一部分，每次调用函数，都会产生一个新的执行上下文环境。当你在代码中使用了 this，这个 this 的值就直接从执行的上下文中获取了，而不会从作用域链中搜寻。

关于 this 的取值，大体上可以分为以下八种情况：

### **情况一：全局 & 调用普通函数**

在全局环境中，this 永远指向 window。

```js
console.log(this === window);     //true
```

### **情况二：构造函数**

所谓的构造函数就是由一个函数 new 出来的对象，一般构造函数的函数名首字母大写，例如像 Object，Function，Array 这些都属于构造函数。

```js
function Foo(){
    this.x = 10;
    console.log(this);    //Foo {x:10}
}
var foo = new Foo();
console.log(foo.x);      //10
```

上述代码，如果函数作为构造函数使用，那么其中的 this 就代表它即将 new 出来的对象。但如果直接调用，而不是使用new操作符，这时候Foo则为普通函数，视为情况一。

### **情况三：对象方法**

如果函数作为对象的方法时，方法中的 this 指向该对象。

```js
var obj = {
    x: 10,
    foo: function () {
        console.log(this);       //Object
        console.log(this.x);      //10
    }
};
obj.foo();
```

如果 foo 函数不作为对象方法被调用：

```js
var obj = {
    x: 10,
    foo: function () {
        console.log(this);       //Window
        console.log(this.x);     //undefined
    }
};
var fn = obj.foo;
fn();
```

obj.foo 被赋值给一个全局变量，并没有作为 obj 的一个属性被调用，那么此时 this 的值是 window。

### **情况四：构造函数 prototype 属性**

```js
function Foo(){
    this.x = 10;
}
Foo.prototype.getX = function () {
    console.log(this);        //Foo {x: 10,getX: function}
    console.log(this.x);      //10
}
var foo = new Foo();
foo.getX();
```

在 Foo.prototype.getX 函数中，this 指向的 foo 对象。不仅仅如此，即便是在整个原型链中，this 代表的也是当前对象的值。

### **情况五：函数用 call、apply或者 bind 调用。**

```js
var obj = {
    x: 10
}
function foo(){
    console.log(this);     //{x: 10}
    console.log(this.x);   //10
}
foo.call(obj);
foo.apply(obj);
foo.bind(obj)();
```

当一个函数被 call、apply 或者 bind 调用时，this 的值就取传入的对象的值。

### **情况六：DOM event this**

在一个 HTML DOM 事件处理程序里，this 始终指向这个处理程序所绑定的 HTML DOM 节点：

```js
function Listener(){
    document.getElementById('foo').addEventListener('click', this.handleClick);     //这里的 this 指向 Listener 这个对象。不是强调的是这里的 this
}
Listener.prototype.handleClick = function (event) {
    console.log(this);    //<div id="foo"</div
}
var listener = new Listener();
document.getElementById('foo').click();
```

这个很好理解，就相当于是给函数传参，使 handleClick 运行时上下文改变了，相当于下面这样的代码：

```js
var obj = {
    x: 10,
    fn: function() {
        console.log(this);         //Window
        console.log(this.x);       //undefined
    }
};
function foo(fn) {
    fn();
}
foo(obj.fn);
```

你也可以用通过 bind 切换上下文:

```js
function  Listener(){
    document.getElementById('foo').addEventListener('click',this.handleClick.bind(this));
}
Listener.prototype.handleClick = function (event) {
    console.log(this);    //Listener {}
}
var listener = new Listener();
document.getElementById('foo').click();
```

- 前六种情况总结一句话为： this 指向调用该方法的对象。

### **情况七：箭头函数中的 this**

当使用箭头函数的时候，情况就有所不同了：箭头函数内部的 this 是词法作用域，由上下文确定。

```js
var obj = {
    x: 10,
    foo: function() {
        var fn = () = {
            return () = {
                return () = {
                    console.log(this);      //Object {x: 10}
                    console.log(this.x);    //10
                }
            }
        }
        fn()()();
    }
}
obj.foo();
```

现在，箭头函数完全修复了 this 的指向，this 总是指向词法作用域，也就是外层调用者 obj。

如果使用箭头函数，以前的这种 hack 写法：

```js
var _this = this;
```

由于 this 在箭头函数中已经按照词法作用域绑定了，所以，用 call()或者 apply()调用箭头函数时，无法对 this 进行绑定，即传入的第一个参数被忽略。

### **补充说明：**

- this 为保留字，你不能重写 this。

```js
function test(){
    var this = {};     //Uncaught SyntaxError: Unexpected token this
}
```

- 宿主对象：

1. 一门语言在运行的时候，需要一个环境，叫做宿主环境。
2. 对于JavaScript，宿主环境最常见的是 web 浏览器，浏览器提供了一个 JavaScript 运行的环境，这个环境里面，需要提供一些接口，好让 JavaScript 引擎能够和宿主环境对接。
3. JavaScript 引擎才是真正执行 JavaScript 代码的地方，常见的引擎有 V8(目前最快 JavaScript 引擎、Google 生产)、JavaScript core。
4. 在浏览器或者服务端( nodejs )都有自己的 JS 引擎，在浏览器中，全局对象为 window，而在 nodejs 中，全局对象为 global。

## **最后**