<br>

<h1 align="center">Welcome to snow-todolist 接口文档 👋</h1>

<br>

> 前后端全栈项目 By [吉米](https://github.com/Jimmylxue)

接口会持续维护，可根据接口文档进行二次开发

在线体验：[https://tdl.jimmyxuexue.top](https://tdl.jimmyxuexue.top)

介绍文档：[https://github.com/Jimmylxue/snow-todolist/blob/master/README.md](https://github.com/Jimmylxue/snow-todolist/blob/master/README.md)

baseUrl：https://api.jimmyxuexue.top

完整请求 path: https://api.jimmyxuexue.top/user/register

---

## 注册用户

> BASIC

**Path:** /user/register

**Method:** POST

**Request Body:**

| name     | type   | desc               |
| -------- | ------ | ------------------ |
| username | string | 用户名             |
| phone    | string | 手机号             |
| password | string | 密码               |
| avatar   | string | 头像地址（可不传） |
| sex      | 0 或 1 | 性别（可不传）     |

**Request Demo:**

```json
{
  "username": "testUser",
  "phone": "13355556666",
  "password": "MTIzNDU2c25vdy10b2RvTGlzdA=="
}
```

原密码是 123456，注册时需要做一层简单的编码。逻辑如下：

```ts
const originPassword = '123456';
const newPassword = btoa(originPassword + 'snow-todoList'); // MTIzNDU2c25vdy10b2RvTGlzdA==
```

---

## 登录接口

> BASIC

**Path:** /user/login

**Method:** POST

**Request Body:**

| name     | type   | desc   |
| -------- | ------ | ------ |
| phone    | string | 手机号 |
| password | string | 密码   |

**Request Demo:**

```json
{
  "phone": 13355556666,
  "password": "$2a$10$YtclWAftd1X/pHtTUUzaHuZnjCVBGQcHOwLSVyDRVAnvlyMuKlqA2"
}
```

原密码 123456，登录时需通过 bcrypt 做一层加盐加密。逻辑如下：

```ts
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function encrypt(rawStr: string) {
  const res = await bcrypt.hash(rawStr, SALT_ROUNDS);
  return res;
}

const originPassword = '123456';
const newPassword = await encrypt(originPassword); // $2a$10$YtclWAftd1X/pHtTUUzaHuZnjCVBGQcHOwLSVyDRVAnvlyMuKlqA2
```

这个加密算法每次生成的 password 都是不同的。只需要这样加密，登录接口就能正确解密。

---

## 任务类型模块

需要携带 token，否则 401。

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwicGFzc3dvcmQiOiJNVEl6TkRVMmMyNXZkeTEwYjJSdlRHbHpkQT09IiwidXNlcklkIjozMiwiaWF0IjoxNjg1NTg4MTMwLCJleHAiOjE2ODU1OTg5MzB9.AdpIFK0THzc7wLPRdgp_HNvM2otPkSkl9hmc3VjkV5g
```

### 用户任务类型列表

> BASIC

**Path:** /taskType/list

**Method:** POST

**Request Body:**

用户任务类型不会很多，不需要传参。

### 类型详情

**Path:** /taskType/detail

**Request Body:**

| name   | type   | desc        |
| ------ | ------ | ----------- |
| typeId | number | 任务类型 id |

**Request Demo:**

```json
{
  "typeId": 1038
}
```

### 添加类型

**Path:** /taskType/add

**Request Body:**

| name       | type   | desc                   |
| ---------- | ------ | ---------------------- |
| typeName   | string | 类型名称               |
| desc       | number | 类型描述               |
| themeColor | string | 类型主题颜色（可不传） |

**Request Demo:**

```json
{
  "typeName": "工作",
  "desc": "用户记录所有工作类型的任务"
}
```

### 类型更新

**Path:** /taskType/update

**Request Body:**

| name       | type   | desc                   |
| ---------- | ------ | ---------------------- |
| typeId     | number | 类型 Id                |
| typeName   | string | 类型名称               |
| desc       | number | 类型描述               |
| themeColor | string | 类型主题颜色（可不传） |

**Request Demo:**

```json
{
  "typeId": 1038,
  "typeName": "工作",
  "desc": "用户记录所有工作类型的任务"
}
```

### 删除类型

**Path:** /taskType/del

**Request Body:**

| name   | type   | desc    |
| ------ | ------ | ------- |
| typeId | number | 类型 Id |

**Request Demo:**

```json
{
  "typeId": 1039
}
```

## 任务模块

需要携带 token，否则 401。

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwicGFzc3dvcmQiOiJNVEl6TkRVMmMyNXZkeTEwYjJSdlRHbHpkQT09IiwidXNlcklkIjozMiwiaWF0IjoxNjg1NTg4MTMwLCJleHAiOjE2ODU1OTg5MzB9.AdpIFK0THzc7wLPRdgp_HNvM2otPkSkl9hmc3VjkV5g
```

### 用户任务列表

> BASIC

**Path:** /task/list

**Method:** POST

**Request Body:**

| name      | type              | desc                       |
| --------- | ----------------- | -------------------------- |
| typeId    | number （可不填） | 任务类型 id                |
| status    | 0 或 1 (可不填)   | 任务状态 0 未完成 1 已完成 |
| startTime | number            | 开始时间                   |
| endTime   | number            | 结束时间                   |
| page      | number            | 查询页数                   |
| pageSize  | number            | 一页查询数量               |

**Request Demo:**

```json
{
  "status": 0,
  "startTime": 1684944000000,
  "endTime": 1685635199999,
  "typeId": 1038,
  "page": 1,
  "pageSize": 10
}
```

### 搜索用户任务

按照任务名称模糊匹配最多十条任务

> BASIC

**Path:** /task/search

**Method:** POST

**Request Body:**

| name     | type   | desc     |
| -------- | ------ | -------- |
| taskName | string | 任务名称 |

**Request Demo:**

```json
{
  "taskName": "打扫"
}
```

### 任务详情

**Path:** /task/detail

**Request Body:**

| name   | type   | desc    |
| ------ | ------ | ------- |
| taskId | number | 任务 Id |

**Request Demo:**

```json
{
  "taskId": 1038
}
```

### 添加任务

**Path:** /task/add

**Request Body:**

| name        | type   | desc                       |
| ----------- | ------ | -------------------------- |
| typeId      | number | 任务类型 Id                |
| taskName    | string | 任务名称                   |
| taskContent | number | 任务描述                   |
| expectTime  | string | 任务预期完成时间（可不传） |

**Request Demo:**

```json
{
  "typeId": 1038,
  "taskName": "做一下家务",
  "taskContent": "打扫一下房间，和阳台"
}
```

### 任务状态更新

**Path:** /task/updateStatus

**Request Body:**

| name   | type   | desc                       |
| ------ | ------ | -------------------------- |
| taskId | number | 类型 Id                    |
| status | 0 或 1 | 任务状态 0 未完成 1 已完成 |

**Request Demo:**

```json
{
  "taskId": 1038,
  "status": 1
}
```

### 任务内容更新

**Path:** /task/update

**Request Body:**

| name        | type   | desc                       |
| ----------- | ------ | -------------------------- |
| taskId      | number | 任务 Id                    |
| typeId      | number | 类型 Id                    |
| taskName    | string | 任务名称                   |
| taskContent | number | 任务描述                   |
| expectTime  | string | 任务预期完成时间（可不传） |

**Request Demo:**

```json
{
  "taskName": "做一下家务哈哈",
  "taskContent": "打扫一下房间，和阳台",
  "typeId": 1038,
  "taskId": 1066
}
```

### 删除类型

**Path:** /task/del

**Request Body:**

| name   | type   | desc    |
| ------ | ------ | ------- |
| taskId | number | 任务 Id |

**Request Demo:**

```json
{
  "taskId": 1066
}
```
