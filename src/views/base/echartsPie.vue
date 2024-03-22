<script setup lang="ts">
const step:string = `let data = reactive<TsEchartsPie.Model>([])
const sets = reactive<TsEchartsPie.Sets>({
    legend: true,
    legendPosition: "right",
})
// 点击回调
function onPieRef(params:TsEchartsPie.ClickParams) {
    console.log("[onPieRef]",params)
}
setTimeout(() => {
    data.push(
        { value: 1048, label: 'Search Engine' },
        { value: 735, label: 'Direct' },
        { value: 580, label: 'Email' },
        { value: 484, label: 'Union Ads' },
        { value: 300, label: 'Video Ads' }
    )
    pieRef.value.setOption();
}, 500);`;
const template:string = `<base-echarts-pie name="饼图" v-model="data" :sets="sets" ref="pieRef" @click="onPieRef"></base-echarts-pie>`;
const pieRef = ref();
let data = reactive<TsEchartsPie.Model>([])
const sets = reactive<TsEchartsPie.Sets>({
    legend: true,
    legendPosition: "right",

})
// 点击回调
function onPieRef(params:TsEchartsPie.ClickParams) {
    console.log("[onPieRef]",params)
}
setTimeout(() => {
    data.push(
        { value: 1048, label: 'Search Engine' },
        { value: 735, label: 'Direct' },
        { value: 580, label: 'Email' },
        { value: 484, label: 'Union Ads' },
        { value: 300, label: 'Video Ads' }
    )
    pieRef.value.setOption();
}, 500);
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定数据",
        dataType: "TsEchartsPie.Model",
        required: true,
        default: "",
        optional: "",
    },{
        key: "name",
        explain: "数据标题",
        dataType: "string",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsEchartsPie.Sets",
        required: false,
        default: "",
        optional: "",
    },{
        key: "@click",
        explain: "点击事件",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(params:TsEchartsPie.ClickParams) => void",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "roseType",
        explain: "是否展示成南丁格尔图，通过半径区分数据大小",
        dataType: "enum",
        required: false,
        default: "radius",
        optional: "radius / area / false",
    },{
        key: "radius",
        explain: "饼图的半径",
        dataType: "[number,number] | [string, string]",
        required: false,
        default: "['35%', '70%']",
        optional: "",
    },{
        key: "borderRadius",
        explain: "用于指定饼图扇形区块的内外圆角半径，支持设置固定数值或者相对于扇形区块的半径的百分比值。",
        dataType: "number",
        required: false,
        default: "10",
        optional: "",
    },{
        key: "borderColor",
        explain: "图形的描边颜色",
        dataType: "string",
        required: false,
        default: "#fff",
        optional: "",
    },{
        key: "borderWidth",
        explain: "描边线宽，为 0 时无描边",
        dataType: "number",
        required: false,
        default: "2",
        optional: "",
    },{
        key: "label",
        explain: "是否显示标签",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "labelPosition",
        explain: "标签的位置",
        dataType: "enum",
        required: false,
        default: "outside",
        optional: "outside / inside /inner / center",
    },{
        key: "labelColor",
        explain: "标签文字颜色",
        dataType: "string",
        required: false,
        default: "#303133",
        optional: "",
    },{
        key: "labelWeight",
        explain: "标签文字字体的粗细",
        dataType: "enum",
        required: false,
        default: "normal",
        optional: "normal / bold / bolder / lighter",
    },{
        key: "labelStyle",
        explain: "标签文字字体的风格",
        dataType: "enum",
        required: false,
        default: "normal",
        optional: "normal / italic / oblique",
    },{
        key: "labelSize",
        explain: "标签文字字号",
        dataType: "number",
        required: false,
        default: "12",
        optional: "",
    },{
        key: "legend",
        explain: "是否显示图例",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "legendColor",
        explain: "图例文字颜色",
        dataType: "string",
        required: false,
        default: "#303133",
        optional: "",
    },{
        key: "legendSize",
        explain: "图例文字字号",
        dataType: "number",
        required: false,
        default: "12",
        optional: "",
    },{
        key: "legendWidth",
        explain: "图例标记的图形宽度",
        dataType: "number",
        required: false,
        default: "25",
        optional: "",
    },{
        key: "legendHeight",
        explain: "图例标记的图形高度",
        dataType: "number",
        required: false,
        default: "14",
        optional: "",
    },{
        key: "legendPosition",
        explain: "图例位置",
        dataType: "enum",
        required: false,
        default: "top",
        optional: "left / top / right / bottom",
    },{
        key: "left",
        explain: "主体内容离容器左侧距离",
        dataType: "enum | number | string",
        required: false,
        default: "",
        optional: "auto / left / center / right / number / string",
    },{
        key: "right",
        explain: "主体内容离容器右侧距离",
        dataType: "enum | number | string",
        required: false,
        default: "",
        optional: "auto / number / string",
    },{
        key: "top",
        explain: "主体内容离容器顶部距离",
        dataType: "enum | number | string",
        required: false,
        default: "",
        optional: "auto / top / middle / bottom / number / string",
    },{
        key: "bottom",
        explain: "主体内容离容器底部距离",
        dataType: "enum / number / string",
        required: false,
        default: "",
        optional: "auto / number / string",
    },{
        key: "center",
        explain: "饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标",
        dataType: "[(string | number), (string | number)]",
        required: false,
        default: "[\"50%\",\"50%\"]",
        optional: "",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://echarts.apache.org/examples/zh/index.html#chart-type-pie" class="page-ecahrts-pie">
        <template #view>
            <base-echarts-pie name="饼图" v-model="data" :sets="sets" ref="pieRef" @click="onPieRef"></base-echarts-pie>
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
.page-ecahrts-pie :deep(.view .part-content) {
    height: 300px;
}
</style>