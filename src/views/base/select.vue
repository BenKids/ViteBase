<script setup lang="ts">
import TheBaseTable from "@/components/baseHandlebook/TheBaseTable.vue";

const step:string = `
let select = ref<TsSelect.Model>("item1");
let optSelect = reactive<TsSelect.Options>([
  {
    label: "选项1",
    value: "item1",
  },{
    label: "选项2选项2选项2选项2选项2选项2选项2选项2",
    value: "item2",
  }
])`;
const template:string = `<base-select v-model="select" :options="optSelect"></base-select>`;
let select = ref<TsSelect.Model>("item1");
let optSelect = reactive<TsSelect.Options>([
    {
        label: "选项1",
        value: "item1",
    },{
        label: "选项2选项2选项2选项2选项2选项2选项2选项2",
        value: "item2",
    }
])
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值",
        dataType: "TsSelect.Model",
        required: true,
        default: "",
        optional: "string / string[]",
    },{
        key: "options",
        explain: "配置",
        dataType: "TsSelect.Options",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsSelect.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableOptions:TsTheBaseTable.Model = [
    {
        key: "value",
        explain: "参数值",
        dataType: "string / number",
        required: true,
        default: "",
        optional: "",
    },{
        key: "label",
        explain: "展示文本",
        dataType: "string / number",
        required: true,
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
const tableSets:TsTheBaseTable.Model = [
    {
        key: "showTooltip",
        explain: "超出展示",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },
    {
        key: "placeholder",
        explain: "占位文本",
        dataType: "string",
        required: false,
        default: "请选择",
        optional: "",
    },{
        key: "multiple",
        explain: "多选，多选时绑定值要为数组",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "disabled",
        explain: "禁用",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "size",
        explain: "尺寸大小",
        dataType: "enum",
        required: false,
        default: "default",
        optional: "default / large / small",
    },{
        key: "clearable",
        explain: "可清空",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "collapseTags",
        explain: "多选时是否将选中值按文字的形式展示",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "maxCollapseTags",
        explain: "需要显示的 Tag 的最大数量 只有当 collapseTags 设置为 true 时才会生效。",
        dataType: "number",
        required: false,
        default: "1",
        optional: "",
    },{
        key: "collapseTagsTooltip",
        explain: "鼠标悬停于折叠标签的文本时,显示所有选中的标签,collapseTags属性必须设定为 true",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "multipleLimit",
        explain: "多选场景下用户最多可以选择的项目数，0为不限制",
        dataType: "number",
        required: false,
        default: "0",
        optional: "",
    },{
        key: "filterable",
        explain: "筛选",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "loading",
        explain: "加载中",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "loadingText",
        explain: "加载时显示的文本",
        dataType: "string",
        required: false,
        default: "加载中",
        optional: "",
    },{
        key: "noMatchText",
        explain: "无匹配时显示的文字",
        dataType: "string",
        required: false,
        default: "无匹配数据",
        optional: "",
    },{
        key: "noDataText",
        explain: "无选项时显示的文字",
        dataType: "string",
        required: false,
        default: "无数据",
        optional: "",
    },{
        key: "tagType",
        explain: "标签类型",
        dataType: "TsGen.Types",
        required: false,
        default: "primary",
        optional: "primary / success / warning / danger / info",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/select.html">
        <template #view>
            <base-select v-model="select" :options="optSelect"></base-select>
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