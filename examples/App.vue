<script setup lang="ts">
import BasicDemo from './demos/BasicDemo.vue'
import RenderDemo from './demos/RenderDemo.vue'
import SlotDemo from './demos/SlotDemo.vue'
import HeaderSlotDemo from './demos/HeaderSlotDemo.vue'
import NestedDemo from './demos/NestedDemo.vue'
import AttrsDemo from './demos/AttrsDemo.vue'
import MethodsDemo from './demos/MethodsDemo.vue'

const demos = [
  {
    id: 'basic',
    title: '基础用法',
    description: '通过 data 与 column 配置即可渲染表格，默认列内容居中显示。',
    component: BasicDemo,
  },
  {
    id: 'render',
    title: '自定义渲染 render',
    description: '列的 render 函数可拿到单元格值与作用域，适合价格、状态标签等场景。',
    component: RenderDemo,
  },
  {
    id: 'slot',
    title: '作用域插槽 slotName',
    description: '通过 slotName 指定插槽名，在 EwTable 上使用同名作用域插槽渲染单元格。',
    component: SlotDemo,
  },
  {
    id: 'header-slot',
    title: '自定义表头 headerSlot',
    description: '通过 headerSlot 指定表头插槽名，可自定义表头内容与样式。',
    component: HeaderSlotDemo,
  },
  {
    id: 'nested',
    title: '多级表头',
    description: '通过 children 配置嵌套列，自动递归生成多级表头。',
    component: NestedDemo,
  },
  {
    id: 'attrs',
    title: '属性透传',
    description: '未被组件声明的 el-table 属性会原样透传，例如 border、stripe、max-height 等。',
    component: AttrsDemo,
  },
  {
    id: 'methods',
    title: '表格方法调用',
    description: '组件挂载后自动注入 el-table 的主要方法，可通过 ref 直接调用。',
    component: MethodsDemo,
  },
]
</script>

<template>
  <header class="page-head">
    <h1>ew-table 示例</h1>
    <p class="example-muted">基于 Vue 3 + Element Plus 的配置化表格组件</p>
  </header>

  <main>
    <section v-for="demo in demos" :id="demo.id" :key="demo.id" class="example-card">
      <div class="example-card__head">
        <h2 class="example-card__title">{{ demo.title }}</h2>
        <p class="example-card__desc">{{ demo.description }}</p>
      </div>
      <component :is="demo.component" />
    </section>
  </main>
</template>

<style scoped>
.page-head {
  margin-bottom: 24px;
}

.page-head h1 {
  margin: 0 0 8px;
  font-size: 24px;
}

.page-head p {
  margin: 0;
  font-size: 14px;
}
</style>
