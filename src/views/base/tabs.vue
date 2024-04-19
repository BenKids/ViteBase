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
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值，当前激活，options中的label值",
        dataType: "TsTabs.Model",
        required: true,
        default: "",
        optional: "",
    },{
        key: "options",
        explain: "配置",
        dataType: "TsTabs.Options",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsTabs.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableOptions:TsTheBaseTable.Model = [
    {
        key: "label",
        explain: "展示文本",
        dataType: "string",
        required: true,
        default: "",
        optional: "",
    },{
        key: "value",
        explain: "参数值",
        dataType: "string | number",
        required: true,
        default: "",
        optional: "",
    },{
        key: "icon",
        explain: "图标",
        dataType: "string",
        required: false,
        default: "",
        optional: "Icons",
    },{
        key: "disabled",
        explain: "禁用",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "closable",
        explain: "可关闭",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
]
const tableSets:TsTheBaseTable.Model = [
    {
        key: "type",
        explain: "样式类型",
        dataType: "enum",
        required: false,
        default: "",
        optional: "card / border-card",
    },{
        key: "icon",
        explain: "图标是否显示",
        dataType: "boolean",
        required: false,
        default: "",
        optional: "true / false",
    },{
        key: "closable",
        explain: "可关闭",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "tabPosition",
        explain: "位置",
        dataType: "enum",
        required: false,
        default: "",
        optional: "top / right / bottom / left",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="">
        <template #view>
            <base-tabs v-model="tabActive" :options="optTabs" :sets="{icon:true}"></base-tabs>
        </template>
        <template #attr>
            <the-base-table :data="tableAttr"></the-base-table>
        </template>
        <template #options>
            <the-base-table :data="tableOptions"></the-base-table>
        </template>
        <template #sets>
            <the-base-table :data="tableSets"></the-base-table>
        </template>
    </the-base-layout>
</template>
<style scoped></style>