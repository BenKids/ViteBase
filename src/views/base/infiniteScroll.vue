<script setup lang="ts">
const step:string = `let scroll = reactive<TsInfiniteScroll.Model>([]);
function onScroll(stop: TsInfiniteScroll.Stop,finish: TsInfiniteScroll.Finish) {
    setTimeout(() => {
        scroll.push({
            a: 1,
            b: 2,
        })
        if(scroll.length > 50) {
            finish();
        } else {
            stop();
        }
    }, 300);
}`;
const template:string = `<base-infinite-scroll v-model="scroll" @load="onScroll">
    <template #item="scope">{{scope}}</template>
</base-infinite-scroll>`;
let scroll = reactive<TsInfiniteScroll.Model>([]);
function onScroll(stop: TsInfiniteScroll.Stop,finish: TsInfiniteScroll.Finish) {
    setTimeout(() => {
        scroll.push({
            a: 1,
            b: 2,
        })
        if(scroll.length > 50) {
            finish();
        } else {
            stop();
        }
    }, 300);
}
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定数据",
        dataType: "TsInfiniteScroll.Model",
        required: true,
        default: "",
        optional: "",
    },{
        key: "@load",
        explain: "加载规则",
        dataType: "Function",
        required: true,
        default: "",
        optional: "() => void",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsInfiniteScroll.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "disabled",
        explain: "禁用",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "height",
        explain: "高度",
        dataType: "string",
        required: false,
        default: "300px",
        optional: "",
    },{
        key: "delay",
        explain: "节流时延",
        dataType: "number",
        required: false,
        default: "200",
        optional: "",
    },{
        key: "distance",
        explain: "触发加载的距离阈值，单位为px",
        dataType: "number",
        required: false,
        default: "0",
        optional: "",
    },{
        key: "immediate",
        explain: "是否立即执行加载方法，以防初始状态下内容无法撑满容器",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }
];
const tableSlot:TsTheBaseTableSlot.Model = [
    {
        key: "item",
        explain: "自定义内容",
    }
]
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/infinite-scroll.html">
        <template #view>
            <base-infinite-scroll v-model="scroll" @load="onScroll">
                <template #item="scope">{{scope}}</template>
            </base-infinite-scroll>
        </template>
        <template #attr>
            <the-base-table :data="tableAttr"></the-base-table>
        </template>
        <template #sets>
            <the-base-table :data="tableSets"></the-base-table>
        </template>
        <template #slot>
            <the-base-table-slot :data="tableSlot"></the-base-table-slot>
        </template>
    </the-base-layout>
</template>
<style scoped></style>