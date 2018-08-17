# 前言

> Git 是一个“分布式版本管理工具”，简单的理解版本管理工具：大家在写东西的时候都用过“回撤”这个功能，但是回撤只能回撤几步，假如想要找回我三天之前的修改，光用“回撤”是找不回来的。而“版本管理工具”能记录每次的修改，只要提交到版本仓库，你就可以找到之前任何时刻的状态（文本状态）。

下面记录了一些 git 命令，常用和不常用的都有。

# 帮助

```bash
git help -g
```

# chone 整个项目

```bash
git clone <url> <dir>
```

# clone 下来指定的单一分支

```bash
git clone -b <branch-name> --single-branch <url>
```

# 放弃本地修改，回到远程仓库的状态

```bash
git fetch --all && git reset --hard origin/master
```

# 重设第一个 commit

```bash
git update-ref -d HEAD
```

# 版本差异比较

1. 比较工作区和暂存区的差异

```bash
git diff
```

2. 比较任意两个版本的差异

```bash
git diff <commit-id> <commit-id>
```

3. 比较暂存区和本地最近版本（commit）的差异

```bash
git diff --cached
```

4. 比较暂存区、工作区和本地最近版本（commit）的差异

```bash
git diff HEAD
```

5. 切换分支

```bash
git checkout ...
```

6. 删除已经合并到 master 的分支

```bash
git branch --merged master | grep -v '^\*\|  master' | xargs -n 1 git branch -d
```

7. 展示本地分支关联远程仓库的情况

```bash
git branch -vv
```

8. 关联远程分支

关联之后，git branch -vv 就可以展示关联的远程分支名了，同时推送到远程仓库直接：git push，不需要指定远程仓库了。

```bash
git branch -u origin/branch-name
```

或者在 push 时加上-u 参数

```bash
git push origin/branch-name -u
```

# 列出所有远程分支

-r 参数相当于 remote

```bash
git branch -r
```

# 列出本地和远程分支

```bash
git branch -a
```

# 创建并切换到本地分支

```bash
git checkout -b branch-name
```

# 创建并切换到远程分支

```bash
git checkout -b branch-name origin/branch-name
```

# 删除本地分支

```bash
git branch -d branch-name
```

# 删除远程分支

```bash
git push origin : branch-name
```

# 重命名本地分支

```bash
gir branch -m branch-name
```

# 放弃本地已修改文件

放弃某个文件的修改

```bash
git checkout file-name
```

放弃所有修改

```bash
git checkout .
```

# 恢复删除的文件

```bash
git rev-list -n 1 HEAD -- <file_path> #得到 deleting_commit

git checkout <deleting_commit>^ -- <file_path> #回到删除文件 deleting_commit 之前的状态
```

# 回退到某个 commit 的状态，并重新添加一个 commit

```bash
git revert <commit-id>
```

# 回退到某个 commit 的状态，并删除后面的 commit

> 和 revert 的区别：reset 命令会抹去某个 commit id 之后的所有 commit

```bash
git reset <commit-id>  #默认就是-mixed参数。

git reset –mixed HEAD^  #回退至上个版本，它将重置HEAD到另外一个commit,并且重置暂存区以便和HEAD相匹配，但是也到此为止。工作区不会被更改。

git reset –soft HEAD~3  #回退至三个版本之前，只回退了commit的信息，暂存区和工作区与回退之前保持一致。如果还要提交，直接commit即可

git reset –hard <commit-id>  #彻底回退到指定commit-id的状态，暂存区和工作区也会变为指定commit-id版本的内容
```

# 取消某个文件的暂存

```bash
git reset <file-name>
```

# 修改上一个 commit 的描述

```bash
git commit -amend
```

# 查看 commit 历史

```bash
git log
```

# 展示简化的 commit 历史

```bash
git log --pretty=oneline --graph --decorate --all
```

# 查看某段代码的作者

blame 的意思为“责备，责任”，😆 代码出问题了看看是谁干的好事。

```bash
git blame <file-name>
```

# 查看本地执行过的 git 命令

和 shell 的 history 一样

```bash
git reflog
```

# 修改作者名

```bash
git commit --amend --author='liuzuan <hi@liuzuann.com>'
```

# 修改远程仓库的 url

```bash
git remote set-url origin <url>
```

# 增加远程仓库

```bash
git remote add origin <url>
```

# 查看所有远程仓库

```bash
git remote
```

# 查看两个星期内的改动

```bash
git whatchanged --since='2 weeks ago'
```

# 给 git 命令起别名

```bash
git config --global alias.<shot> <old-command>

比如：git status 改成 git st，这样可以简化命令

git config --global alias.st status
```

# 存储当前的修改，但不用提交 commit

```bash
git stash
```

# 保存当前状态，包括 untracked 的文件

```bash
git stash -u
```

# 查看所有的 stashes

```bash
git stash list
```

# 删除所有的 stash

```bash
git stash clear
```

# 展示所有忽略的文件

```bash
git ls-files --others -i --exclude-standard
```

# 清除 gitignore 文件中记录的文件

```bash
git clean -X -f
```

# 展示所有 alias 和 configs

注意： config 分为：当前目录（local）和全局（golbal）的 config，默认为当前目录的 config

```bash
git config --local --list (当前目录)
git config --global --list (全局)
```

# 展示忽略的文件

```bash
git stash --ignored
```

# 删除全局设置

```bash
git config --global --unset <entry-name>
```
