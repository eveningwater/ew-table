<script setup lang="ts">
import EwTable from 'ew-table'
import type { ElTableColumnProps } from 'ew-table'

const data = [
  { id: 1, name: '张三', score: 92, level: 'A' },
  { id: 2, name: '李四', score: 85, level: 'B' },
  { id: 3, name: '王五', score: 78, level: 'C' },
]

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: '姓名' },
  { prop: 'score', label: '绩效评分', width: 160, headerSlot: 'scoreHeader' },
  { prop: 'level', label: '评级', width: 100, headerSlot: 'levelHeader' },
]
</script>

<template>
  <EwTable :data="data" :column="columns" :border="true">
    <template #scoreHeader>
      <span class="example-header">绩效评分（满分 100）</span>
    </template>
    <template #levelHeader>
      <span class="example-header">评级</span>
    </template>
  </EwTable>
</template>
