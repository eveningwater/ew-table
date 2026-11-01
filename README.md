# ew-table

中文文档 | [English](./README.en.md) | [llms.txt](./llms.txt)

基于 **Vue 3 + Element Plus** 的配置化表格组件。通过一份 `column` 配置即可完成列定义、单元格自定义渲染、作用域插槽、表头插槽、多级表头，并自动继承 `el-table` 的全部能力与实例方法。

- 配置驱动：列定义集中在 `column` 数组中，模板更简洁
- 三种单元格渲染方式：默认 `prop` 展示、`render` 函数、作用域插槽
- 支持表头插槽与任意层级的多级表头
- 自动透传 `el-table` 属性，无需二次封装
- 挂载后自动注入 `el-table` 主要方法，可通过 `ref` 直接调用
- 完整 TypeScript 类型定义，单元测试覆盖率 100%

## 安装

```bash
pnpm add ew-table
# 或
npm install ew-table
# 或
yarn add ew-table
```

`vue` 与 `element-plus` 作为 peerDependencies 不会被打进产物，需要宿主项目自行安装：

```bash
pnpm add vue element-plus
```

要求：

| 依赖 | 版本 |
| --- | --- |
| vue | ^3.3.0 |
| element-plus | ^2.4.0 |

## 快速开始

先全局注册 Element Plus（组件内部依赖 `el-table` / `el-table-column`）：

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
```

然后在业务组件中使用：

```vue
<script setup lang="ts">
import EwTable from 'ew-table'
import type { ElTableColumnProps } from 'ew-table'

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'role', label: '角色' },
  { prop: 'age', label: '年龄', width: 90 },
]

const data = [
  { id: 1, name: '张三', role: '店长', age: 32 },
  { id: 2, name: '李四', role: '收银员', age: 26 },
]
</script>

<template>
  <EwTable :data="data" :column="columns" :border="true" :stripe="true" />
</template>
```

## 组件属性

### EwTable Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `TableRow[]` | `[]` | 表格数据 |
| `column` | `ElTableColumnProps[]` | `[]` | 列配置数组，支持嵌套 `children` |
| `align` | `string` | `'center'` | 所有列的默认对齐方式，列配置中的 `align` 优先级更高 |

除 `data` / `class` 外的所有 [el-table 属性](https://element-plus.org/zh-CN/component/table.html)（如 `border`、`stripe`、`size`、`max-height`、`highlight-current-row`、`row-key`、`header-cell-style`、`summary-method` 等）都会原样透传给内部的 `el-table`：

```vue
<EwTable
  :data="data"
  :column="columns"
  :border="true"
  :stripe="true"
  size="small"
  :highlight-current-row="true"
  row-key="id"
  :max-height="240"
/>
```

### 列配置 ElTableColumnProps

在 `el-table-column` 全部属性（`prop`、`label`、`width`、`minWidth`、`fixed`、`sortable`、`showOverflowTooltip`、`type`、`formatter` 等）的基础上，额外支持：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `render` | `(value, scope) => VNodeChild` | 自定义单元格渲染函数；列配置了 `prop` 时 `value` 为单元格值，否则为 `undefined`；`scope` 为 Element Plus 的 `RenderRowData` |
| `slotName` | `string` | 指定默认插槽（作用域插槽）名称，命中时优先于 `render` |
| `headerSlot` | `string` | 指定表头插槽名称，未命中时回退到 `label` |
| `children` | `ElTableColumnProps[]` | 子列配置，用于生成多级表头，存在时递归渲染 |

> `render`、`slotName`、`headerSlot`、`children` 为组件扩展字段，不会传递给 `el-table-column`。

#### 渲染优先级

1. `children` 有值时，该列作为分组列，默认插槽递归渲染子列
2. `slotName` 对应的插槽存在且为函数时，使用该作用域插槽
3. 否则如果配置了 `render`，使用 `render` 函数
4. 以上都没有时，按 `prop` 默认展示单元格值

## 单元格渲染

### 方式一：默认 prop

```ts
const columns: ElTableColumnProps[] = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
]
```

### 方式二：render 函数

`render` 的第一个参数是单元格值，第二个参数是完整作用域（包含 `row`、`column`、`$index` 等）：

```vue
<script setup lang="ts">
import { h } from 'vue'
import { ElTag } from 'element-plus'
import EwTable from 'ew-table'
import type { ElTableColumnProps, TableColumnScope } from 'ew-table'

