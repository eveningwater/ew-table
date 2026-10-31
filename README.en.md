# ew-table

[中文文档](./README.md) | English | [llms.txt](./llms.txt)

A configuration-driven table component built on **Vue 3 + Element Plus**. With a single `column` config you get column definitions, custom cell rendering, scoped slots, header slots, and multi-level headers — while inheriting all the capabilities and instance methods of `el-table`.

- Configuration-driven: column definitions live in a `column` array, keeping templates clean
- Three cell rendering strategies: default `prop` display, `render` function, scoped slots
- Header slots and arbitrarily nested multi-level headers
- Transparent passthrough of all `el-table` attributes — no re-wrapping needed
- Main `el-table` methods are auto-injected on mount, callable via `ref`
- Full TypeScript type definitions, 100% unit test coverage

## Installation

```bash
pnpm add ew-table
# or
npm install ew-table
# or
yarn add ew-table
```

`vue` and `element-plus` are declared as peerDependencies and are not bundled, so the host project must install them:

```bash
pnpm add vue element-plus
```

Requirements:

| Dependency | Version |
| --- | --- |
| vue | ^3.3.0 |
| element-plus | ^2.4.0 |

## Quick Start

Register Element Plus globally first (the component internally depends on `el-table` / `el-table-column`):

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
```

Then use it in your components:

```vue
<script setup lang="ts">
import EwTable from 'ew-table'
import type { ElTableColumnProps } from 'ew-table'

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'role', label: 'Role' },
  { prop: 'age', label: 'Age', width: 90 },
]

const data = [
  { id: 1, name: 'Alice', role: 'Manager', age: 32 },
  { id: 2, name: 'Bob', role: 'Cashier', age: 26 },
]
</script>

<template>
  <EwTable :data="data" :column="columns" :border="true" :stripe="true" />
</template>
```

## Component Props

### EwTable Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `TableRow[]` | `[]` | Table data |
| `column` | `ElTableColumnProps[]` | `[]` | Column config array, supports nested `children` |
| `align` | `string` | `'center'` | Default alignment for all columns; a column-level `align` takes precedence |

All [el-table attributes](https://element-plus.org/en-US/component/table.html) except `data` / `class` (such as `border`, `stripe`, `size`, `max-height`, `highlight-current-row`, `row-key`, `header-cell-style`, `summary-method`, etc.) are passed through to the inner `el-table` as-is:

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

### Column Config ElTableColumnProps

On top of all `el-table-column` attributes (`prop`, `label`, `width`, `minWidth`, `fixed`, `sortable`, `showOverflowTooltip`, `type`, `formatter`, etc.), the following extensions are supported:

| Prop | Type | Description |
| --- | --- | --- |
| `render` | `(value, scope) => VNodeChild` | Custom cell render function; when the column has a `prop`, `value` is the cell value, otherwise `undefined`; `scope` is Element Plus `RenderRowData` |
| `slotName` | `string` | Named (scoped) slot for the default cell content; takes precedence over `render` when matched |
| `headerSlot` | `string` | Named slot for the header content; falls back to `label` when not matched |
| `children` | `ElTableColumnProps[]` | Child column configs for multi-level headers; rendered recursively when present |

> `render`, `slotName`, `headerSlot`, and `children` are component extensions and are not forwarded to `el-table-column`.

#### Rendering Priority

1. If `children` is non-empty, the column acts as a group header and the default slot renders its children recursively
2. If a slot matching `slotName` exists, that scoped slot is used
3. Otherwise, if `render` is configured, the `render` function is used
4. If none of the above apply, the cell value is displayed via `prop`

## Cell Rendering

### Option 1: Default prop

```ts
const columns: ElTableColumnProps[] = [
  { prop: 'name', label: 'Name' },
  { prop: 'age', label: 'Age' },
]
```

### Option 2: render function

The first argument of `render` is the cell value; the second is the full scope (containing `row`, `column`, `$index`, etc.):

```vue
<script setup lang="ts">
import { h } from 'vue'
import { ElTag } from 'element-plus'
import EwTable from 'ew-table'
import type { ElTableColumnProps, TableColumnScope } from 'ew-table'

