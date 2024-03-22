<script setup lang="ts">
const step: string = `let pageNum = ref<TsPagination.Current>(1);
let pageSize = ref<TsPagination.Size>(10);
let pageTotal = ref<TsPagination.Total>(300);
function onSearch(params: TsPagination.Change) {
    // do something
    console.log("params",params)
}`;
const template: string = `<base-pagination v-model:currentPage="pageNum" v-model:pageSize="pageSize" :total="pageTotal" @change="onSearch"></base-pagination>`;
let pageNum = ref<TsPagination.Current>(1);
let pageSize = ref<TsPagination.Size>(10);
let pageTotal = ref<TsPagination.Total>(30);
function onSearch(params: TsPagination.Change) {
    // do something
    console.log("params",params)
}

const tableAttr: TsTheBaseTable.Model = [
    {
        key: "v-model:currentPage",
        explain: "绑定页码",
        dataType: "number",
        required: true,
        default: "",
        optional: "",
    },{
        key: "v-model:pageSize",
        explain: "绑定页数",
        dataType: "number",
        required: true,
        default: "",
        optional: "",
    },{
        key: "total",
        explain: "总数",
        dataType: "number",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsPagination.Sets",
        required: false,
        default: "",
        optional: "",
    },{
        key: "@change",
        explain: "页码、页数切换回调",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(params: TsPagination.Change) => void",
    }
];
const tableSets: TsTheBaseTable.Model = [
    {
        key: "pageSizes",
        explain: "页数项",
        dataType: "number[]",
        required: false,
        default: "[5, 10, 20, 50, 100, 200]",
        optional: "",
    },{
        key: "small",
        explain: "小型分页样式",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "background",
        explain: "分页按钮添加背景色",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "layout",
        explain: "组件布局，子组件名用逗号分隔",
        dataType: "string",
        required: false,
        default: "total, sizes, prev, pager, next, jumper",
        optional: "sizes, prev, pager, next, jumper, ->, total, slot",
    },{
        key: "pagerCount",
        explain: "设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠",
        dataType: "number",
        required: false,
        default: "7",
        optional: "",
    },{
        key: "prevText",
        explain: "上一页文字",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "prevIcon",
        explain: "上一页的图标，比 prevText 优先级更高",
        dataType: "string",
        required: false,
        default: "",
        optional: "Icons",
    },{
        key: "nextText",
        explain: "下一页文字",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "nextIcon",
        explain: "下一页的图标， 比 nextText 优先级更高",
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
        key: "hideOnSinglePage",
        explain: "只有一页时是否隐藏",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/pagination.html">
        <template #view>
            <base-pagination v-model:currentPage="pageNum" v-model:pageSize="pageSize" :total="pageTotal" @change="onSearch"></base-pagination>
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