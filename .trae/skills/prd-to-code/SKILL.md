---
name: prd-to-code
description: 根据前端 PRD 直接生成可用的 React 页面/组件与请求层代码。用户提供 PRD（页面、交互、接口）并要求“生成前端代码/写页面/实现功能”时调用。
version: 1.0.1
author: jimmy
tags:
  [
    'prd',
    'frontend',
    'react',
    'typescript',
    'tailwind',
    'antd',
    'react-query',
    'mobx',
  ]
metadata:
  trae:
    category: '代码生成'
    contexts: ['前端PRD', '页面实现', 'UI', '组件', 'React Query']
---

# PRD → Code（前端）(prd-to-code)

将「前端 PRD（Markdown）」转成**可直接运行的前端代码改动**（页面、组件、请求 hooks、状态管理与路由接入），并严格遵守当前仓库技术栈与代码风格。

## 何时调用

当用户提供 PRD/需求说明，并明确要你：

- “根据 PRD 写页面/实现功能”
- “生成前端代码/把 PRD 落到代码里”
- “补齐 UI + 接口调用 + 状态流转”
- 或显式 @prd-to-code

## 强约束（必须遵守）

1. **禁止引入新依赖**

   - 只能使用本项目已有依赖与现有组件/工具函数。

2. **UI 要精美且一致**

   - 使用 **Ant Design (v4)** + TailwindCSS 作为主要 UI 组件来源。
   - 图标使用 `@ant-design/icons`。
   - 交互反馈使用 `antd` 的 `message` 组件。

3. **请求与数据获取规范**

   - 必须通过 `src/api/index.ts` 的 `get/post` 发请求。
   - React Query 使用 `react-query` (v3) 的 `useQuery/useMutation`。
   - **注意**：响应拦截器**未完全解包**，返回结构包含 `code/message/result`。需在组件或 Hook 中处理 `code` 判断（虽拦截器有全局错误提示，但业务逻辑仍需关注数据解包）。

4. **尽量改现有文件，除非确有必要**

   - 优先复用现有页面、组件、API hooks、类型定义、store。
   - 只有当无法复用时才新增文件，并保持文件数量最少。

5. **默认不运行 lint/build**
   - 仅按 PRD 生成/修改代码即可；除非用户明确要求验证通过。

## 输入（你需要从 PRD 中提取）

PRD 至少应包含（不完整时你要做合理补全，但不要发散）：

- 页面/入口：路由路径、页面名称、入口位置（Dashboard/独立页/弹窗等）
- 核心流程：用户操作、状态变化、错误与空态
- 数据结构：列表/详情/分页字段（如果未知，用 `Record<string, unknown>` 承接）
- 接口契约：路径、方法、参数、返回字段（或提供 Swagger/OpenAPI URL）
- 交互细节：加载态、禁用态、二次确认、成功/失败 toast 文案

## 输出（你要交付的代码）

按 PRD 需要交付以下之一或组合：

- `src/pages/**` 页面实现（含路由接入）
- `src/components/**` 业务组件（弹窗/表单/列表卡片/预览等）
- `src/api/**` 接口定义与 Hooks（`useQuery/useMutation` 封装）
- `src/api/**/type.ts` 业务类型（尽量集中在这里复用）
- `src/store/**`（仅当需要全局状态且现有 MobX store 不满足时，创建新的 MobX store）

## 实施流程（生成代码时按此执行）

1. **读 PRD 并拆解**

   - 输出你识别到的：页面/组件树、路由、数据流、接口列表、关键状态（loading/empty/error）。

2. **对齐仓库现状**

   - 先在仓库中搜索类似页面/组件，复用现有模式（例如 Antd Modal/Form、`src/components` 下的通用组件）。

3. **生成请求层**

   - 在 `src/api/` 下创建或修改对应模块。
   - 必须封装为 Custom Hooks（如 `useUserTask`），内部调用 `useQuery/useMutation`。
   - 类型定义在同级 `type.ts` 中。

4. **生成 UI（精美且可用）**

   - 使用 Ant Design 组件构建布局和交互。
   - 结合 TailwindCSS 处理间距、颜色等样式细节。
   - 必须覆盖：加载态（Spin/Skeleton）、空态（Empty）、错误态。
   - 交互反馈使用 `message.success/error`。

5. **接入路由与状态**
   - 需要新路由时：按项目 `react-router-dom` v6 方式接入。
   - 需要跨页面状态时：使用 `mobx` + `mobx-react-lite`。

## 代码风格约定（本 skill 的生成策略）

- 组件优先函数式组件 + TypeScript 类型。
- 接口 Hooks 命名：`use***`。
- 类型命名：请求参数 `T***Params`，返回 `T***Result` 或直接定义结构。
- 接口文件放在 `src/api/` 对应模块下。
- 不要写与业务无关的示例/演示代码。

## 示例触发语句

- “根据这个 PRD 帮我把前端页面写出来”
- “生成前端代码：包含 UI + useQuery 请求 + 交互”
- “@prd-to-code 这是需求文档……”
