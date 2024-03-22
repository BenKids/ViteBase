<script setup lang="ts">
const step: string = '';
const template: string = `<base-button label="按钮"></base-button>`;
const tableAttr: TsTheBaseTable.Model = [
    {
        key: "label",
        explain: "按钮文本",
        dataType: "TsButton.Label",
        required: false,
        default: "",
        optional: "string",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsButton.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets: TsTheBaseTable.Model = [
    {
        key: "icon",
        explain: "图标",
        dataType: "string",
        required: false,
        default: "",
        optional: "Icons",
    },{
        key: "type",
        explain: "类型",
        dataType: "enum",
        required: false,
        default: "primary",
        optional: "primary / success / warning / danger / info",
    },{
        key: "plain",
        explain: "朴素按钮",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "text",
        explain: "文字按钮",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "loading",
        explain: "加载中状态",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "block",
        explain: "块按钮",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "link",
        explain: "链接按钮",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "circle",
        explain: "圆形按钮",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "round",
        explain: "圆角按钮",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "disabled",
        explain: "禁用状态",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "size",
        explain: "尺寸大小",
        dataType: "enum",
        required: false,
        default: "small",
        optional: "default / large / small",
    },{
        key: "color",
        explain: "按钮颜色",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/button.html">
        <template #view>
            <base-button label="按钮"></base-button>
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