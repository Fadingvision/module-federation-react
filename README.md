## 跨项目的组件共享/复用

平常大家在日常的开发中，会积累丰富的业务组件，无论是自己造轮子也好或者基于优秀的组件库二次封装也好。组件越来越多，管理与共享这些业务组件就可能会成为负担。

### 一些方式

### 简单的npm包

- 开发/维护组件成本高，需要创建代码仓库以及npm包，需要手动更新应用
- 使用不方便，需引整个组件库，每个组件的版本不能独立，无在线预览编辑

### Bit

![image](https://picb.zhimg.com/80/v2-34be07a0c40dfc275dc49ec1e83d0777_1440w.jpg)

#### feature

- 公共组件、代码片段便捷发布，导入
- 版本控制
- 快速索引及选用（实时编译、实时预览）
- 文档生成
- 结合配置CI自动完成NPM发布
- 标准化开发规范

和npm对比？

Bit基于代码分析使代码打包自动化。
Bit可以在不离开项目上下文得情况下，访问到程序包 （bit import）。
对于生产者来说，不需要把组件单独复制出来，就可以直接上传
对于消费者来说，想要修改组件也不需要clone组件库，而是在项目里就可以直接修改
Bit可以在任何项目中使用组件代码，然后直接在其中进行更改。

```nginx
# create and export
npm install bit-bin -g
bin init
bin login

bit add src/components/*
bit status/list
bit import bit.envs/compilers/react --compiler
bit tag --all 1.0.0
bit export ulyssess.components

# import and modify
bit import / npm install
bit tag 1.1.0
bit checkout version
bit export ulyssess.components
```

### Module-federation 模块联合

Module Federation 使 JavaScript 应用得以从另一个 JavaScript 应用中动态地加载代码，同时共享依赖。

一些相关的概念：

- Remote，被 Host 消费的 Webpack 构建；
- Host，消费其他 Remote 的 Webpack 构建；

一个应用可以是 Host，也可以是 Remote，也可以同时是 Host 和 Remote。

参数：
- library，必须，其中这里的 name 为作为 umd 的 name；
- remotes，可选，表示作为 Host 时，去消费哪些 Remote；
- exposes，可选，表示作为 Remote 时，export 哪些属性被消费；
- shared，可选，共享的库

应用场景：

- 跨应用模块共享
- 微前端
- 编译提速