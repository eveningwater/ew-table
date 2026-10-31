<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import EwTable from 'ew-table'
import type { ElTableColumnProps } from 'ew-table'

interface TableExposedMethods {
  clearSelection: () => void
  toggleAllSelection: () => void
  toggleRowSelection: (row: Record<string, any>, selected?: boolean) => void
  doLayout: () => void
  sort: (prop: string, order: 'ascending' | 'descending') => void
}

const tableRef = ref<TableExposedMethods | null>(null)

const data = [
  { id: 1, name: '张三', age: 32 },
  { id: 2, name: '李四', age: 26 },
  { id: 3, name: '王五', age: 29 },
]

const columns: ElTableColumnProps[] = [
  { type: 'selection', width: 48 },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄', width: 100 },
]

const selectSecondRow = () => {
  tableRef.value?.toggleRowSelection(data[1], true)
}

const toggleAll = () => {
  tableRef.value?.toggleAllSelection()
}

const clearSelection = () => {
  tableRef.value?.clearSelection()
  ElMessage.info('已清空选中')
}

const sortByAge = () => {
  tableRef.value?.sort('age', 'descending')
  ElMessage.info('已按年龄降序排列')
}

const relayout = () => {
  tableRef.value?.doLayout()
  ElMessage.info('已重新布局')
}
</script>

<template>
  <div class="example-toolbar">
    <el-button type="primary" plain @click="selectSecondRow">选中第二行</el-button>
    <el-button @click="toggleAll">全选 / 取消全选</el-button>
    <el-button type="danger" plain @click="clearSelection">清空选中</el-button>
    <el-button @click="sortByAge">按年龄降序排序</el-button>
    <el-button @click="relayout">重新布局</el-button>
  </div>
  <EwTable ref="tableRef" :data="data" :column="columns" :border="true" row-key="id" />
</template>
