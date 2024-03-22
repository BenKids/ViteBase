<script setup lang="ts">
const step:string = ``;
const template:string = `<base-empty label="这里什么都没有"></base-empty>`;
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "label",
        explain: "提示文本",
        dataType: "TsEmpty.Label",
        required: false,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsEmpty.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "image",
        explain: "自定义图片",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "imageSize",
        explain: "图片尺寸",
        dataType: "number",
        required: false,
        default: "160",
        optional: "",
    }
];
const tableSlot:TsTheBaseTableSlot.Model = [
    {
        key: "",
        explain: "默认插槽，可以在此添加一些自定义内容",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/empty.html">
        <template #view>
            <base-empty label="这里什么都没有"></base-empty>
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