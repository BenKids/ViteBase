<script setup lang="ts">
const step: string = `const setsAlert:TsAlert.Sets = {
    showIcon: true,
    type: "warning"
}
const mapRef = ref();
let model = ref<TsEchartsMap.Model>(411500)
let data = reactive<TsEchartsMap.Data>({
    411522: {}
})
let options = reactive<TsEchartsMap.Options>({
    item1: "数据一二二二二二",
    item2: "数据二",
})

function onMap(params: TsEchartsMap.ClickParams, done: TsEchartsMap.Done) {
    console.log("[onMap]", params)
    done();
}

function onBack(params: TsEchartsMap.ClickParams, done: TsEchartsMap.Done) {
    console.log("[onBack]", params);
    done();
}

setTimeout(() => {
    data[411522] = {
        item1: 123,
        item2: 456
    }
    mapRef.value.setOption();
}, 500);`;
const template: string = `<base-alert title="tips：组件要放在一个有宽高的div中" :sets="setsAlert"></base-alert>`;
const setsAlert:TsAlert.Sets = {
    showIcon: true,
    type: "warning",
    closable: false,
}
const setAlertTip:TsAlert.Sets = {
    closable: false,
}
const mapRef = ref();
let model = ref<TsEchartsMap.Model>(411500)
let data = reactive<TsEchartsMap.Data>({
    411522: {}
})
let options = reactive<TsEchartsMap.Options>({
    item1: "数据一二二二二二",
    item2: "数据二",
})

function onMap(params: TsEchartsMap.ClickParams, done: TsEchartsMap.Done) {
    console.log("[onMap]", params)
    done();
}

function onBack(params: TsEchartsMap.ClickParams, done: TsEchartsMap.Done) {
    console.log("[onBack]", params);
    done();
}

setTimeout(() => {
    data[411522] = {
        item1: 123,
        item2: 456
    }
    mapRef.value.setOption();
}, 500);
const tableAttr: TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "当前地图adcode",
        dataType: "TsEchartsMap.Model",
        required: true,
        default: "",
        optional: "",
    },{
        key: "data",
        explain: "地图的数据",
        dataType: "TsEchartsMap.Data",
        required: true,
        default: "",
        optional: "",
    },{
        key: "options",
        explain: "配置数据名称",
        dataType: "TsEchartsMap.Options",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsEcharts.Sets",
        required: false,
        default: "",
        optional: "",
    },{
        key: "@click",
        explain: "点击区域",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(params:TsEchartsMap.ClickParams)⇒void",
    },{
        key: "@back",
        explain: "点击空白区返回",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(params:TsEchartsMap.ClickParams)⇒void",
    }
];
const tableOptions: TsTheBaseTable.Model = [
    {
        key: "--",
        explain: "配置键值参数名",
        dataType: "string",
        required: true,
        default: "",
        optional: "",
    }
];
const tableSets: TsTheBaseTable.Model = [
    {
        key: "dataRange",
        explain: "启用值域控件",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "dataRangeText",
        explain: "值域空间文本",
        dataType: "[string,string]",
        required: false,
        default: "['高', '低']",
        optional: "",
    },{
        key: "dataRangeTextColor",
        explain: "值域控件文字颜色",
        dataType: "string",
        required: false,
        default: "#303133",
        optional: "",
    },{
        key: "dataRangeWidth",
        explain: "值域控件宽度",
        dataType: "number",
        required: false,
        default: "20",
        optional: "",
    },{
        key: "dataRangeHeight",
        explain: "值域控件高度",
        dataType: "number",
        required: false,
        default: "60",
        optional: "",
    },{
        key: "dataRangeColor",
        explain: "值域颜色标识",
        dataType: "[string, string]",
        required: false,
        default: "['#00a99a', '#a3ddd8']",
        optional: "",
    },{
        key: "scaleLimitMin",
        explain: "最小缩放倍数",
        dataType: "number",
        required: false,
        default: "0.3",
        optional: "",
    },{
        key: "scaleLimitMax",
        explain: "最大缩放倍数",
        dataType: "number",
        required: false,
        default: "3",
        optional: "",
    },{
        key: "singleColor",
        explain: "启用mapOptions配置的regionColor颜色",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "selectDisabled",
        explain: "地区禁止被选中，false时点击区域会高亮显示",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "false",
    },{
        key: "tooltip",
        explain: "启用提示框",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
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
        dataType: "number[]",
        required: false,
        default: "[10,15]",
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
        key: "tooltipTextBaseline",
        explain: "提示框内文本垂直对齐方式",
        dataType: "enum",
        required: false,
        default: "bottom",
        optional: "top / middle / bottom",
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
    <the-base-layout :step="step" :template="template" original-link="https://echarts.apache.org/zh/option-gl.html" class="page-echarts-map">
        <template #tips>
            <base-alert title="tips：组件要放在一个有宽高的div中" :sets="setsAlert"></base-alert>
            <br>
            <base-alert title="1、点击区域查看下一级" :sets="setAlertTip"></base-alert>
            <base-alert title="2、点击空白区域返回上一级" :sets="setAlertTip"></base-alert>
        </template>
        <template #view>
            <base-echarts-map ref="mapRef" v-model="model" :data="data" :options="options" @click="onMap" @back="onBack"></base-echarts-map>
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
.page-echarts-map :deep(.view .part-content) {
    height: 500px;
}
</style>