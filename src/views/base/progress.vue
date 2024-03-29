<script setup lang="ts">
const step:string = `let value = ref<TsProgress.Model>(23.35);`;
const template:string = `<base-progress v-model="value"></base-progress>`;
//ref 绑定数据
let value = ref<TsProgress.Model>(23.35);
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值",
        dataType: "TsProgress.Model",
        required: true,
        default: "",
        optional: "number",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsProgress.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "type",
        explain: "类型",
        dataType: "enum",
        required: false,
        default: "line",
        optional: "line / circle / dashboard",
    },{
        key: "strokeWidth",
        explain: "进度条的宽度",
        dataType: "number",
        required: false,
        default: "6",
        optional: "",
    },{
        key: "textInside",
        explain: "进度条显示文字内置在进度条内（只在 type=line 时可用）",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "status",
        explain: "状态",
        dataType: "enum",
        required: false,
        default: "",
        optional: "success / exception / warning",
    },{
        key: "indeterminate",
        explain: "是否为动画进度条",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "duration",
        explain: "控制动画进度条速度和条纹进度条流动速度",
        dataType: "number",
        required: false,
        default: "10",
        optional: "",
    },{
        key: "color",
        explain: "自定义颜色（会覆盖 status 状态颜色）",
        dataType: "string | Function | { color: string; percentage: number }[]",
        required: false,
        default: "",
        optional: "",
    },{
        key: "width",
        explain: "环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）",
        dataType: "number",
        required: false,
        default: "126",
        optional: "",
    },{
        key: "show-text",
        explain: "是否显示进度条文字内容",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "strokeLinecap",
        explain: "circle/dashboard 类型路径两端的形状",
        dataType: "enum",
        required: false,
        default: "",
        optional: "butt / round / square",
    },{
        key: "format",
        explain: "指定进度条文字内容",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(percentage: number) => string",
    },{
        key: "striped",
        explain: "在进度条上增加条纹，开启此功能会将indeterminate功能覆盖",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "stripedFlow",
        explain: "让进度条上的条纹流动起来",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="">
        <template #view>
            <base-progress v-model="value"></base-progress>
        </template>
        <template #attr>
            <the-base-table :data="tableAttr"></the-base-table>
        </template>
        <template #sets>
            <the-base-table :data="tableSets"></the-base-table>
        </template>
    </the-base-layout>
</template>
<style scoped></style>