import { defineComponent } from 'vue'
import type { TableInstance } from 'element-plus'
import TableColumn from './table-column'
import type { MergeTableProps, MethodNameType } from './tableProps'
import { tableProps } from './tableProps'

export default defineComponent({
  name: 'EwTable',
  props: {
    ...(tableProps as MergeTableProps),
  },
  components: { TableColumn },
  mounted() {
    this.injectTablePrimaryMethods()
  },
  methods: {
    injectTablePrimaryMethods() {
      const _self = this as unknown as Partial<TableInstance> & {
        $refs: { elTableRef?: TableInstance }
      }
      const elTableRef = _self.$refs.elTableRef
      const tableMethodNameList: MethodNameType[] = [
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
      for (const name of tableMethodNameList) {
        if (!_self[name]) {
          _self[name] = elTableRef?.[name]
        }
      }
    },
  },
  setup(props, { slots, attrs }) {
    return () => (
      <div class="element-table">
        <el-table
          data={props.data}
          ref="elTableRef"
          {...attrs}
          v-slots={{
            append: () => slots.append && slots.append(),
            empty: () => slots.empty && slots.empty(),
          }}
        >
          <table-column column={props.column} align={props.align} v-slots={slots}></table-column>
        </el-table>
      </div>
    )
  },
})
