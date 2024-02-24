---
title: "Git"
---

## 切换分支

切换分支时, 如果存在未提交的更改, 那么更改需要和目标分支兼容.

发生冲突时, 可以选择**stash**或**commit**.

## stash

```shell
git stash list
git stash push [-m "msg"]
git stash <apply/pop/drop> [n] # 列表中的编号, 0 (default).
```

## [cherry-pick](https://www.git-tower.com/learn/git/faq/cherry-pick)

从其他分支上挑选commit提交到当前分支, 一般用于hotfix.

```shell
git cherry-pick [--no-commit] <commit> # 可选择不提交而只是在工作区进行更改.
```

## pull

在今天拉去代码的时候git给我报了一个错误:

```shell
$ git pull
error: cannot pull with rebase: You have unstaged changes.
error: Please commit or stash them.
```

我的本地库和远程库并没有冲突, 只是有一些未提交的代码, 为什么会这样呢?

原因是`rebase`前要求没有未提交的代码, 所以需要先`stash`才能进行`rebase`.

随后我调整了`git`的全局配置:

```toml
[rebase]
autoStash = true
```

这样`git`就会在`rebase`前自动`stash`工作区, 然后再`rebase`结束后再恢复工作区.

> [rebase.autoStash参考文档](https://git-scm.com/docs/git-config#Documentation/git-config.txt-rebaseautoStash)

## reset

```shell
git reset --soft <commit> # 你还需要之前的代码
git reset --hard <commit> # 你不需要之前的代码
```

场景分析:

* 如果在`push`前检查代码时发现疏漏, 则使用`--soft`.
* 如果账号被盗有人提交了包含广告的代码, 则使用`--hard`.
