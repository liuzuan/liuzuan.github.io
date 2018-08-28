# 写在前面

笔者在开发个人博客系统的时候频繁的进行如下操作：

```bash
ssh liuzuann
j ib
git pull
```

> 说明： `j` 是命令行插件 `autojump`的缩写，可以快速切换目录，有兴趣的小伙伴可以看看。

每每有改动，本地提交到 git 仓库后都要到服务器上更新一下项目目录的代码，如果 pm2 没有开启`--watch`的话，甚至还要`pm2 restart 0`，很是繁琐，这篇正是解决此类繁琐问题的一个办法。我们往下看吧！

# 原理说明

`github`有个 webhook 设置，为我们提供了监听 git 操作的事件钩子，当我们`push`代码的时候会调用这个钩子向服务器发送请求，我们的服务器接收到这个请求便可以自己执行`git pull`了。所以我们只需要提交代码，其他事情 github 和我们设定的服务器脚本会自动帮我们搞定，下面我们看看具体设置吧。

# webhook 设置

![webhook-screenshot](http://cdn.liuzuann.com/images/article/1655686f2c6__webhook.png-thin)

# 自动化部署脚本

```bash
/*auto_pull.sh */

WEB_PATH='/home/wwwroot/iBlog'
WEB_USER='root'
WEB_USERGROUP='root'

cd $WEB_PATH
echo "auto pull from git"
git pull
echo "Finished."
```

# 服务器 node.js 服务

先安装所需依赖

```bash
npm install -S github-webhook-handler
```

剩下的代码在`github-webhook-handler`的`README.md`中已经给的很详尽了，只需要加上我们上面写的脚本就可以了。

```js
/*auto_pull.js */
var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/webhook', secret: 'myhashsecret' });
// path、secret 与我们在github webhook上设置的保持一致即可。
function runcommand(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = '';

    child.stdout.on('data', function(buffer) {
        resp += buffer.toString();
    });
    child.stdout.on('end', function() {
        callback(resp);
    });
}

http.createServer(function(req, res) {
    handler(req, res, function(err) {
        res.statusCode = 404;
        res.end('no such location');
    });
}).listen(7878);
// 这里的端口nginx设置反向代理时候用到，或者webhook直接设置公网+端口号，省去nginx反向代理也行。

handler.on('error', function(err) {
    console.error('Error:', err.message);
});

handler.on('push', function(event) {
    console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
    runcommand('sh', ['./auto_pull.sh'], function(text) {
        console.log(text);
    });
});

// issues 笔者没有用到就注释掉了，哈哈~
// handler.on('issues', function (event) {
//   console.log('Received an issue event for %s action=%s: #%d %s',
//     event.payload.repository.name,
//     event.payload.action,
//     event.payload.issue.number,
//     event.payload.issue.title)
// })
```

> nginx反向代理这里就不再赘述了，还不会的小伙伴请自行google。

至此，自动化脚本和服务端接口就写完了，下面上传代码到仓库，不过这时候还是需要用人力到服务器上更一下代码的。更新后用 pm2 运行 js 文件，持久化守护 node 进程。

```bash
pm2 start auto_pull.js --watch
```

后面的提交我们就不用消耗人力到服务器更新代码了，瞬间高大上有木有~~😆
