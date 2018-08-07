# 写在前面

> css 选择器很多，你都牢记于心了吗？总有那么明明两个很好用，但你很少用过。

## 1. X + Y

```css
ul + p {
    color: red;
}
```

这是邻近元素选择器，只会选中紧接在另一个元素后的元素。这上面的示例中，只有每个 ul 后面的第一个段落是红色的。

## 2. X > Y

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
