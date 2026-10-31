import type { PropType, VNodeChild } from 'vue'
import type {
  TableInstance,
  TableColumnInstance,
  TableProps,
  RenderRowData,
  SummaryMethod,
} from 'element-plus'

/** 表格行数据类型（对齐 element-plus 内部 DefaultRow = Record<PropertyKey, any>，单元格值天然动态） */
export type TableRow = Record<string, any>

/** el-table 列作用域（单元格 default 插槽参数） */
export type TableColumnScope<T extends TableRow = TableRow> = RenderRowData<T>

/** 单元格自定义渲染函数：列配置了 prop 时第一个参数为单元格值，第二个为作用域 */
export type RenderFunction<T extends TableRow = TableRow> = (
  value: unknown,
  scope: TableColumnScope<T>,
) => VNodeChild

export type ElTableType = TableInstance
export type ElTableProps = TableProps

export type UserElTableColumnProps = {
  slotName?: string
  headerSlot?: string
  render?: RenderFunction
  children?: ElTableColumnProps[]
}

export type MethodNameType = keyof TableInstance

export type ElTableColumnProps = TableColumnInstance['$props'] & UserElTableColumnProps

// 排除 data / class，其余 el-table 属性全部透传
export type OmitTableProp = Required<Omit<TableProps, 'data' | 'class'>>

export type KeyConstructor<Base extends object> = {
  [KeyProp in keyof Base]: PropType<Base[KeyProp]>
}

export type TableValidProps = KeyConstructor<OmitTableProp>

export const tableProps = {
  data: {
    type: Array as PropType<TableRow[]>,
    default: () => [],
  },
  align: {
    type: String,
    default: 'center',
  },
  column: {
    type: Array as PropType<ElTableColumnProps[]>,
    default: () => [],
  },
}

export type MergeTableProps = typeof tableProps &
  TableValidProps & {
    summaryMethod: PropType<SummaryMethod<TableRow>>
  }

export type SlotsType = {
  default?: (scope: TableColumnScope) => VNodeChild
  header?: (scope: TableColumnScope) => VNodeChild
}

export type ScopeType = (scope: TableColumnScope) => VNodeChild