const data = [
  { id: 1, name: 'Organic Greens', price: 6.5, status: 'On Sale' },
  { id: 2, name: 'Handmade Buns', price: 3.2, status: 'Sold Out' },
]

const renderPrice = (value: unknown) =>
  h('span', { class: 'price' }, `$${Number(value).toFixed(2)}`)

const renderStatus = (value: unknown) =>
  h(ElTag, { type: value === 'On Sale' ? 'success' : 'info' }, () => String(value))

const renderRowStatus = (_value: unknown, scope: TableColumnScope) =>
  h(ElTag, { type: scope.row.price > 5 ? 'warning' : 'success' }, () => scope.row.name)

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: 'Product' },
  { prop: 'price', label: 'Price', render: renderPrice },
  { prop: 'status', label: 'Status', render: renderStatus },
  { label: 'Row Status', render: renderRowStatus },
]
</script>

<template>
  <EwTable :data="data" :column="columns" :border="true" />
</template>
```

### Option 3: Scoped slots

Use `slotName` to reference a slot, and provide a slot with the same name on `EwTable`. The slot receives the Element Plus cell scope:

```vue
<script setup lang="ts">
import EwTable from 'ew-table'
import type { ElTableColumnProps } from 'ew-table'

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: 'Name' },
  { label: 'Actions', width: 150, fixed: 'right', slotName: 'action' },
]

const data = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]
</script>

<template>
  <EwTable :data="data" :column="columns">
    <template #action="{ row }">
      <el-button link type="primary">Edit {{ row.name }}</el-button>
    </template>
  </EwTable>
</template>
```

The default slot is also supported — set the column's `slotName` to `default`:

```vue
<EwTable :data="data" :column="[{ slotName: 'default' }]">
  <template #default="{ row }">{{ row.name }}</template>
</EwTable>
```

## Custom Headers

Use `headerSlot` to reference a header slot:

```vue
<script setup lang="ts">
import EwTable from 'ew-table'
import type { ElTableColumnProps } from 'ew-table'

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: 'Name' },
  { prop: 'score', label: 'Performance Score', headerSlot: 'scoreHeader' },
]
</script>

<template>
  <EwTable :data="data" :column="columns">
    <template #scoreHeader>
      <span class="header-cell">Performance Score (out of 100)</span>
    </template>
  </EwTable>
</template>
```

## Multi-level Headers

Nest column configs via `children`; any depth is rendered recursively:

```ts
const columns: ElTableColumnProps[] = [
  { prop: 'name', label: 'Name', width: 120 },
  {
    label: 'Basic Info',
    children: [
      { prop: 'dept', label: 'Department' },
      { prop: 'city', label: 'City' },
    ],
  },
  {
    label: 'Contact',
    children: [{ prop: 'phone', label: 'Phone' }],
  },
]
```

## Slot Passthrough

`EwTable` forwards the following slots to the inner `el-table`:

| Slot | Description |
| --- | --- |
| `append` | Content appended to the bottom of the table |
| `empty` | Custom content shown when data is empty |
| `default` | Used as the default cell slot when a column's `slotName` is `default` |
| Any named slot | Referenced by column `slotName` / `headerSlot` |

```vue
<EwTable :data="[]" :column="columns">
  <template #empty>
    <div>No data yet</div>
  </template>
  <template #append>
    <div>Appended content</div>
  </template>
