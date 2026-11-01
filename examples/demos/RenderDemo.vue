<script setup lang="ts">
import { h } from 'vue'
import { ElTag } from 'element-plus'
import EwTable from 'ew-element-plus-table'
import type { ElTableColumnProps, TableColumnScope } from 'ew-element-plus-table'

const data = [
  { id: 1, name: '有机青菜', price: 6.5, stock: 30, status: '在售' },
  { id: 2, name: '手工馒头', price: 3.2, stock: 5, status: '在售' },
  { id: 3, name: '土鸡蛋', price: 15.8, stock: 0, status: '售罄' },
]

const renderPrice = (value: unknown) =>
  h('span', { class: 'example-price' }, `¥${Number(value).toFixed(2)}`)

const renderStock = (value: unknown) => {
  const stock = Number(value)
  return h('span', { class: stock <= 5 ? 'example-price' : '' }, stock <= 5 ? `${stock}（库存紧张）` : String(stock))
}

const renderStockState = (_value: unknown, scope: TableColumnScope) =>
  h(
    ElTag,
    { type: scope.row.stock <= 5 ? 'danger' : 'success', effect: 'plain' },
    () => (scope.row.stock <= 5 ? '需补货' : '充足'),
  )

const renderStatus = (value: unknown) =>
  h(ElTag, { type: value === '在售' ? 'success' : 'info', effect: 'light' }, () => String(value))

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: '商品名称' },
  { prop: 'price', label: '售价', width: 120, render: renderPrice },
  { prop: 'stock', label: '库存', width: 160, render: renderStock },
  { label: '库存状态', width: 120, render: renderStockState },
  { prop: 'status', label: '状态', width: 100, render: renderStatus },
]
</script>

<template>
  <EwTable :data="data" :column="columns" :border="true" />
</template>
