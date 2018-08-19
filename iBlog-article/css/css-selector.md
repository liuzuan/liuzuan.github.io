# 写在前面

> css 选择器除了标签名、id、class，其他你使用的多吗？本文主要列举一些可能使用的不多，但是却很好用的 css 选择器。

# X + Y

```css
ul + p {
    color: red;
}
```

这是邻近元素选择器，只会选中紧接在另一个元素后的元素。这上面的示例中，只有每个 ul 后面的第一个段落是红色的。

# X > Y

```css
div#container > ul {
    border: 1px solid black;
}
```

`X Y`和`X > Y`的区别是后者只会选中直接后代。例如，看看下面的代码：

```html
<div id="container">
   <ul>
      <li> List Item
        <ul>
           <li> Child </li>
        </ul>
      </li>
      <li> List Item </li>
      <li> List Item </li>
      <li> List Item </li>
   </ul>
</div>
```

`#container > ul`只会定义`id`为`container`的`div`里的`ul`元素，而不会定义第一个`li`里的`ul`。

# X ~ Y

```css
ul ~ p {
    color: red;
}
```

兄弟元素选择器，不像`X + Y`那样严格，`X ~ Y` 会匹配跟在`ul`后的所有兄弟级`p`元素。

# X[href]

属性选择器，带有`href`属性的元素才会被选中。下面我们以`href`属性为`liuzuann.com`的`a`标签为例列举说明属性选择器的几中用法。

## X[href='url']

```css
a[href="http://www.liuzuann.com"] {
    color: red;
}
```

上面代码是的链接为`http://www.liuzuann.com`的`a`标签的颜色为红色，但用这个选择器有局限性。如果我的路径不是完整路径，而是`liuzuann.com`，这样就不能达到效果了。遇到这种情况请往下看。

## X[href*='url']

```css
a[href*='liuzuann.com'] {
    color: red;
}
```

这样使得`http://www.liuzuann.com`与`liuzuann.com`的`a`标签都展示为红色。

## X[href^="http"]

```css
a[href^='http'] {
    color: red;
}
```

`^`用来匹配前缀。

## X[href$=".com"]

```css
a[href$='com'] {
    color: red;
}
```

`$`用来匹配后缀。

# X:not(selector)

```css
div:not(#container) {
    color: blue;
}
```

# X::pseudoElement

匹配段落的第一行：

```css
p::first-line {
    font-weight: bold;
    font-size: 1.2em;
}
```

匹配段落的第一个字母：

```css
p::first-letter {
    float: left;
    font-size: 2em;
    font-weight: bold;
    font-family: cursive;
    padding-right: 2px;
}
```

# X:nth-child(n)

```css
div p:nth-child(3) {
    color: red;
}
```

`nth-child`伪元素可以选择第几个元素，上面代码选中`div`下的第 3 个且是`p`的子元素，而不是`div`下的第 3 个`p`元素。
当然也可以用`nth-last-child(n)`来选中`倒数`第几个。
第一个和最后一个也可以这样写`div p:first-child` `div p:last-child`。

# X:nth-of-type(n)

```css
div p:nth-of-type(3) {
    color: red;
}
```

上面这段 css 选择`div`下的第三个`p`元素，这与`nth-child`有很大不同。但有时候效果却又相同，具体看下面 demo。

```html
    <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
    </div>
```

上面这段代码使用`div p:nth-child(3)`与`div p:nth-of-type(3)`效果相同。

```html
    <div>
        <h1>1</h1>
        <h1>2</h1>
        <p>1 nth-child(3)使这个变红</p>
        <p>2</p>
        <p>3 nth-of-type(3)使这个变红</p>
    </div>
```

这样看起来就会很明了了。

# X:only-child

```css
div p:only-child {
    color: red;
}
```

上面代码只会匹配是唯一子元素的`<p>`。

# X:only-of-type

```css
div p:only-of-type {
    color: red;
}
```

```html
    <div>
        <h1>1</h1>
        <h1>2</h1>
        <div>1</div>
        <p>3 变红</p>
    </div>
```

`div`下有`p`，并且`p`的数量为 1，则匹配这个`p`。

# X:first-of-type

```css
div h1:first-of-type {
    color: red;
}
```

```html
    <div>
        <h1>1 变红</h1>
        <h1>2</h1>
        <div>1</div>
        <p>3</p>
    </div>
```

`div h1:first-of-type`匹配`div`下第一个`h1`。
