<script setup lang="ts">
const step:string = `let switchModel = ref<TsSwitch.Model>(true);`;
const template:string = `<base-switch v-model="switchModel"></base-switch>`;
let switchModel = ref<TsSwitch.Model>(true);
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值",
        dataType: "TsSwitch.Model",
        required: true,
        default: "",
        optional: "boolean / string / number",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsSwitch.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "size",
        explain: "尺寸大小",
        dataType: "enum",
        required: false,
        default: "",
        optional: "default / large / small",
    },{
        key: "colorOn",
        explain: "当在 on 状态时的背景颜色",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "colorOff",
        explain: "off 状态时的背景颜色",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "width",
        explain: "switch 的宽度",
        dataType: "number / string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "activeText",
        explain: "switch 打开时的文字描述",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "inactiveText",
        explain: "switch 的状态为 off 时的文字描述",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "activeIcon",
        explain: "switch 状态为 on 时所显示图标，设置此项会忽略 activeText",
        dataType: "string",
        required: false,
        default: "",
        optional: "Icons",
    },{
        key: "inactiveIcon",
        explain: "switch 状态为 off 时所显示图标，设置此项会忽略 inactiveText",
        dataType: "string",
        required: false,
        default: "",
        optional: "Icons",
    },{
        key: "activeValue",
        explain: "switch 状态为 on 时的值",
        dataType: "TsSwitch.Model",
        required: false,
        default: "boolean",
        optional: "boolean / string / number",
    },{
        key: "inactiveValue",
        explain: "switch的状态为 off 时的值",
        dataType: "TsSwitch.Model",
        required: false,
        default: "boolean",
        optional: "boolean / string / number",
    },{
        key: "inlinePrompt",
        explain: "无论图标或文本是否显示在点内，只会呈现文本的第一个字符",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/switch.html">
        <template #view>
            <base-switch v-model="switchModel"></base-switch>
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