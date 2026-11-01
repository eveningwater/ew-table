<script setup lang="ts">
import { ElMessage } from 'element-plus'
import EwTable from 'ew-element-plus-table'
import type { ElTableColumnProps } from 'ew-element-plus-table'

const data = [
  { id: 1, name: '张三', role: '店长', phone: '13800000001' },
  { id: 2, name: '李四', role: '收银员', phone: '13800000002' },
  { id: 3, name: '王五', role: '库管', phone: '13800000003' },
]

const columns: ElTableColumnProps[] = [
  { type: 'selection', width: 48 },
  { prop: 'name', label: '姓名' },
  { prop: 'role', label: '角色' },
  { prop: 'phone', label: '手机号' },
  { label: '操作', width: 150, fixed: 'right', slotName: 'action' },
]

const handleEdit = (row: Record<string, any>) => {
  ElMessage.success(`编辑：${row.name}`)
}

const handleDelete = (row: Record<string, any>) => {
  ElMessage.warning(`删除：${row.name}`)
}
</script>

<template>
  <EwTable :data="data" :column="columns" :border="true">
    <template #action="{ row }">
      <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
      <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
    </template>
  </EwTable>
</template>
