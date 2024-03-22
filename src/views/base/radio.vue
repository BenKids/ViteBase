<script setup lang="ts">
const step:string = `let radio = ref<TsRadio.Model>("item1");
let optRadio = reactive<TsRadio.Options>([
  {
    label: "选项1",
    value: "item1",
  },{
    label: "选项2",
    value: "item2",
  }
])`;
const template:string = `<base-radio v-model="radio" :options="optRadio"></base-radio>`;
let radio = ref<TsRadio.Model>("item1");
let optRadio = reactive<TsRadio.Options>([
    {
        label: "选项1",
        value: "item1",
    },{
        label: "选项2",
        value: "item2",
    }
])
const sets:TsRadio.Sets = {
    type: "button"
}
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值",
        dataType: "TsRadio.Model",
        required: true,
        default: "",
        optional: "",
    },{
        key: "options",
        explain: "配置",
        dataType: "TsRadio.Options",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsRado.Sets",
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
    },{
        key: "badge",
        explain: "徽章,SetsRadio的type为button时生效",
        dataType: "number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "徽章设置",
        dataType: "TsBadge.Sets",
        required: false,
        default: "",
        optional: "",
    }
]
const tableSets:TsTheBaseTable.Model = [
    {
        key: "type",
        explain: "类型",
        dataType: "enum",
        required: false,
        default: "",
        optional: "button",
    },{
        key: "size",
        explain: "尺寸大小",
        dataType: "enum",
        required: false,
        default: "default",
        optional: "default / large / small",
    },{
        key: "disabled",
        explain: "禁用",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "textColor",
        explain: "button文本颜色",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "border",
        explain: "是否显示边框",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "fill",
        explain: "button激活时填充色",
        dataType: "string",
        required: false,
        default: "#409EFF",
        optional: "",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/radio.html">
        <template #view>
            <base-radio v-model="radio" :options="optRadio"></base-radio>
            <br>
            <br>
            <base-radio v-model="radio" :options="optRadio" :sets="sets"></base-radio>
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