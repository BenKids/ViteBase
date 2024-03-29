<script setup lang="ts">
const step:string = `let data = reactive<TsDescriptions.Model>({
    item1: 111,
    item2: 222,
    item3: 333,
});
let optData = reactive<TsDescriptions.Options<TsDescriptions.Model>>([
    {
        label: "项目1",
        prop: "item1",
    },{
        label: "项目2",
        prop: "item2",
    },{
        label: "项目3",
        prop: "item3",
    },
]);`;
const template:string = `<base-descriptions v-model="data" :options="optData"></base-descriptions>`;
let data = reactive<TsDescriptions.Model>({
    item1: 111,
    item2: 222,
    item3: 333,
});
let optData = reactive<TsDescriptions.Options<TsDescriptions.Model>>([
    {
        label: "项目1",
        prop: "item1",
    },{
        label: "项目2",
        prop: "item2",
    },{
        label: "项目3",
        prop: "item3",
    },
]);
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定数据",
        dataType: "TsDescriptions.Model",
        required: true,
        default: "",
        optional: "",
    },{
        key: "options",
        explain: "配置",
        dataType: "TsDescriptions.Options",
        required: true,
        default: "",
        optional: "",
    },{
        key: "title",
        explain: "标题",
        dataType: "TsDescriptions.Title",
        required: false,
        default: "",
        optional: "string",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsDescriptions.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableOptions:TsTheBaseTable.Model = [
    {
        key: "prop",
        explain: "匹配值",
        dataType: "string",
        required: true,
        default: "",
        optional: "",
    },{
        key: "label",
        explain: "数据名称",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "align",
        explain: "文本对齐方式",
        dataType: "enum",
        required: false,
        default: "left",
        optional: "left / center / right",
    },{
        key: "labelAlign",
        explain: "名称对齐方式",
        dataType: "enum",
        required: false,
        default: "left",
        optional: "left / center / right",
    },{
        key: "labelWidth",
        explain: "当前列名称所占宽度，同一列以最后一格为准",
        dataType: "string / number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "span",
        explain: "当前列所占位置列数",
        dataType: "number",
        required: false,
        default: "1",
        optional: "",
    },{
        key: "minWidth",
        explain: "当前列最小宽度",
        dataType: "string / number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "icon",
        explain: "当前格子图标",
        dataType: "string",
        required: false,
        default: "",
        optional: "Icons",
    }
]
const tableSets:TsTheBaseTable.Model = [
    {
        key: "column",
        explain: "每行格子数",
        dataType: "number",
        required: false,
        default: "3",
        optional: "",
    },{
        key: "direction",
        explain: "排列方向",
        dataType: "enum",
        required: false,
        default: "horizontal",
        optional: "vertical / horizontal",
    },{
        key: "size",
        explain: "尺寸大小",
        dataType: "enum",
        required: false,
        default: "default",
        optional: "default / large / small",
    },{
        key: "border",
        explain: "边框",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "align",
        explain: "对齐方式",
        dataType: "enum",
        required: false,
        default: "left",
        optional: "left / center / right",
    },{
        key: "labelAlign",
        explain: "名称对齐方式",
        dataType: "enum",
        required: false,
        default: "left",
        optional: "left / center / right",
    },{
        key: "labelWidth",
        explain: "统一设置label宽度",
        dataType: "string | number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "minWidth",
        explain: "统一设置列最小宽度",
        dataType: "string | number",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSlot:TsTheBaseTableSlot.Model = [
    {
        key: "参数名Label",
        explain: "对应参数的label插槽"
    },{
        key: "参数名Value",
        explain: "对应参数的value插槽"
    }
]
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element.eleme.cn/#/zh-CN/component/descriptions">
        <template #view>
            <base-descriptions v-model="data" :options="optData"></base-descriptions>
        </template>
        <template #attr>
            <the-base-table :data="tableAttr"></the-base-table>
        </template>
        <template #options>
            <the-base-table :data="tableOptions"></the-base-table>
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