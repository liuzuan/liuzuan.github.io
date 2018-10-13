# 写在前面
> 以下操作均在mac下，当然，windows也类似。如题。使用git clone速度之慢，简直绝了。因此，在这里将提出一种较为简单的解决方法，有兴趣花丢丢时间折腾的朋友可以试试。

> 虽说git clone跟网速离不了干系（有些地区较快，有些地区较慢），但总体来说，大部分都在10KiB/s-20KiB/s之间，及其慢。若是需要clone大repo，那速度简直捉急。

# 解决方案

用 git 内置代理，直接走系统中运行的代理工具中转，比如，你的 SS 本地端口是 1080（一般port均为1080），那么可以如下方式走代理：

1. 通过git命令写入

```bash
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080
```

2. 直接修改.gitconfig


```bash
sudo vim .gitconfig：
```
添加如下到.gitconfig：

```bash
[http]
    proxy = socks5://127.0.0.1:1080
[https]
    proxy = socks5://127.0.0.1:1080
```
此外，git clone或者git push特别慢，并不是因为 `http://github.com` 的这个域名被限制了。而是 `http://github.global.ssl.fastly.Net` 这个域名被限制了。那么可以在hosts文件里进行绑定映射。步骤如下：

1. 用vim打开host

```bash
sudo vim /etc/host
```
2. 添加如下

```bash
151.101.72.249 http://global-ssl.fastly.Net
192.30.253.112 http://github.com
```

至此，设置就完成了，下面就可以愉快的`git clone`了！亲测10k/s 变成 647k/s了！很帅有木有~~
![](http://cdn.liuzuann.com/1651f57bcde_git_clone.png-thin)
