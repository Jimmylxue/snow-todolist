---
name: api-codegen-skill-old
description: 根据 Swagger/OpenAPI 定义生成 TypeScript 类型 + React Query (v3) 代码
version: 1.0.1
author: jimmy
tags: ['api', 'typescript', 'react-query', 'codegen', 'axios']
metadata:
  trae:
    category: '代码生成'
    contexts: ['api接口', 'swagger', '接口文档']
---

# API 代码生成技能 (api-codegen-skill-old)

## 技能描述

当你提供 Swagger/OpenAPI 的接口定义（JSON 格式）时，本技能自动生成符合项目规范的：

- TypeScript 接口定义（请求参数、响应类型）
- React Query Hooks（`useQuery`/`useMutation`）
- API 调用路径常量

## 激活条件

当用户消息中包含以下关键词时自动激活：

- "生成 API 代码"
- "根据 Swagger"
- "帮我写接口"
- 或者用户明确 @api-codegen-skill-old

## 核心规则与约束（基于当前项目）

1.  **请求库集成**：

    - 必须使用 `src/api/index.ts` 导出的 `get` 和 `post` 函数。
    - **响应结构**：后端返回的标准结构通常为 `{ code: number, message: string, result: T }`。
    - **注意**：项目的响应拦截器**未完全解包**，`useQuery` / `useMutation` 获取到的数据是包含 `code` 的完整对象，需在组件或 Hook 中处理业务逻辑。

2.  **React Query 规范**：

    - 使用 **`react-query` (v3)**。
    - 导入路径：`import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';`
    - Query Key 必须是唯一的数组，例如 `['users', 'list', params]`。

3.  **类型命名规范**：

    - 请求参数接口：`T` + 模块名 + `Params` (如 `TUserListParams`)。
    - 响应数据接口：`T` + 模块名 + `Result` (如 `TUserListResult`)。
    - 类型定义通常放在同级目录的 `type.ts` 文件中。

4.  **文件路径规范**：
    - API 模块文件：`src/api/{模块名}/{子模块}/index.ts`
    - 类型文件：`src/api/{模块名}/{子模块}/type.ts`

## 工作流程

### 步骤 1：解析输入

1.  识别用户提供的 Swagger JSON 内容：
    - **直接粘贴**：直接解析 JSON 文本。
    - **文件路径**：使用 `Read` 工具读取文件内容。
    - **URL 地址**：
      - **优先策略**：如果 URL 是 Swagger UI 页面（非 .json 结尾），优先尝试获取 `URL + "/swagger-ui-init.js"`。这是 Swagger UI 的常见配置入口，通常包含完整的 API 定义 JSON。
      - **备选策略**：如果失败，再尝试获取原 URL，或者常见的 API 文档路径（如 `/v2/api-docs`, `/openapi.json`）。
      - 使用 `RunCommand` (curl) 获取内容。
2.  解析出接口列表：路径（path）、方法（method）、参数（parameters）、响应（responses）。
3.  如果没有提供完整 Swagger，则询问用户补全。

### 步骤 2：生成 TypeScript 类型定义

根据 JSON Schema 生成对应的 TypeScript 类型。
**重要**：如果字段包含 `description` 属性，请务必在字段后添加注释。

```typescript
// src/api/user/list/type.ts 示例
export interface TUserListParams {
  page: number; // 当前页码
  pageSize: number; // 每页条数
  keyword?: string; // 搜索关键字
}

export interface TUserListResult {
  list: TUser[];
  total: number; // 总记录数
}

export interface TUser {
  id: string; // 用户ID
  name: string; // 用户名称
}
```

### 步骤 3：生成 React Query Hooks

根据 **URL 路径中的关键词** 决定 Hook 类型：

**场景 A：资源获取（useQuery）**

```typescript
// src/api/user/list/index.ts 示例
import { useQuery, UseQueryOptions } from 'react-query';
import { post } from '@/api'; // 使用项目封装的请求方法
import { TUserListParams, TUserListResult } from './type';

// 定义通用响应结构 (参考 src/api/index.ts)
interface ResultData<T = any> {
  code: number;
  message: string;
  result?: T;
}

export const useGetUserList = (
  params: TUserListParams,
  options?: UseQueryOptions<ResultData<TUserListResult>, Error>,
) => {
  return useQuery<ResultData<TUserListResult>, Error>(
    ['user', 'list', params], // Query Key
    () => post('/user/list', params), // Fetcher
    options,
  );
};
```

**场景 B：动作执行（useMutation）**

```typescript
// src/api/user/create/index.ts 示例
import { useMutation, UseMutationOptions } from 'react-query';
import { post } from '@/api';
import { TCreateUserParams, TCreateUserResult } from './type';

interface ResultData<T = any> {
  code: number;
  message: string;
  result?: T;
}

export const useCreateUser = (
  options?: UseMutationOptions<
    ResultData<TCreateUserResult>,
    Error,
    TCreateUserParams
  >,
) => {
  return useMutation<ResultData<TCreateUserResult>, Error, TCreateUserParams>(
    (data) => post('/user/create', data),
    options,
  );
};
```

### 步骤 4：询问与保存

1.  生成代码后，向用户展示预览。
2.  询问用户希望将代码保存到哪个目录（例如 `src/api/user`）。
3.  确认后使用 `write` 工具保存文件。

## 交互示例

**用户**：帮我生成获取用户列表的接口，Swagger 定义如下...

**AI**：
好的，基于 Swagger 定义，我为你生成了以下代码：

1.  **Types** (`src/api/user/type.ts`): 定义了 `TUserListParams` 和 `TUserListResult`。
2.  **Hooks** (`src/api/user/index.ts`): 生成了 `useGetUserList`，使用了 `react-query` v3 和 `@/api`。

请确认是否保存？
