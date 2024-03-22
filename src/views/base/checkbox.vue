<script setup lang="ts">
const model: string = `["item1"]`;
const opt: string = `[
  {
    "label": "选项1",
    "value": "item1"
  },{
    "label": "选项2",
    "value": "item2"
  }
]`
const step: string = `let checkbox = ref<TsCheckbox.Model>(${model});
let optCheckbox = reactive<TsCheckbox.Options>(${opt});`;
const template: string = `<base-checkbox v-model="checkbox" :options="optCheckbox"></base-checkbox>`;
const setsCheckbox:TsCheckbox.Sets = {
    type: "button"
}
let checkbox = ref<TsCheckbox.Model>(JSON.parse(model));
let optCheckbox = reactive<TsCheckbox.Options>(JSON.parse(opt));
const tableAttr: TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值",
        dataType: "TsCheckbox.Model",
        required: true,
        default: "",
        optional: "string[] / number[]",
    },{
        key: "options",
        explain: "配置",
        dataType: "TsCheckbox.Sets",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsCheckbox.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableOptions: TsTheBaseTable.Model = [
    {
        key: "value",
        explain: "值",
        dataType: "string / number",
        required: true,
        default: "",
        optional: "",
    },{
        key: "label",
        explain: "展示文本",
        dataType: "string",
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
    },{
        key: "border",
        explain: "sets中type为button时，是否展示边框",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
]
const tableSets: TsTheBaseTable.Model = [
    {
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
        explain: "文本颜色",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "type",
        explain: "类型",
        dataType: "enum",
        required: false,
        default: "",
        optional: "button",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/checkbox.html">
        <template #view>
            <base-checkbox v-model="checkbox" :options="optCheckbox"></base-checkbox>
            <br>
            <base-checkbox v-model="checkbox" :options="optCheckbox" :sets="setsCheckbox"></base-checkbox>
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