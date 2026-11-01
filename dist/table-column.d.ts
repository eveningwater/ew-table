import { ElTableColumnProps } from './tableProps';
declare const TableColumn: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    align: {
        type: StringConstructor;
        default: string;
    };
    column: {
        type: import('vue').PropType<ElTableColumnProps[]>;
        default: () => never[];
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    align: {
        type: StringConstructor;
        default: string;
    };
    column: {
        type: import('vue').PropType<ElTableColumnProps[]>;
        default: () => never[];
    };
}>> & Readonly<{}>, {
    align: string;
    column: ElTableColumnProps[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default TableColumn;
