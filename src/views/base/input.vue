<script setup lang="ts">
const step:string = `let input = ref<TsInput.Model>("");`;
const template:string = `<base-input v-model="input"></base-input>`;
let input = ref<TsInput.Model>("");
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值",
        dataType: "TsInput.Model",
        required: true,
        default: "",
        optional: "string / number",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsInput.Sets",
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
        default: "text",
        optional: "text / textarea / search / number / password",
    },{
        key: "maxlength",
        explain: "最大输入长度",
        dataType: "number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "minlength",
        explain: "最小输入长度",
        dataType: "number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "showWordLimit",
        explain: "显示统计字数",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "placeholder",
        explain: "占位文本",
        dataType: "string",
        required: false,
        default: "请输入",
        optional: "",
    },{
        key: "showPassword",
        explain: "显示切换密码图标",
        dataType: "boolean",
        required: false,
        default: "type为password时为true",
        optional: "true / false",
    },{
        key: "clearable",
        explain: "清除按钮",
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
        key: "prefixIcon",
        explain: "自定义前缀图标",
        dataType: "string",
        required: false,
        default: "",
        optional: "Icons",
    },{
        key: "suffixIcon",
        explain: "自定义后缀图标",
        dataType: "string",
        required: false,
        default: "",
        optional: "Icons",
    },{
        key: "rows",
        explain: "textarea输入框行数",
        dataType: "number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "autosize",
        explain: "textarea自适应高度",
        dataType: "boolean | { minRows: number; maxRows: number }",
        required: false,
        default: "true",
        optional: "",
    },{
        key: "readonly",
        explain: "只读",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "readonlyPlaceholder",
        explain: "只读的占位文本",
        dataType: "string",
        required: false,
        default: "暂无数据",
        optional: "",
    },{
        key: "resize",
        explain: "控制是否能被用户缩放",
        dataType: "enum",
        required: false,
        default: "",
        optional: "none / both / horizontal / vertical",
    },{
        key: "autofocus",
        explain: "自动获取焦点",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "min",
        explain: "设置最小值",
        dataType: "number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "max",
        explain: "设置最大值",
        dataType: "number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "size",
        explain: "输入框尺寸，只在 type 不为 'textarea' 时有效",
        dataType: "enum",
        required: false,
        default: "default",
        optional: "default / large / small",
    },{
        key: "showTooltip",
        explain: "只读状态下，内容超出时hover展示全部文本",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/input.html">
        <template #view>
            <base-input v-model="input"></base-input>
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