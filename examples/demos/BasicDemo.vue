<script setup lang="ts">
import EwTable from 'ew-element-plus-table'
import type { ElTableColumnProps } from 'ew-element-plus-table'

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'role', label: '角色' },
  { prop: 'age', label: '年龄', width: 90 },
  { prop: 'city', label: '城市', align: 'left' },
]

const data = [
  { id: 1, name: '张三', role: '店长', age: 32, city: '杭州' },
  { id: 2, name: '李四', role: '收银员', age: 26, city: '上海' },
  { id: 3, name: '王五', role: '库管', age: 29, city: '成都' },
  { id: 4, name: '赵六', role: '配送员', age: 24, city: '武汉' },
]
</script>

<template>
  <EwTable :data="data" :column="columns" :border="true" :stripe="true" />
</template>
