<script setup lang="ts">
const step:string = `let editValue = ref<TsEdit.Model>("");`;
const template:string = `<base-edit v-model="editValue"></base-edit>`;
let editValue = ref<TsEdit.Model>("");
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定数据",
        dataType: "TsEdit.Model",
        required: true,
        default: "",
        optional: "string",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsEdit.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "placeholder",
        explain: "占位文本",
        dataType: "string",
        required: false,
        default: "请输入内容...",
        optional: "",
    },{
        key: "readonly",
        explain: "只读",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://www.wangeditor.com/v5/">
        <template #view>
            <base-edit v-model="editValue"></base-edit>
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