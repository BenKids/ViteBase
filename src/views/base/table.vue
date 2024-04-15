<script setup lang="ts">
const step: string = `const tableData = reactive<TsTable.Model>([
    {
        name: "张三丰",
        sex: "男",
        age: "30",
    }, {
        name: "张三丰",
        sex: "男",
        age: "30",
    }, {
        name: "张三丰",
        sex: "男",
        age: "30",
    }
]);`;
const template: string = `<base-table v-model="tableData">
    <base-table-column label="姓名" prop="name"></base-table-column>
    <base-table-column label="性别" prop="sex"></base-table-column>
    <base-table-column label="年龄" prop="age"></base-table-column>
</base-table>`;
const tableData = reactive<TsTable.Model>([
    {
        name: "张三丰",
        sex: "男",
        age: "30",
    }, {
        name: "张三丰",
        sex: "男",
        age: "30",
    }, {
        name: "张三丰",
        sex: "男",
        age: "30",
    }
]);
const tableAttr: TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定数据",
        dataType: "TsTable.Model",
        required: true,
        default: "",
        optional: "",
    }, {
        key: "v-model:selectData",
        explain: "选择的表格行数据，支持跨页",
        dataType: "TsTable.Model",
        required: false,
        default: "",
        optional: "",
    }, {
        key: "sets",
        explain: "参数设置",
        dataType: "TsTable.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets: TsTheBaseTable.Model = [
    {
        key: "height",
        explain: "表格高度，超出高度后固定表头滚动",
        dataType: "string / number",
        required: false,
        default: "",
        optional: "",
    }, {
        key: "maxHeight",
        explain: "表格最大高度，设置此参数时不要设置height，超出最大高度后固定表头滚动",
        dataType: "string / number",
        required: false,
        default: "",
        optional: "",
    }, {
        key: "stripe",
        explain: "斑马纹",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }, {
        key: "border",
        explain: "边框",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }, {
        key: "size",
        explain: "尺寸大小",
        dataType: "enum",
        required: false,
        default: "",
        optional: "default / large / small",
    }, {
        key: "showHeader",
        explain: "显示表头",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }, {
        key: "highlightCurrentRow",
        explain: "高亮当前行",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }, {
        key: "currentRowKey",
        explain: "当前行的 key，只写属性",
        dataType: "string / number",
        required: false,
        default: "",
        optional: "",
    }, {
        key: "rowKey",
        explain: "行数据的 Key，用来优化 Table 的渲染；在使用reserve-selection功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持user.info[0].id，此种情况请使用 Function。",
        dataType: "string / Function",
        required: false,
        default: "",
        optional: "string / ((row:TsTable.ModelItem) => string)",
    }, {
        key: "emptyText",
        explain: "无数据时的文本，也可以通过 #empty 自定义",
        dataType: "string",
        required: false,
        default: "暂无数据",
        optional: "",
    }, {
        key: "tooltipEffect",
        explain: "tooltip类型",
        dataType: "enum",
        required: false,
        default: "dark",
        optional: "dark / light",
    }, {
        key: "align",
        explain: "对齐方式",
        dataType: "enum",
        required: false,
        default: "left",
        optional: "left / center / right",
    }, {
        key: "headerAlign",
        explain: "表头对齐方式，若不设置该项，则使用表格的对齐方式",
        dataType: "enum",
        required: false,
        default: "",
        optional: "left / center / right",
    }, {
        key: "showOverflowTooltip",
        explain: "当内容过长被隐藏时显示 tooltip",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }, {
        key: "emptyCell",
        explain: "某项无数据时展示文本",
        dataType: "string",
        required: false,
        default: "--",
        optional: "",
    }, {
        key: "showSummary",
        explain: "显示合计",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }, {
        key: "sumText",
        explain: "合计第一列文本",
        dataType: "string",
        required: false,
        default: "合计",
        optional: "",
    }, {
        key: "summaryMethod",
        explain: "自定义的合计计算方法",
        dataType: "Function",
        required: false,
        default: "",
        optional: "{ prop: keyof T; fmt: `${string}{v}${string}`; }[]",
    }, {
        key: "spanMethod",
        explain: "自定义的合并行或列计算方法",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(param: SpanMethodProps) => { rowspan: number; colspan: number };",
    }, {
        key: "lazy",
        explain: "懒加载",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }, {
        key: "load",
        explain: "懒加载时的方法，需要将lazy设置为true",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(row: TsDept.TableItem, resolve: (date: TsDept.Table) => void) => void;",
    },{
        key: "defaultExpandAll",
        explain: "默认展开所有行",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
];
const tableSlot: TsTheBaseTableSlot.Model = [
    {
        key: "empty",
        explain: "无数据时的自定义插槽"
    }
]
</script>
<template>
    <the-base-layout :step="step" :template="template"
                     original-link="https://element-plus.gitee.io/zh-CN/component/table.html">
        <template #view>
            <base-table v-model="tableData">
                <base-table-column label="姓名" prop="name"></base-table-column>
                <base-table-column label="性别" prop="sex"></base-table-column>
                <base-table-column label="年龄" prop="age"></base-table-column>
            </base-table>
        </template>
        <template #attr>
            <the-base-table :data="tableAttr"></the-base-table>
        </template>
        <template #sets>
            <the-base-table :data="tableSets"></the-base-table>
        </template>
        <template #slot>
            <the-base-table-slot :data="tableSlot"></the-base-table-slot>
        </template>
    </the-base-layout>
</template>
<style scoped></style>