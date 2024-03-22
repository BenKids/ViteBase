<script setup lang="ts">
const step = 'let badge = ref<TsBadge.Model>(123);';
const template = `<base-badge v-model="badge">
  <base-button label="徽章"></base-button>
</base-badge>`;
let badge = ref<TsBadge.Model>(123);
const tableAttr: TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "展示的数字/文本",
        dataType: "TsBadge.Model",
        required: true,
        default: "",
        optional: "string / number",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsBadge.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets: TsTheBaseTable.Model = [
    {
        key: "max",
        explain: "最大值，超过最大值会显示 {max}+。 只有当 label 是数字类型时起作用。",
        dataType: "number",
        required: false,
        default: "",
        optional: "number",
    },{
        key: "isDot",
        explain: "是否显示小圆点",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "type",
        explain: "类型",
        dataType: "TsGne.Types",
        required: false,
        default: "danger",
        optional: "primary / success / warning / danger / info",
    }
];
</script>
<template>
  <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/tag.html">
    <template #view>
      <base-badge v-model="badge">
        <base-button label="徽章"></base-button>
      </base-badge>
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