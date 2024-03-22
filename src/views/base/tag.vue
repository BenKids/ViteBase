<script setup lang="ts">
const step:string = ``;
const template:string = ``;
const tagActive1 = ref<TsTag.Model>("item1");
const tagActive2 = ref<TsTag.Model>("item2");
const tagActive3 = ref<TsTag.Model>("item3");
const optTag = reactive<TsTag.Options>([
    {
        "value": "item1",
        "label": "标签1",
    },
    {
        "value": "item2",
        "label": "标签2",
        type: "success"
    },
    {
        "value": "item3",
        "label": "标签3",
        type: "danger"
    }
]);
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值",
        dataType: "TsTag.Model",
        required: true,
        default: "",
        optional: "string / number",
    },{
        key: "options",
        explain: "配置",
        dataType: "TsTag.Options",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsTag.Sets",
        required: false,
        default: "",
        optional: "",
    },{
        key: "modality",
        explain: "类型配置，此配置会覆盖options中的type",
        dataType: "TsGen.Modality",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "type",
        explain: "统一设置类型，优先级：modality > option的类型配置 > sets类型设置",
        dataType: "enum",
        required: false,
        default: "primary",
        optional: "primary / success / warning / danger / info / text",
    },{
        key: "closable",
        explain: "可关闭",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "size",
        explain: "尺寸大小",
        dataType: "enum",
        required: false,
        default: "",
        optional: "default / large / small",
    },{
        key: "effect",
        explain: "主题",
        dataType: "enum",
        required: false,
        default: "",
        optional: "dark / light / plain",
    },{
        key: "color",
        explain: "背景色",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "hit",
        explain: "是否有边框描边",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "round",
        explain: "圆形",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="">
        <template #view>
            <base-tag v-model="tagActive1" :options="optTag"></base-tag>
            <base-tag v-model="tagActive2" :options="optTag"></base-tag>
            <base-tag v-model="tagActive3" :options="optTag"></base-tag>
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