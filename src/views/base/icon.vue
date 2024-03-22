<script setup lang="ts">
const step:string = `const iconSets:TsIcons.Sets = {
    size: 28,
    color: "var(--base-color-primary)",
}
const icon = IconSolarGalleryMinimalisticBroken;`;
const template:string = `<base-icons :icon="icon" :sets="iconSets"></base-icons>`;
const iconSets:TsIcons.Sets = {
    size: 28,
    color: "var(--base-color-primary)",
}
const icon = IconSolarGalleryMinimalisticBroken;
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "icon",
        explain: "图标",
        dataType: "TsIcons.Icon",
        required: true,
        default: "",
        optional: "Icons",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsIcons.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "color",
        explain: "图标颜色",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "size",
        explain: "图标大小",
        dataType: "number",
        required: false,
        default: "",
        optional: "",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://icones.js.org">
        <template #view>
            <base-icons :icon="icon" :sets="iconSets"></base-icons>
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