const data = [
  { id: 1, name: '有机青菜', price: 6.5, status: '在售' },
  { id: 2, name: '手工馒头', price: 3.2, status: '售罄' },
]

const renderPrice = (value: unknown) =>
  h('span', { class: 'price' }, `¥${Number(value).toFixed(2)}`)

const renderStatus = (value: unknown) =>
  h(ElTag, { type: value === '在售' ? 'success' : 'info' }, () => String(value))

const renderRowStatus = (_value: unknown, scope: TableColumnScope) =>
  h(ElTag, { type: scope.row.price > 5 ? 'warning' : 'success' }, () => scope.row.name)

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: '商品名称' },
  { prop: 'price', label: '售价', render: renderPrice },
  { prop: 'status', label: '状态', render: renderStatus },
  { label: '行状态', render: renderRowStatus },
]
</script>

<template>
  <EwTable :data="data" :column="columns" :border="true" />
</template>
```

### 方式三：作用域插槽

通过 `slotName` 指定插槽名，在 `EwTable` 上使用同名插槽，插槽参数为 Element Plus 的单元格作用域：

```vue
<script setup lang="ts">
import EwTable from 'ew-table'
import type { ElTableColumnProps } from 'ew-table'

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: '姓名' },
  { label: '操作', width: 150, fixed: 'right', slotName: 'action' },
]

const data = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
]
</script>

<template>
  <EwTable :data="data" :column="columns">
    <template #action="{ row }">
      <el-button link type="primary">编辑 {{ row.name }}</el-button>
    </template>
  </EwTable>
</template>
```

组件也支持默认插槽，将列配置的 `slotName` 设为 `default` 即可：

```vue
<EwTable :data="data" :column="[{ slotName: 'default' }]">
  <template #default="{ row }">{{ row.name }}</template>
</EwTable>
```

## 自定义表头

通过 `headerSlot` 指定表头插槽名：

```vue
<script setup lang="ts">
import EwTable from 'ew-table'
import type { ElTableColumnProps } from 'ew-table'

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: '姓名' },
  { prop: 'score', label: '绩效评分', headerSlot: 'scoreHeader' },
]
</script>

<template>
  <EwTable :data="data" :column="columns">
    <template #scoreHeader>
      <span class="header-cell">绩效评分（满分 100）</span>
    </template>
  </EwTable>
</template>
```

## 多级表头

通过 `children` 嵌套列配置，任意层级都会递归渲染：

```ts
const columns: ElTableColumnProps[] = [
  { prop: 'name', label: '姓名', width: 120 },
  {
    label: '基本信息',
    children: [
      { prop: 'dept', label: '部门' },
      { prop: 'city', label: '城市' },
    ],
  },
  {
    label: '联系方式',
    children: [{ prop: 'phone', label: '手机号' }],
  },
]
```

## 插槽透传

`EwTable` 会把以下插槽透传给内部 `el-table`：

| 插槽 | 说明 |
| --- | --- |
| `append` | 表格底部追加内容 |
| `empty` | 数据为空时的自定义内容 |
| `default` | 当列配置的 `slotName` 为 `default` 时作为单元格默认插槽 |
| 任意命名插槽 | 供列配置的 `slotName` / `headerSlot` 引用 |

```vue
<EwTable :data="[]" :column="columns">
  <template #empty>
    <div>暂无数据</div>
  </template>
  <template #append>
    <div>追加内容</div>
  </template>
</EwTable>
```

## 实例方法

组件在 `mounted` 阶段自动把 `el-table` 的主要方法挂载到自身实例上，通过 `ref` 即可调用：

| 方法 | 说明 |
| --- | --- |
| `clearSelection` | 清空所有选中行 |
| `toggleRowSelection(row, selected?)` | 切换某一行的选中状态 |
| `toggleAllSelection` | 全选 / 取消全选 |
| `toggleRowExpansion(row, expanded?)` | 切换某一行的展开状态 |
| `setCurrentRow(row?)` | 设置当前行 |
| `clearSort` | 清空排序 |
| `clearFilter(columnKeys?)` | 清空列筛选 |
| `doLayout` | 重新计算表格布局 |
| `sort(prop, order)` | 按指定列排序 |

```vue
<script setup lang="ts">
import { ref } from 'vue'
import EwTable from 'ew-table'
import type { ElTableColumnProps } from 'ew-table'