</EwTable>
```

## Instance Methods

On `mounted`, the component attaches the main `el-table` methods to its own instance, so you can call them via `ref`:

| Method | Description |
| --- | --- |
| `clearSelection` | Clear all selected rows |
| `toggleRowSelection(row, selected?)` | Toggle the selection state of a row |
| `toggleAllSelection` | Select all / deselect all |
| `toggleRowExpansion(row, expanded?)` | Toggle the expansion state of a row |
| `setCurrentRow(row?)` | Set the current row |
| `clearSort` | Clear sorting |
| `clearFilter(columnKeys?)` | Clear column filters |
| `doLayout` | Recalculate table layout |
| `sort(prop, order)` | Sort by the given column |

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
  { prop: 'name', label: 'Name' },
]

const data = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]

const selectSecondRow = () => tableRef.value?.toggleRowSelection(data[1], true)
const clear = () => tableRef.value?.clearSelection()
const sortByAge = () => tableRef.value?.sort('age', 'descending')
</script>

<template>
  <div>
    <el-button @click="selectSecondRow">Select second row</el-button>
    <el-button @click="clear">Clear selection</el-button>
    <el-button @click="sortByAge">Sort by age</el-button>
    <EwTable ref="tableRef" :data="data" :column="columns" :border="true" />
  </div>
</template>
```

## Exports

```ts
import EwTable, { EwTable as NamedEwTable } from 'ew-table'
import type { ElTableColumnProps, TableColumnScope } from 'ew-table'
```

| Export | Type | Description |
| --- | --- | --- |
| `EwTable` | Component (default + named export) | The table component |
| `ElTableColumnProps` | TypeScript type | Column config type |
| `TableColumnScope` | TypeScript type | Cell scope type, equivalent to Element Plus `RenderRowData` |

## AI-Readable Docs

The repo root ships an [llms.txt](./llms.txt) following the [llmstxt.org](https://llmstxt.org/) convention — a condensed Markdown summary of package info, installation, API reference, and links. It is published with the npm package so AI assistants (Codex, Claude Code, Cursor, Copilot, etc.) can read it directly instead of guessing the API.

- Readable locally or at `node_modules/ew-table/llms.txt`
- Or feed it as context to an AI:

```text
Read ew-table's llms.txt (https://github.com/<repo>/blob/main/llms.txt) before writing example code, and do not invent props that are not documented.
```

> Docs are plain Markdown in both Chinese ([README.md](./README.md)) and English ([README.en.md](./README.en.md)); no generated docs site is involved, so AI can parse everything with zero dependencies.

## Local Development

```bash
pnpm install

pnpm dev             # Watch-mode build
pnpm build           # Build ESM / CJS / d.ts
pnpm test            # Run unit tests
pnpm test:watch      # Watch-mode tests
pnpm test:coverage   # Coverage report
pnpm typecheck       # vue-tsc type checking
pnpm dev:example     # Start the example site (port 5180 by default)
pnpm build:example   # Build the example site
```

After starting the example site, visit `http://localhost:5180/` for seven demos: basic usage, render functions, scoped slots, header slots, multi-level headers, attribute passthrough, and instance methods.

## Project Structure

```text
ew-table/
├── src/
│   ├── EwTable.tsx        # Table component
│   ├── table-column.tsx   # Column config renderer
│   ├── tableProps.ts      # Props and type definitions
│   └── index.ts           # Package entry
├── test/
│   ├── ew-table.spec.ts   # Unit tests
│   └── setup.ts           # jsdom environment setup
├── examples/              # Example site
│   ├── demos/             # Feature demos
│   ├── App.vue
│   ├── main.ts
│   └── vite.config.ts
├── llms.txt               # AI-readable docs (llmstxt.org convention)
├── vite.config.ts         # Library build + vitest config
└── package.json
```

## Testing

Unit tests are built on `vitest` + `@vue/test-utils` + `jsdom`, covering:

- Basic rendering, `data` / `column` defaults, column attribute passing, and `align` precedence
- Custom `render` (including `undefined` value when no `prop` is configured)
- `slotName` matching and fallback, `default` slot passthrough
- `headerSlot` custom headers and fallback
- Recursive `children` multi-level headers
- `el-table` attribute passthrough, `empty` / `append` slots
- Nine injected instance methods, plus actual selection state read/write

## License

MIT
