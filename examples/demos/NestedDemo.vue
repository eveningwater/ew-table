<script setup lang="ts">
import EwTable from 'ew-table'
import type { ElTableColumnProps } from 'ew-table'

const data = [
  { id: 1, name: '张三', dept: '门店运营', phone: '13800000001', city: '杭州' },
  { id: 2, name: '李四', dept: '仓储物流', phone: '13800000002', city: '上海' },
  { id: 3, name: '王五', dept: '门店运营', phone: '13800000003', city: '成都' },
]

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
    children: [{ prop: 'phone', label: '手机号', width: 180 }],
  },
]
</script>

<template>
  <EwTable :data="data" :column="columns" :border="true" />
</template>