interface TableExposedMethods {
  clearSelection: () => void
  toggleRowSelection: (row: Record<string, any>, selected?: boolean) => void
  sort: (prop: string, order: 'ascending' | 'descending') => void
}

const tableRef = ref<TableExposedMethods | null>(null)

const columns: ElTableColumnProps[] = [
  { type: 'selection', width: 48 },
  { prop: 'name', label: '姓名' },
]

const data = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
]

const selectSecondRow = () => tableRef.value?.toggleRowSelection(data[1], true)
const clear = () => tableRef.value?.clearSelection()
const sortByAge = () => tableRef.value?.sort('age', 'descending')
</script>

<template>
  <div>
    <el-button @click="selectSecondRow">选中第二行</el-button>
    <el-button @click="clear">清空选中</el-button>
    <el-button @click="sortByAge">按年龄排序</el-button>
    <EwTable ref="tableRef" :data="data" :column="columns" :border="true" />
  </div>
</template>
```

## 导出内容

```ts
import EwTable, { EwTable as NamedEwTable } from 'ew-table'
import type { ElTableColumnProps, TableColumnScope } from 'ew-table'
```

| 导出 | 类型 | 说明 |
| --- | --- | --- |
| `EwTable` | 组件（默认导出 + 命名导出） | 表格组件 |
| `ElTableColumnProps` | TypeScript 类型 | 列配置类型 |
| `TableColumnScope` | TypeScript 类型 | 单元格作用域类型，等价于 Element Plus `RenderRowData` |

## AI 可读文档

仓库根目录提供了遵循 [llmstxt.org](https://llmstxt.org/) 约定的 [llms.txt](./llms.txt)，用精简的 Markdown 汇总包信息、安装方式、API 摘要与参考链接，随 npm 包一起分发，便于 AI 助手（Codex、Claude Code、Cursor、Copilot 等）直接读取，减少凭空猜测 API 的情况。

- 本地或 `node_modules/ew-table/llms.txt` 中均可直接读取
- 也可作为上下文投喂给 AI：

```text
请阅读 ew-table 的 llms.txt（https://github.com/eveningwater/ew-table/blob/main/llms.txt）后再编写示例代码，不要臆造未在文档中出现的属性。
```

> 文档以纯 Markdown 编写，中英文各一份（[README.md](./README.md) / [README.en.md](./README.en.md)），未引入生成式文档站点，AI 可零依赖解析全部内容。

## 本地开发

```bash
pnpm install

pnpm dev             # 监听构建
pnpm build           # 构建 ESM / CJS / d.ts
pnpm test            # 运行单元测试
pnpm test:watch      # 监听测试
pnpm test:coverage   # 覆盖率报告
pnpm typecheck       # vue-tsc 类型检查
pnpm dev:example     # 启动示例站点（默认 5180 端口）
pnpm build:example   # 构建示例站点
```

示例站点启动后访问 `http://localhost:5180/`，包含基础用法、render 渲染、作用域插槽、表头插槽、多级表头、属性透传、实例方法七个示例。

## 项目结构

```text
ew-table/
├── src/
│   ├── EwTable.tsx        # 表格组件
│   ├── table-column.tsx   # 列配置渲染组件
│   ├── tableProps.ts      # 属性与类型定义
│   └── index.ts           # 包入口
├── test/
│   ├── ew-table.spec.ts   # 单元测试
│   └── setup.ts           # jsdom 环境适配
├── examples/              # 示例站点
│   ├── demos/             # 各功能示例
│   ├── App.vue
│   ├── main.ts
│   └── vite.config.ts
├── llms.txt               # AI 可读文档（llmstxt.org 约定）
├── vite.config.ts         # 库构建 + vitest 配置
└── package.json
```

## 测试

单元测试基于 `vitest` + `@vue/test-utils` + `jsdom`，覆盖：

- 基础渲染、`data` / `column` 默认值、列属性传递与 `align` 优先级
- `render` 自定义渲染（含未配置 `prop` 时的 `undefined` 值）
- `slotName` 命中与回退、`default` 插槽透传
- `headerSlot` 自定义表头与回退
- `children` 多级表头递归
- `el-table` 属性透传、`empty` / `append` 插槽
- 九个实例方法注入，以及选中状态的实际读写

## License

MIT
