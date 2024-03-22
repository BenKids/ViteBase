<script setup lang="ts">
const step:string = `let model = ref<TsDatePicker.Model>("")`;
const template:string = `<base-date-picker v-model="model"></base-date-picker>`;
let model = ref<TsDatePicker.Model>("");
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值",
        dataType: "TsDatePicker.Model",
        required: true,
        default: "",
        optional: "string / string[]",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsDatePicker.Sets",
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
        default: "date",
        optional: "year / month / monthrange / datetime / datetimerange / date / dates / daterange",
    },{
        key: "format",
        explain: "数据格式",
        dataType: "enum",
        required: false,
        default: "YYYY-MM-DD",
        optional: "YYYY-MM-DD hh:mm:ss / YYYY-MM-DD hh:mm / YYYY-MM-DD / YYYY-MM / MM-DD / hh:mm:ss / mm:ss",
    },{
        key: "readonly",
        explain: "只读",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "disabled",
        explain: "禁用",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "size",
        explain: "尺寸大小",
        dataType: "enum",
        required: false,
        default: "default",
        optional: "default / large / small",
    },{
        key: "editable",
        explain: "可输入",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "clearable",
        explain: "可清空",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "placeholder",
        explain: "占位文本",
        dataType: "string",
        required: false,
        default: "请选择",
        optional: "",
    },{
        key: "startPlaceholder",
        explain: "范围选择时，开始日期占位文本",
        dataType: "string",
        required: false,
        default: "开始日期",
        optional: "",
    },{
        key: "endPlaceholder",
        explain: "范围选择时，结束日期占位文本",
        dataType: "string",
        required: false,
        default: "结束日期",
        optional: "",
    },{
        key: "prefixIcon",
        explain: "图标",
        dataType: "string",
        required: false,
        default: "",
        optional: "Icons",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/date-picker.html">
        <template #view>
            <base-date-picker v-model="model"></base-date-picker>
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