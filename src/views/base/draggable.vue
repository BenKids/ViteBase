<script setup lang="ts">
const step:string = ``;
const template:string = `<base-draggable>
    <template #handle>
        <base-button label="拖拽"></base-button>
    </template>
    <div>这里是内容，跟随一起动</div>
</base-draggable>`;
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "sets",
        explain: "参数设置",
        dataType: "TsDraggble.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "x",
        explain: "x坐标",
        dataType: "number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "y",
        explain: "y坐标",
        dataType: "number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "disabled",
        explain: "禁用",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://www.vueusejs.com/core/useDraggable/">
        <template #view>
            看浮动的盒子
            <base-draggable>
                <template #handle>
                    <base-button label="拖拽"></base-button>
                </template>
                <div>这里是内容，跟随一起动</div>
            </base-draggable>
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