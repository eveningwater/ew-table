<script setup lang="ts">
import EwTable from 'ew-table'
import type { ElTableColumnProps } from 'ew-table'

const data = [
  {
    id: 1,
    name: '餐小满门店管理后台',
    remark: '这是一段用于演示超出省略提示的较长文本，鼠标悬浮可以看到完整内容。',
    owner: '夕水',
    updatedAt: '2026-10-20',
  },
  {
    id: 2,
    name: '零食快批进销存系统',
    remark: '同样是一段较长文本，用于展示 show-overflow-tooltip 的效果。',
    owner: '夕水',
    updatedAt: '2026-10-25',
  },
  {
    id: 3,
    name: '门店数据看板',
    remark: '短文本不会触发省略提示。',
    owner: '张三',
    updatedAt: '2026-10-28',
  },
]

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: '项目名称', minWidth: 160 },
  { prop: 'remark', label: '备注', minWidth: 160, showOverflowTooltip: true },
  { prop: 'owner', label: '负责人', width: 100 },
  { prop: 'updatedAt', label: '更新时间', width: 120 },
]
</script>

<template>
  <EwTable
    :data="data"
    :column="columns"
    :border="true"
    :stripe="true"
    size="small"
    :highlight-current-row="true"
    row-key="id"
    :max-height="220"
    :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
  />
</template>
