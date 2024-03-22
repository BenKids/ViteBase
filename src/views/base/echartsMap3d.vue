<script setup lang="ts">
const step:string = `const map3dRef = ref();
let model = ref<TsEchartsMap3d.Model>(411500)
let data = reactive<TsEchartsMap3d.Data>({
    411522: {}
})
let options = reactive<TsEchartsMap3d.Options>({
    item1: {
        name: "数据一二二二二二",
        map: false,
        tooltip: true,
    },
    item2: {
        name: "数据二",
        map: true,
        tooltip: true,
    }
})
function onMap(params: TsEchartsMap3d.ClickParams, done: TsEchartsMap3d.Done) {
    console.log("[onMap]", params)
    done();
}
function onBack(params: TsEchartsMap3d.ClickParams, done: TsEchartsMap3d.Done) {
    console.log("[onBack]", params);
    done();
}
setTimeout(() => {
    data[411522] = {
        item1: 123,
        item2: 456
    }
    map3dRef.value.setOption();
}, 500);`;
const template:string = `<base-echarts-map3d ref="map3dRef" v-model="model" :data="data" :options="options" @click="onMap" @back="onBack"></base-echarts-map3d>`;
const setAlertTip:TsAlert.Sets = {
    closable: false,
    type: "info",
    showIcon: false,
}
const map3dRef = ref();
let model = ref<TsEchartsMap3d.Model>(411500)
let data = reactive<TsEchartsMap3d.Data>({
    411522: {}
})
let options = reactive<TsEchartsMap3d.Options>({
    item1: {
        name: "数据一二二二二二",
        map: false,
        tooltip: true,
    },
    item2: {
        name: "数据二",
        map: true,
        tooltip: true,
    }
})
function onMap(params: TsEchartsMap3d.ClickParams, done: TsEchartsMap3d.Done) {
    console.log("[onMap]", params)
    done();
}
function onBack(params: TsEchartsMap3d.ClickParams, done: TsEchartsMap3d.Done) {
    console.log("[onBack]", params);
    done();
}
setTimeout(() => {
    data[411522] = {
        item1: 123,
        item2: 456
    }
    map3dRef.value.setOption();
}, 500);
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "当前地图adcode",
        dataType: "TsEchartsMap3d.Model",
        required: true,
        default: "",
        optional: "",
    },{
        key: "data",
        explain: "绑定的数据",
        dataType: "TsEchartsMap3d.Data",
        required: true,
        default: "",
        optional: "",
    },{
        key: "options",
        explain: "配置",
        dataType: "TsEchartsMap3d.Options",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsEchartsMap3d.Sets",
        required: false,
        default: "",
        optional: "",
    },{
        key: "@click",
        explain: "点击区块",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(params:TsEchartsMap3d.ClickParams)⇒void",
    },{
        key: "@back",
        explain: "点击空白区返回",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(params:TsEchartsMap3d.ClickParams)⇒void",
    }
];
const tableOptions:TsTheBaseTable.Model = [
    {
        key: "name",
        explain: "区块名称",
        dataType: "string",
        required: true,
        default: "",
        optional: "",
    },{
        key: "map",
        explain: "在地图上显示",
        dataType: "boolean",
        required: true,
        default: "",
        optional: "",
    },{
        key: "tooltip",
        explain: "hover时显示",
        dataType: "boolean",
        required: true,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "alpha",
        explain: "x轴旋转角度",
        dataType: "number",
        required: false,
        default: "50",
        optional: "",
    },{
        key: "beta",
        explain: "y轴旋转角度",
        dataType: "number",
        required: false,
        default: "0",
        optional: "",
    },{
        key: "center",
        explain: "中心点位置",
        dataType: "[number, number, number]",
        required: false,
        default: "[0,0,0]",
        optional: "",
    },{
        key: "distance",
        explain: "视距控制，数值越大物体越小",
        dataType: "number",
        required: false,
        default: "105",
        optional: "",
    },{
        key: "autoRotate",
        explain: "自动旋转",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "autoRotateDirection",
        explain: "旋转方向",
        dataType: "enum",
        required: false,
        default: "ccw",
        optional: "ccw / cw",
    },{
        key: "loop",
        explain: "循环旋转",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "minBeta",
        explain: "y轴最小旋转角度",
        dataType: "number",
        required: false,
        default: "-180",
        optional: "",
    },{
        key: "maxBeta",
        explain: "y轴最大旋转角度",
        dataType: "number",
        required: false,
        default: "180",
        optional: "",
    },{
        key: "tooltipBgColor",
        explain: "提示背景颜色",
        dataType: "string",
        required: false,
        default: "white",
        optional: "",
    },{
        key: "tooltipBorColor",
        explain: "提示边框颜色",
        dataType: "string",
        required: false,
        default: "white",
        optional: "",
    },{
        key: "tooltipRadius",
        explain: "提示边框圆角",
        dataType: "number",
        required: false,
        default: "4",
        optional: "",
    },{
        key: "tooltipBorWidth",
        explain: "提示边框线宽",
        dataType: "number",
        required: false,
        default: "0",
        optional: "",
    },{
        key: "tooltipPadding",
        explain: "提示内边距",
        dataType: "[number, number]",
        required: false,
        default: "[10, 15]",
        optional: "",
    },{
        key: "tooltipTextColor",
        explain: "提示框内文本颜色",
        dataType: "string",
        required: false,
        default: "#323233",
        optional: "",
    },{
        key: "tooltipTextAlign",
        explain: "提示框内文本水平对齐方式",
        dataType: "enum",
        required: false,
        default: "left",
        optional: "left / center / right",
    },{
        key: "tooltipTextFontFamily",
        explain: "提示框内文本字体系列",
        dataType: "string",
        required: false,
        default: "Microsoft Yahei",
        optional: "",
    },{
        key: "tooltipTextFontSize",
        explain: "提示框内文本字号",
        dataType: "number",
        required: false,
        default: "14",
        optional: "",
    },{
        key: "tooltipTextFontStype",
        explain: "提示框内文本样式",
        dataType: "enum",
        required: false,
        default: "normal",
        optional: "normal / italic / oblique",
    },{
        key: "tooltipTextFontWeight",
        explain: "提示框内文本粗细",
        dataType: "enum | number",
        required: false,
        default: "normal",
        optional: "normal / bold / bolder / lighter / number",
    },
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://echarts.apache.org/zh/option-gl.html" class="page-echarts-map3d">
        <template #tips>
            <base-alert title="tips：组件要放在一个有宽高的div中"></base-alert>
            <br>
            <base-alert title="1、点击区域查看下一级" :sets="setAlertTip"></base-alert>
            <base-alert title="2、点击空白区域返回上一级" :sets="setAlertTip"></base-alert>
        </template>
        <template #view>
            <base-echarts-map3d ref="map3dRef" v-model="model" :data="data" :options="options" @click="onMap" @back="onBack"></base-echarts-map3d>
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
.page-echarts-map3d :deep(.view .part-content) {
    height: 500px;
}
</style>