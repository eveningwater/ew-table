declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    data: {
        type: import('vue').PropType<import('./tableProps').TableRow[]>;
        default: () => never[];
    };
    align: {
        type: StringConstructor;
        default: string;
    };
    column: {
        type: import('vue').PropType<import('./tableProps').ElTableColumnProps[]>;
        default: () => never[];
    };
    size: import('vue').PropType<"" | "default" | "small" | "large">;
    width: import('vue').PropType<string | number>;
    height: import('vue').PropType<string | number>;
    maxHeight: import('vue').PropType<string | number>;
    fit: import('vue').PropType<boolean>;
    stripe: import('vue').PropType<boolean>;
    border: import('vue').PropType<boolean>;
    rowKey: import('vue').PropType<string | ((row: import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow) => string)>;
    context: import('vue').PropType<import('element-plus').Table<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    showHeader: import('vue').PropType<boolean>;
    showSummary: import('vue').PropType<boolean>;
    sumText: import('vue').PropType<string>;
    summaryMethod: import('vue').PropType<import('element-plus').SummaryMethod<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>> & import('vue').PropType<import('element-plus').SummaryMethod<import('./tableProps').TableRow>>;
    rowClassName: import('vue').PropType<import('element-plus').ColumnCls<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    rowStyle: import('vue').PropType<import('element-plus').ColumnStyle<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    cellClassName: import('vue').PropType<import('element-plus').CellCls<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    cellStyle: import('vue').PropType<import('element-plus').CellStyle<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    headerRowClassName: import('vue').PropType<import('element-plus').ColumnCls<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    headerRowStyle: import('vue').PropType<import('element-plus').ColumnStyle<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    headerCellClassName: import('vue').PropType<import('element-plus').CellCls<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    headerCellStyle: import('vue').PropType<import('element-plus').CellStyle<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    highlightCurrentRow: import('vue').PropType<boolean>;
    currentRowKey: import('vue').PropType<string | number>;
    emptyText: import('vue').PropType<string>;
    expandRowKeys: import('vue').PropType<string[]>;
    defaultExpandAll: import('vue').PropType<boolean>;
    rowExpandable: import('vue').PropType<(row: import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow, index: number) => boolean>;
    defaultSort: import('vue').PropType<import('element-plus').Sort>;
    tooltipEffect: import('vue').PropType<string>;
    tooltipOptions: import('vue').PropType<Partial<Omit<import('element-plus').UseTooltipProps, "content" | "rawContent" | "persistent" | "visible" | "autoClose" | "referenceEl" | "triggerTargetEl" | "virtualRef" | "virtualTriggering">>>;
    spanMethod: import('vue').PropType<(data: {
        row: import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow;
        rowIndex: number;
        column: import('element-plus').TableColumnCtx<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>;
        columnIndex: number;
    }) => number[] | {
        rowspan: number;
        colspan: number;
    } | undefined>;
    selectOnIndeterminate: import('vue').PropType<boolean>;
    indent: import('vue').PropType<number>;
    treeProps: import('vue').PropType<import('element-plus/es/components/table/src/table/defaults.mjs').TreeProps>;
    lazy: import('vue').PropType<boolean>;
    load: import('vue').PropType<(row: import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow, treeNode: import('element-plus').TreeNode, resolve: (data: import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow[]) => void) => void>;
    className: import('vue').PropType<string>;
    style: import('vue').PropType<string | false | import('vue').CSSProperties | import('vue').StyleValue[] | null>;
    tableLayout: import('vue').PropType<"fixed" | "auto">;
    scrollbarAlwaysOn: import('vue').PropType<boolean>;
    flexible: import('vue').PropType<boolean>;
    showOverflowTooltip: import('vue').PropType<boolean | Partial<Omit<import('element-plus').UseTooltipProps, "content" | "rawContent" | "persistent" | "visible" | "autoClose" | "referenceEl" | "triggerTargetEl" | "virtualRef" | "virtualTriggering">>>;
    tooltipFormatter: import('vue').PropType<import('element-plus/es/components/table/src/util.mjs').TableOverflowTooltipFormatter<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    appendFilterPanelTo: import('vue').PropType<string>;
    scrollbarTabindex: import('vue').PropType<string | number>;
    allowDragLastColumn: import('vue').PropType<boolean>;
    preserveExpandedContent: import('vue').PropType<boolean>;
    nativeScrollbar: import('vue').PropType<boolean>;
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {
    injectTablePrimaryMethods(): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    data: {
        type: import('vue').PropType<import('./tableProps').TableRow[]>;
        default: () => never[];
    };
    align: {
        type: StringConstructor;
        default: string;
    };
    column: {
        type: import('vue').PropType<import('./tableProps').ElTableColumnProps[]>;
        default: () => never[];
    };
    size: import('vue').PropType<"" | "default" | "small" | "large">;
    width: import('vue').PropType<string | number>;
    height: import('vue').PropType<string | number>;
    maxHeight: import('vue').PropType<string | number>;
    fit: import('vue').PropType<boolean>;
    stripe: import('vue').PropType<boolean>;
    border: import('vue').PropType<boolean>;
    rowKey: import('vue').PropType<string | ((row: import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow) => string)>;
    context: import('vue').PropType<import('element-plus').Table<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    showHeader: import('vue').PropType<boolean>;
    showSummary: import('vue').PropType<boolean>;
    sumText: import('vue').PropType<string>;
    summaryMethod: import('vue').PropType<import('element-plus').SummaryMethod<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>> & import('vue').PropType<import('element-plus').SummaryMethod<import('./tableProps').TableRow>>;
    rowClassName: import('vue').PropType<import('element-plus').ColumnCls<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    rowStyle: import('vue').PropType<import('element-plus').ColumnStyle<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    cellClassName: import('vue').PropType<import('element-plus').CellCls<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    cellStyle: import('vue').PropType<import('element-plus').CellStyle<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    headerRowClassName: import('vue').PropType<import('element-plus').ColumnCls<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    headerRowStyle: import('vue').PropType<import('element-plus').ColumnStyle<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    headerCellClassName: import('vue').PropType<import('element-plus').CellCls<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    headerCellStyle: import('vue').PropType<import('element-plus').CellStyle<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    highlightCurrentRow: import('vue').PropType<boolean>;
    currentRowKey: import('vue').PropType<string | number>;
    emptyText: import('vue').PropType<string>;
    expandRowKeys: import('vue').PropType<string[]>;
    defaultExpandAll: import('vue').PropType<boolean>;
    rowExpandable: import('vue').PropType<(row: import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow, index: number) => boolean>;
    defaultSort: import('vue').PropType<import('element-plus').Sort>;
    tooltipEffect: import('vue').PropType<string>;
    tooltipOptions: import('vue').PropType<Partial<Omit<import('element-plus').UseTooltipProps, "content" | "rawContent" | "persistent" | "visible" | "autoClose" | "referenceEl" | "triggerTargetEl" | "virtualRef" | "virtualTriggering">>>;
    spanMethod: import('vue').PropType<(data: {
        row: import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow;
        rowIndex: number;
        column: import('element-plus').TableColumnCtx<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>;
        columnIndex: number;
    }) => number[] | {
        rowspan: number;
        colspan: number;
    } | undefined>;
    selectOnIndeterminate: import('vue').PropType<boolean>;
    indent: import('vue').PropType<number>;
    treeProps: import('vue').PropType<import('element-plus/es/components/table/src/table/defaults.mjs').TreeProps>;
    lazy: import('vue').PropType<boolean>;
    load: import('vue').PropType<(row: import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow, treeNode: import('element-plus').TreeNode, resolve: (data: import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow[]) => void) => void>;
    className: import('vue').PropType<string>;
    style: import('vue').PropType<string | false | import('vue').CSSProperties | import('vue').StyleValue[] | null>;
    tableLayout: import('vue').PropType<"fixed" | "auto">;
    scrollbarAlwaysOn: import('vue').PropType<boolean>;
    flexible: import('vue').PropType<boolean>;
    showOverflowTooltip: import('vue').PropType<boolean | Partial<Omit<import('element-plus').UseTooltipProps, "content" | "rawContent" | "persistent" | "visible" | "autoClose" | "referenceEl" | "triggerTargetEl" | "virtualRef" | "virtualTriggering">>>;
    tooltipFormatter: import('vue').PropType<import('element-plus/es/components/table/src/util.mjs').TableOverflowTooltipFormatter<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>>;
    appendFilterPanelTo: import('vue').PropType<string>;
    scrollbarTabindex: import('vue').PropType<string | number>;
    allowDragLastColumn: import('vue').PropType<boolean>;
    preserveExpandedContent: import('vue').PropType<boolean>;
    nativeScrollbar: import('vue').PropType<boolean>;
}>> & Readonly<{}>, {
    data: import('./tableProps').TableRow[];
    align: string;
    column: import('./tableProps').ElTableColumnProps[];
}, {}, {
    TableColumn: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        align: {
            type: StringConstructor;
            default: string;
        };
        column: {
            type: import('vue').PropType<import('./tableProps').ElTableColumnProps[]>;
            default: () => never[];
        };
    }>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        align: {
            type: StringConstructor;
            default: string;
        };
        column: {
            type: import('vue').PropType<import('./tableProps').ElTableColumnProps[]>;
            default: () => never[];
        };
    }>> & Readonly<{}>, {
        align: string;
        column: import('./tableProps').ElTableColumnProps[];
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
