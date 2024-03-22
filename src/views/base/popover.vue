<script setup lang="ts">
const step:string = ``;
const template:string = `<base-popover>
    <base-button label="hover显示"></base-button>
    <template #content>这里是popover内容</template>
</base-popover>`;
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "@load",
        explain: "加载数据，需要将sets中的load设置为true",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(stop:TsPopover.Stop) => void",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsPopover.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "trigger",
        explain: "触发方式",
        dataType: "enum",
        required: false,
        default: "hover",
        optional: "click / focus / hover / contentmenu",
    },{
        key: "title",
        explain: "标题",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "width",
        explain: "宽度",
        dataType: "string / number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "placement",
        explain: "出现位置",
        dataType: "enum",
        required: false,
        default: "bottom-start",
        optional: "top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/popconfirm.html">
        <template #view>
            <base-popover>
                <base-button label="hover显示"></base-button>
                <template #content>这里是popover内容</template>
            </base-popover>
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