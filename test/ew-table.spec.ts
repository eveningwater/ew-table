import { describe, it, expect, vi } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus, { ElTable, ElTableColumn } from 'element-plus'
import EwTable, { EwTable as NamedEwTable } from '../src'
import type { ElTableColumnProps, TableRow } from '../src/tableProps'

const rows: TableRow[] = [
  { id: 1, name: '张三', age: 18 },
  { id: 2, name: '李四', age: 20 },
]

const columns: ElTableColumnProps[] = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
]

const mountTable = (options: Record<string, unknown> = {}) =>
  mount(EwTable, {
    global: { plugins: [ElementPlus] },
    ...options,
  })

/** Element Plus 表格的渲染依赖多轮微任务，这里统一等待 */
const flushTable = async () => {
  await nextTick()
  await nextTick()
}

describe('EwTable', () => {
  it('入口文件同时提供默认导出与命名导出', () => {
    expect(EwTable).toBe(NamedEwTable)
    expect(EwTable.name).toBe('EwTable')
  })

  it('使用 el-table 渲染并输出列数据', async () => {
    const wrapper = mountTable({
      props: { data: rows, column: columns },
    })
    await flushTable()

    expect(wrapper.find('.element-table').exists()).toBe(true)
    expect(wrapper.findComponent(ElTable).exists()).toBe(true)
    expect(wrapper.text()).toContain('姓名')
    expect(wrapper.text()).toContain('张三')
    expect(wrapper.text()).toContain('李四')
  })

  it('data 与 column 的默认值均为空数组', () => {
    const wrapper = mountTable()
    const tableProps = wrapper.findComponent(ElTable).props() as Record<string, unknown>

    expect(tableProps.data).toEqual([])
    expect(wrapper.findAllComponents(ElTableColumn)).toHaveLength(0)
  })

  it('列 prop 正确传递给 el-table-column，默认居中显示', async () => {
    const wrapper = mountTable({
      props: { data: rows, column: columns },
    })
    await flushTable()

    const columnPropsList = wrapper
      .findAllComponents(ElTableColumn)
      .map((item) => item.props() as Record<string, unknown>)
    expect(columnPropsList).toHaveLength(2)
    expect(columnPropsList[0].prop).toBe('name')
    expect(columnPropsList[1].prop).toBe('age')
    expect(columnPropsList.every((item) => item.align === 'center')).toBe(true)
  })

  it('支持自定义 align，且列配置中的 align 优先级更高', async () => {
    const wrapper = mountTable({
      props: {
        data: rows,
        column: [{ prop: 'name', label: '姓名', align: 'left' }],
        align: 'right',
      },
    })
    await flushTable()

    const [firstColumn] = wrapper.findAllComponents(ElTableColumn)
    expect((firstColumn.props() as Record<string, unknown>).align).toBe('left')
  })

  it('render 函数可拿到单元格值与作用域并自定义渲染', async () => {
    const renderFn = vi.fn((value: unknown, scope: any) =>
      h('span', { class: 'custom-cell' }, `${scope.row.id}-${value}`),
    )
    const wrapper = mountTable({
      props: {
        data: rows,
        column: [{ prop: 'name', label: '姓名', render: renderFn }],
      },
    })
    await flushTable()

    expect(renderFn).toHaveBeenCalled()
    const nameCellCall = renderFn.mock.calls.find(([, scope]) => scope?.row?.id === 1)
    expect(nameCellCall?.[0]).toBe('张三')
    expect(nameCellCall?.[1].row.name).toBe('张三')
    expect(wrapper.findAll('.custom-cell')).toHaveLength(2)
    expect(wrapper.text()).toContain('1-张三')
  })

  it('slotName 命中插槽时优先于 render 渲染', async () => {
    const renderFn = vi.fn(() => h('span', 'render 内容'))
    const wrapper = mountTable({
      props: {
        data: rows,
        column: [{ prop: 'name', label: '姓名', render: renderFn, slotName: 'nameSlot' }],
      },
      slots: {
        nameSlot: (scope: any) => h('strong', `插槽姓名：${scope.row.name}`),
      },
    })
    await flushTable()

    expect(renderFn).not.toHaveBeenCalled()
    expect(wrapper.findAll('strong')).toHaveLength(2)
    expect(wrapper.text()).toContain('插槽姓名：张三')
  })

  it('slotName 未命中插槽时回退到 render 渲染', async () => {
    const wrapper = mountTable({
      props: {
        data: rows,
        column: [{ prop: 'name', label: '姓名', render: () => h('span', '回退内容'), slotName: 'missing' }],
      },
    })
    await flushTable()

    expect(wrapper.findAll('span')).toHaveLength(2)
    expect(wrapper.text()).toContain('回退内容')
  })

  it('headerSlot 可自定义表头', async () => {
    const wrapper = mountTable({
      props: {
        data: rows,
        column: [{ prop: 'name', label: '姓名', headerSlot: 'headerName' }],
      },
      slots: {
        headerName: () => h('em', '自定义表头'),
      },
    })
    await flushTable()

    expect(wrapper.text()).toContain('自定义表头')
    expect(wrapper.findAll('em')).toHaveLength(1)
  })

  it('未配置 prop 时 render 函数的第一个参数为 undefined', async () => {
    const renderFn = vi.fn((value: unknown, _scope: any) => h('span', `操作值：${String(value)}`))
    const wrapper = mountTable({
      props: {
        data: rows,
        column: [{ label: '操作', render: renderFn }],
      },
    })
    await flushTable()

    const cellCall = renderFn.mock.calls.find(([, scope]) => scope?.row?.id === 1)
    expect(cellCall?.[0]).toBeUndefined()
    expect(wrapper.findAll('span')).toHaveLength(2)
    expect(wrapper.text()).toContain('操作值：undefined')
  })

  it('headerSlot 未命中插槽时回退到 label 表头', async () => {
    const wrapper = mountTable({
      props: {
        data: rows,
        column: [{ prop: 'name', label: '姓名', headerSlot: 'missingHeader' }],
      },
    })
    await flushTable()

    expect(wrapper.text()).toContain('姓名')
  })

  it('children 支持多级表头并递归渲染列', async () => {
    const wrapper = mountTable({
      props: {
        data: rows,
        column: [
          { label: '基础信息', children: [{ prop: 'name', label: '姓名' }, { prop: 'age', label: '年龄' }] },
        ],
      },
    })
    await flushTable()

    expect(wrapper.findAllComponents(ElTableColumn)).toHaveLength(3)
    expect(wrapper.text()).toContain('基础信息')
    expect(wrapper.text()).toContain('姓名')
    expect(wrapper.text()).toContain('张三')
    expect(wrapper.text()).toContain('18')
  })

  it('默认插槽可以透传给列', async () => {
    const wrapper = mountTable({
      props: {
        data: rows,
        column: [{ label: '姓名', slotName: 'default' }],
      },
      slots: {
        default: (scope: any) => h('div', `默认插槽-${scope.row.name}`),
      },
    })
    await flushTable()

    expect(wrapper.text()).toContain('默认插槽-张三')
    expect(wrapper.text()).toContain('默认插槽-李四')
  })

  it('其余 el-table 属性透传（border / stripe / size）', async () => {
    const wrapper = mountTable({
      props: { data: rows, column: columns },
      attrs: { border: true, stripe: true, size: 'small' },
    })
    await flushTable()

    const tableProps = wrapper.findComponent(ElTable).props() as Record<string, unknown>
    expect(tableProps.border).toBe(true)
    expect(tableProps.stripe).toBe(true)
    expect(tableProps.size).toBe('small')
  })

  it('empty 与 append 插槽透传给 el-table', async () => {
    const wrapper = mountTable({
      props: { data: [], column: columns },
      slots: {
        empty: () => h('div', '暂无数据'),
        append: () => h('div', '追加内容'),
      },
    })
    await flushTable()

    expect(wrapper.text()).toContain('暂无数据')
    expect(wrapper.text()).toContain('追加内容')
  })

  it('mounted 后注入 el-table 的主要方法', () => {
    const wrapper = mountTable({
      props: { data: rows, column: columns },
    })
    const vm = wrapper.vm as unknown as Record<string, unknown>
    const methods = [
      'clearSelection',
      'toggleRowSelection',
      'toggleAllSelection',
      'toggleRowExpansion',
      'setCurrentRow',
      'clearSort',
      'clearFilter',
      'doLayout',
      'sort',
    ]
    for (const name of methods) {
      expect(typeof vm[name]).toBe('function')
    }
  })

  it('注入的方法可直接操作表格选中状态', async () => {
    const wrapper = mountTable({
      props: { data: rows, column: columns },
    })
    await flushTable()

    const vm = wrapper.vm as any
    const tableVm = wrapper.findComponent(ElTable).vm as any

    vm.toggleRowSelection(rows[0], true)
    await flushTable()
    expect(tableVm.getSelectionRows()).toHaveLength(1)

    vm.clearSelection()
    await flushTable()
    expect(tableVm.getSelectionRows()).toHaveLength(0)
  })
})
