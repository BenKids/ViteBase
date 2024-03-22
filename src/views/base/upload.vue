<link rel="stylesheet" href="../../../../../其他/vite-typescript/src/assets/css/theme.css">
<script setup lang="ts">
const step:string = `const upload = ref<TsUpload.Model>([]);`;
const template:string = `<base-upload v-model="upload"></base-upload>`;
const upload = ref<TsUpload.Model>([]);
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值",
        dataType: "TsUpload.Model",
        required: true,
        default: "",
        optional: "string[]",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsUpload.Sets",
        required: false,
        default: "",
        optional: "",
    },{
        key: "@beforeSelect",
        explain: "选择文件前的拦截，启用此方法需要将sets.beforeSelect设置为true",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(done) => void",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "limit",
        explain: "上传数量限制",
        dataType: "number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "beforeSelect",
        explain: "选择文件时拦截，调用@beforeSelect方法",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "drag",
        explain: "拖拽上传",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "multiple",
        explain: "文件多选",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "accept",
        explain: "接受上传的文件类型",
        dataType: "string[]",
        required: false,
        default: "",
        optional: "",
    },{
        key: "showFileList",
        explain: "显示已上传文件列表",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "disabled",
        explain: "禁用",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "listType",
        explain: "类型",
        dataType: "enum",
        required: false,
        default: "picture-card",
        optional: "text / picture-card / picture",
    },{
        key: "placeholder",
        explain: "占位文本",
        dataType: "string",
        required: false,
        default: "将文件拖到此处或点击上传",
        optional: "",
    },{
        key: "action",
        explain: "请求url",
        dataType: "string",
        required: false,
        default: "#",
        optional: "",
    },{
        key: "autoUpload",
        explain: "自动上传文件，和action一起使用",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="">
        <template #view>
            <base-upload v-model="upload"></base-upload>
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