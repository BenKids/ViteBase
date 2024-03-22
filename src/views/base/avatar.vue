<script setup lang="ts">
const template = '<base-avatar v-model="src"></base-avatar>';
const step = 'const src = evAssets("image/avatar.jpg");'
const src = evAssets("image/avatar.jpg");
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "图片链接（和文字头像二选一）",
        dataType: "TsAvatar.Model",
        required: false,
        default: "",
        optional: "",
    },{
        key: "label",
        explain: "文字头像（和图片链接二选一）",
        dataType: "TsAvatar.Label",
        required: false,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsAvatar.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "icon",
        explain: "图标",
        dataType: "TsGen.Icon",
        required: false,
        default: "",
        optional: "",
    },{
        key: "size",
        explain: "大小",
        dataType: "TsGen.Size",
        required: false,
        default: "default",
        optional: "string",
    },{
        key: "fit",
        explain: "当展示类型为图片的时候，设置图片如何适应容器",
        dataType: "TsGen.Fit",
        required: false,
        default: "cover",
        optional: "fill / contain / cover / none / scale-down",
    },{
        key: "shape",
        explain: "形状",
        dataType: "string",
        required: false,
        default: "circle",
        optional: "circle / square",
    },{
        key: "type",
        explain: "类型",
        dataType: "string / Types",
        required: false,
        default: "primary",
        optional: "primary / success / warning / danger / info / black",
    }
]
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/avatar.html">
        <template #view>
            <div class="view-box">
                <base-avatar v-model="src"></base-avatar>
                <base-avatar label="头像"></base-avatar>
            </div>
        </template>
        <template #attr>
            <the-base-table :data="tableAttr"></the-base-table>
        </template>
        <template #sets>
            <the-base-table :data="tableSets"></the-base-table>
        </template>
    </the-base-layout>
</template>
<style scoped>
    .view-box {
        display: flex;
        align-items: center;
        gap: var(--base-gap);
    }
</style>