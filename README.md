<br>

<h1 align="center">Welcome to TODD - 极简的TodoList工具 👋</h1>

<br>

> 前后端全栈项目 By [吉米](https://github.com/Jimmylxue)

在线体验：[https://tdl.jimmyxuexue.top](https://tdl.jimmyxuexue.top)

接口文档：[https://github.com/Jimmylxue/snow-todolist/blob/master/packages/server/README.md](https://github.com/Jimmylxue/snow-todolist/blob/master/packages/server/README.md)

> 可根据接口文档进行二次开发

目前已有：

[浏览器插件端](https://chrome.google.com/webstore/detail/dodd/kgneifofomjghckaeelmgmmpaiaodpmi?hl=zh-CN) - 作者：[妙才 Dev](https://github.com/Developer27149) - [仓库](https://github.com/Developer27149/chrome-extension-todolist)

其他端敬请期待....

![图片效果](https://github.com/Jimmylxue/Jimmylxue/blob/master/assets/todolist/base.png?raw=true)

![图片效果2](https://github.com/Jimmylxue/Jimmylxue/blob/master/assets/todolist/base2.png?raw=true)

不知不觉记录 todolist 已半年之久了，确实是个非常不错的学习方式，时刻提醒自己还有未完成的任务。

此项目是在 b 站直播时一点一点写的，也第一次尝试直播写代码，上线个简单 todolist ，目前已有 11 个小伙伴注册使用了 😊。

## 快速上手

打开网站：[https://tdl.jimmyxuexue.top](https://tdl.jimmyxuexue.top)

注册一个账号，并创建一个 task。（我已默认为你生成一个生活的 task 类型）

> 现在注册需使用手机号，经费有限，随便填一个 11 位数的手机号就好啦~😋

**项目如何运行？**

接口文档：[https://github.com/Jimmylxue/snow-todolist/blob/master/packages/server/README.md](https://github.com/Jimmylxue/snow-todolist/blob/master/packages/server/README.md)

执行以下步骤即可：

- 拉去项目
- 执行 `pnpm install`
  > 未安装 pnpm 的小伙伴需先行安装 pnpm
- 执行 `pnpm web:dev` 本地环境启动前端项目
- 执行 `pnpm server:dev` 本地环境启动后端服务

## 项目特点

采用 monorepo 架构全栈项目。麻雀虽小，五脏俱全。

是一个完整体系且能上线的小项目，非常适合于还未毕业的同学作为毕业设计的参考学习项目。且项目中许多实现思路均是我在企业开发中学到的点。还是比较适合学习的。

## 技术栈

### 前端

主要技术：

- react
- vite
- Ant Design 组件库
- mobx 状态管理
- Prettier 美化代码
- Jest 单元测试

依赖库：

- react-query 管理请求
- dayjs&moment 时间处理
- lodash 工具库

### 后端

主要技术：

- Node.js
- Nest.js
- Mysql
- TypeORM

依赖服务：

- planetScale 免费云数据库

## 目录结构

采用 monorepo 架构，前端代码位于 packages/web 后端代码位于 packages/server

## 其他内容

不定期在 B 站直播写代码，欢迎有兴趣的小伙伴们前来围观，期待你们的关注~

[B 站个人主页](https://space.bilibili.com/304985153?spm_id_from=333.1007.0.0)

我有个前端交流群，平时大家一起讨论技术和交流 bug，有兴趣的小伙伴欢迎加入。（vx 添加：ysh15120）

## 敬请期待

有时间会直播时不断完善（或者有小伙伴反馈问题时处理一下）

期待小伙伴们的 star 和 PR🤞🤞🤞
