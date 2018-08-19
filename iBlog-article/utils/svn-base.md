# 一、add

1.1 添加单个文件到版本控制中

```
 svn add index.html
```

1.3 添加 js 文件夹以及该文件夹下所有文件到版本控制中

```
svn add js
```

1.4 只添加 js 文件夹,但不添加该文件夹下文件到版本控制中

```
svn add js --non-recursive
```

1.2 添加工作区中所有非版本控制文件到版本控制中

```
 svn add *
```

1.5 添加工作区所有非版本控制文件到版本控制中（指已在版本控制的文件夹下的非版本控制文件）

```
svn add * --force
```

# 二、commit

2.1 向版本库提交单个文件

```
svn ci -m '' index.html
```

2.2 向版本库提交当前目录下所有改动文件

```
svn ci -m '' *
```

# 三、update

3.1 更新当前目录所有文件到版本库最新版本

```
svn up
// 默认情况下，每个文件只会从服务端更新一次最新版本
// 假如index.html已经更新到最新版本3
```

3.2 更新工作区单个文件到某指定版本号

```
svn up -r 2 index.html
// 当前最新版本号仍为3
```

3.3 强制更新所有文件到最新版本

```
// 当前当前最新版本仍为3，svn up已经无法将index.html更新到版本3，那么可以使用下面命令进行强制更新
svn up *
```

# 四、delete

4.1 删除版本控制中的单个文件

```
svn del/rm index.html
svn ci -m ''
// 删完要向远程版本库提交操作，del与rm等同效果
```

# 五、diff

5.1 比较当前工作区某文件与版本库之间的差异

```
svn di index.html
// - 版本号中的代码（version 3）
// + 当前工作区也就是较版本库修改后的代码（working copy）
```

5.2 比较当前工作区与某指定版本之间的差异

```
svn di -r 2 index.html
```

# 六、mkdir

6.1 创建一个 css 文件夹并且添加到版本控制中

```
svn mkdir css
```

# 七、revert

7.1 将工作区某一个修改的文件恢复到版本库原样

```
svn revert index.html
```

7.2 将工作区所有修改的文件恢复到版本库原样

```
svn revert *
// 默认不会递归扫描子目录下文件
```

```
svn revert --recursive *
// 强制递归扫描所有文件（主要指子目录下）
```
