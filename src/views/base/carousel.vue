<script setup lang="ts">
const carouselData = reactive<TsCarousel.Model>([
    {
        label: "内容1",
        // ...
    },{
        label: "内容2",
        // ...
    }
])
const step:string = `const optCarousel = reactive<TsCarousel.Options>([
  {
    label: "内容1",
    // ...
  },{
    label: "内容2",
    // ...
  }
])`;
const template:string = `<base-carousel v-model="carouselData">
  <template #default="scope">{{ scope.option }}</template>
</base-carousel>`;
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "数据",
        dataType: "TsCarousel.Model",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsCarousel.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "initialIndex",
        explain: "初始展示索引值",
        dataType: "number",
        required: false,
        default: "0",
        optional: "",
    },{
        key: "height",
        explain: "高度",
        dataType: "number",
        required: false,
        default: "150",
        optional: "",
    },{
        key: "trigger",
        explain: "指示器触发方式",
        dataType: "enum",
        required: false,
        default: "hover",
        optional: "hover / click",
    },{
        key: "autoplay",
        explain: "自动切换",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "interval",
        explain: "自动切换间隔时间，单位毫秒",
        dataType: "number",
        required: false,
        default: "3000",
        optional: "",
    },{
        key: "indicatorPosition",
        explain: "指示器的位置",
        dataType: "enum",
        required: false,
        default: "none",
        optional: "none / outside",
    },{
        key: "arrow",
        explain: "切换箭头的显示时机",
        dataType: "enum",
        required: false,
        default: "hover",
        optional: "always / hover / never",
    },{
        key: "type",
        explain: "类型",
        dataType: "enum",
        required: false,
        default: "",
        optional: "card",
    },{
        key: "loop",
        explain: "是否循环显示",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true",
    },{
        key: "direction",
        explain: "滚动方向",
        dataType: "enum",
        required: false,
        default: "horizontal",
        optional: "horizontal / vertical",
    },{
        key: "pauseOnHover",
        explain: "鼠标悬浮时暂停自动切换",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/carousel.html" class="page-components-carousel">
        <template #view>
            <base-carousel v-model="carouselData">
                <template #default="scope">{{ scope.option }}</template>
            </base-carousel>
        </template>
        <template #attr>
            <the-base-table :data="tableAttr"></the-base-table>
        </template>
        <template #sets>
            <the-base-table :data="tableSets"></the-base-table>
        </template>
    </the-base-layout>
</template>
<style scoped>
.page-components-carousel :deep(.el-carousel__item) {
    color: var(--base-color-white);
    background-color: var(--base-bgc-menu);
}
</style>