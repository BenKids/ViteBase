<script setup lang="ts">
const step:string = `let tabActive = ref<TsTabs.Model>("item1");
const optTabs = reactive<TsTabs.Options>([
    {
        "value": "item1",
        "label": "标签1"
    },
    {
        "value": "item2",
        "label": "标签2"
    },
    {
        "value": "item3",
        "label": "标签3"
    }
]);`;
const template:string = `<base-tabs v-model="tabActive" :options="optTabs"></base-tabs>`;
let tabActive = ref<TsTabs.Model>("item1");
const optTabs = reactive<TsTabs.Options>([
    {
        value: "item1",
        label: "标签1"
    },
    {
        value: "item2",
        label: "标签2",
        icon: shallowRef(IconSolarAccessibilityLinear),
    },
    {
        value: "item3",
        label: "标签3"
    }
]);
const tableAttr:TsTheBaseTable.Model = [];
const tableSets:TsTheBaseTable.Model = [];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="">
        <template #view>
            <base-tabs v-model="tabActive" :options="optTabs" :sets="{icon:true}"></base-tabs>
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