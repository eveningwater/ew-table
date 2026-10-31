import { defineComponent } from 'vue'
import type {
  MergeTableProps,
  ScopeType,
  SlotsType,
  ElTableColumnProps,
  TableColumnScope,
} from './tableProps'
import { tableProps } from './tableProps'

type ColumnTypeProps = Pick<MergeTableProps, 'column' | 'align'>
const columnProps = { column: tableProps.column, align: tableProps.align }

const TableColumn = defineComponent({
  props: {
    ...(columnProps as ColumnTypeProps),
  },
  setup(props, { slots }) {
    const renderColumn = (columnDict: ElTableColumnProps, index: number) => {
      const { render, slotName, headerSlot, children, ...rest } = columnDict
      const vSlots: SlotsType = {}
      if (typeof render === 'function') {
        vSlots.default = (scope: TableColumnScope) => {
          const value = rest.prop ? scope.row[rest.prop as string] : undefined
          return render(value, scope)
        }
      }
      if (slotName && typeof slots[slotName] === 'function') {
        const defaultSlotName = slots[slotName] as ScopeType
        vSlots.default = (scope: TableColumnScope) => defaultSlotName(scope)
      }
      if (headerSlot && slots[headerSlot]) {
        const headerSlotName = slots[headerSlot] as ScopeType
        vSlots.header = (scope: TableColumnScope) => headerSlotName(scope)
      }
      if (children?.length) {
        vSlots.default = () => children.map(renderColumn)
      }
      return (
        <el-table-column
          key={index}
          align={props?.align}
          {...rest}
          v-slots={vSlots}
        />
      )
    }
    return () => <>{props.column?.map(renderColumn)}</>
  },
})

export default TableColumn
