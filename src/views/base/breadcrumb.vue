<script setup lang="ts">
const sets:TsBreadcrumb.Sets = {
  separatorIcon: IconSolarDoubleAltArrowRightLineDuotone,
}
let optBreadcrumb = reactive<TsBreadcrumb.Options>([
  {
    "label": "组件手册",
    "toName": "Base"
  },{
    "label": "提示",
    "toName": "Alert"
  }
])
const step:string = `let optBreadcrumb = reactive<TsBreadcrumb.Options>([
  {
    "label": "组件手册",
    "toName": "Base"
  },{
    "label": "提示",
    "toName": "Alert"
  }
])`;
const template:string = `<base-breadcrumb :options="optBreadcrumb"></base-breadcrumb>`;
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "options",
        explain: "配置",
        dataType: "TsBreadcrumb.Options",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsBreadcrumb.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableOptions:TsTheBaseTable.Model = [
  {
      key: "toName",
      explain: "要跳转的页面的Name",
      dataType: "string",
      required: true,
      default: "",
      optional: "",
  },{
      key: "label",
      explain: "展示的文本",
      dataType: "string",
      required: true,
      default: "",
      optional: "",
  }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "separator",
        explain: "分割符文本",
        dataType: "string",
        required: false,
        default: "/",
        optional: "string",
    },{
        key: "separatorIcon",
        explain: "分割符ICON",
        dataType: "string",
        required: false,
        default: "",
        optional: "Icons",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/breadcrumb.html">
        <template #view>
          <base-breadcrumb :options="optBreadcrumb"></base-breadcrumb>
          <br>
          <base-breadcrumb :options="optBreadcrumb" :sets="sets"></base-breadcrumb>
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
<style scoped>

</style>