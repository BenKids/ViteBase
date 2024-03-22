<script setup lang="ts">
const step:string = `const barRef = ref();
let barData = reactive<TsEchartsBar.Model>({
    data: {},
    axis: ['2022年10月', '2022年11月', '2022年12月', '2023年1月', '2023年2月', '2023年3月', '2023年4月'],
});
let options = reactive<TsEchartsBar.Options>({
    item1: {
        label: "数据一"
    },
    item2: {
        label: "数据二"
    },
    item3: {
        label: "数据三"
    },
    item4: {
        label: "数据四"
    },
    item5: {
        label: "超出",
        color: "red"
    }
})
let sets = reactive<TsEchartsBar.Sets>({
    stack: false
})
// 点击回调
function onBarRef(index: number, params: TsEchartsBar.ClickParams) {
    console.log("[params]", index,params)
}
setTimeout(() => {
    // 更改设置
    sets.stack = !sets.stack;
    // 更改数据
    barData.data = {
        item1: [90, 95, 93, 99, 92, 99, 89],
        item2: [30, 25, 27, 31, 21, 35, 31],
        item3: [130, 120, 110, 100, 137, 125, 125],
        item4: [100, 110, 120, 120, 100, 91, 105],
        item5: [10, 5, 2, 11, 3, 8, 12]
    }
    // 更新视图
    barRef.value.setOption();
}, 500);`;
const template:string = `<base-echarts-bar v-model="barData" :options="options" :sets="sets" ref="barRef" @click="onBarRef"></base-echarts-bar>`;
const setsAlert:TsAlert.Sets = {
    showIcon: true,
    type: "warning"
}
const barRef = ref();
let barData = reactive<TsEchartsBar.Model>({
    data: {},
    axis: ['2022年10月', '2022年11月', '2022年12月', '2023年1月', '2023年2月', '2023年3月', '2023年4月'],
});
let options = reactive<TsEchartsBar.Options>({
    item1: {
        label: "数据一",
    },
    item2: {
        label: "数据二",
    },
    item3: {
        label: "数据三",
    },
    item4: {
        label: "数据四",
    },
    item5: {
        label: "超出",
        color: "red"
    }
})
let sets = reactive<TsEchartsBar.Sets>({
    stack: false,
})
// 点击回调
function onBarRef(index: number, params: TsEchartsBar.ClickParams) {
    console.log("[params]", index,params)
}
setTimeout(() => {
    // 更改设置
    sets.stack = !sets.stack;
    // 更改数据
    barData.data = {
        item1: [90, 95, 93, 99, 92, 99, 89],
        item2: [30, 25, 27, 31, 21, 35, 31],
        item3: [130, 120, 110, 100, 137, 125, 125],
        item4: [100, 110, 120, 120, 100, 91, 105],
        item5: [10, 5, 2, 11, 3, 8, 12],
    }
    // 更新视图
    barRef.value.setOption();
}, 500);
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定的数据",
        dataType: "TsEchartsBar.Model",
        required: true,
        default: "",
        optional: "",
    },{
        key: "v-model['data']",
        explain: "数据",
        dataType: "TsEchartsBar.Data",
        required: true,
        default: "",
        optional: "",
    },{
        key: "v-model['axis']",
        explain: "标签轴标签名",
        dataType: "TsEchartsBar.Axis",
        required: true,
        default: "",
        optional: "string[]",
    },{
        key: "options",
        explain: "配置",
        dataType: "TsEchartsBar.Options",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsEchartsBar.Sets",
        required: false,
        default: "",
        optional: "",
    },{
        key: "@click",
        explain: "点击事件",
        dataType: "(index:number,params:TsEchartsBar.ClickParams)⇒void",
        required: false,
        default: "",
        optional: "",
    }
];
const tableOptions:TsTheBaseTable.Model = [
    {
        key: "label",
        explain: "参数名",
        dataType: "string",
        required: true,
        default: "",
        optional: "",
    },{
        key: "stack",
        explain: "堆叠，要堆叠的数据此参数写成一样的",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "color",
        explain: "参数对应块颜色",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "markLine",
        explain: "标线",
        dataType: "number | enum",
        required: false,
        default: "",
        optional: "min / max / average / median / number",
    },{
        key: "markPoint",
        explain: "是否显示该参数的最大最小值",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "title",
        explain: "标题",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "vertical",
        explain: "竖向排列",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "color",
        explain: "颜色",
        dataType: "string[]",
        required: false,
        default: "[\"#5470c6\", \"#91cc75\", \"#fac858\", \"#ee6666\", \"#73c0de\", \"#3ba272\", \"#fc8452\", \"#9a60b4\", \"#ea7ccc\"]",
        optional: "",
    },{
        key: "axisColor",
        explain: "标签轴颜色（包括label，line，tick）",
        dataType: "string",
        required: false,
        default: "#6e707a",
        optional: "",
    },{
        key: "axisRotate",
        explain: "标签轴标签旋转角度",
        dataType: "number",
        required: false,
        default: "0",
        optional: "",
    },{
        key: "axisLabel",
        explain: "是否显示标签轴的标签",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "axisLabelColor",
        explain: "标签轴的标签颜色",
        dataType: "string",
        required: false,
        default: "#6e707a",
        optional: "",
    },{
        key: "axisLine",
        explain: "是否显示标签轴的轴线",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "axisLineColor",
        explain: "标签轴的轴线颜色",
        dataType: "string",
        required: false,
        default: "#6e707a",
        optional: "",
    },{
        key: "axisTick",
        explain: "是否显示标签轴的刻度线",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "axisTickColor",
        explain: "标签轴的刻度线颜色",
        dataType: "string",
        required: false,
        default: "#6e707a",
        optional: "",
    },{
        key: "valueColor",
        explain: "数值轴颜色（包括label，line，tick）",
        dataType: "string",
        required: false,
        default: "#6e707a",
        optional: "",
    },{
        key: "valueRotate",
        explain: "数值轴标签旋转角度",
        dataType: "number",
        required: false,
        default: "0",
        optional: "",
    },{
        key: "valueLabel",
        explain: "是否显示数值轴的标签",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "valueLabelColor",
        explain: "数值轴的标签颜色",
        dataType: "string",
        required: false,
        default: "#6e707a",
        optional: "",
    },{
        key: "valueLine",
        explain: "是否显示数值的轴线",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "valueLineColor",
        explain: "数值轴的轴线颜色",
        dataType: "string",
        required: false,
        default: "#6e707a",
        optional: "",
    },{
        key: "valueTick",
        explain: "是否显示数值轴的刻度线",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "valueTickColor",
        explain: "数值轴的刻度线颜色",
        dataType: "string",
        required: false,
        default: "#6e707a",
        optional: "",
    },{
        key: "legend",
        explain: "是否显示图例",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "legendTextColor",
        explain: "图例文本颜色",
        dataType: "string",
        required: false,
        default: "#6e707a",
        optional: "",
    },{
        key: "legendLeft",
        explain: "图例离容器左侧距离",
        dataType: "enum | number | string",
        required: false,
        default: "center",
        optional: "auto / left / center / right / number / string",
    },{
        key: "legendRight",
        explain: "图例离容器右侧距离",
        dataType: "enum | number | string",
        required: false,
        default: "auto",
        optional: "auto / number / string",
    },{
        key: "legendTop",
        explain: "图例离容器顶部距离",
        dataType: "enum | number | string",
        required: false,
        default: "auto",
        optional: "auto / top / middle / bottom / number / string",
    },{
        key: "legendBottom",
        explain: "图例离容器底部距离",
        dataType: "enum | number | string",
        required: false,
        default: "auto",
        optional: "auto / number / string",
    },{
        key: "stack",
        explain: "是否堆叠所有数据",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "markPoint",
        explain: "是否显示所有数据的最大最小值",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "markLine",
        explain: "图表标线，启用此标线后，options中的markLine将失效",
        dataType: "enum | number",
        required: false,
        default: "",
        optional: "min / max / average / median / number",
    },{
        key: "markLineColor",
        explain: "图表标线颜色",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "left",
        explain: "主体内容离容器左侧距离",
        dataType: "enum | number | string",
        required: false,
        default: "3%",
        optional: "auto / left / center / right / number / string",
    },{
        key: "right",
        explain: "主体内容离容器右侧距离",
        dataType: "enum | number | string",
        required: false,
        default: "4%",
        optional: "auto / number / string",
    },{
        key: "top",
        explain: "主体内容离容器顶部距离",
        dataType: "enum | number | string",
        required: false,
        default: "60",
        optional: "auto / top / middle / bottom / number / string",
    },{
        key: "bottom",
        explain: "主体内容离容器底部距离",
        dataType: "enum / number / string",
        required: false,
        default: "3%",
        optional: "auto / number / string",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://echarts.apache.org/examples/zh/index.html#chart-type-bar" class="page-echarts-bar">
        <template #tips>
            <base-alert title="tips：组件要放在一个有宽高的div中" :sets="setsAlert"></base-alert>
        </template>
        <template #view>
            <base-echarts-bar v-model="barData" :options="options" :sets="sets" ref="barRef" @click="onBarRef"></base-echarts-bar>
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
.page-echarts-bar :deep(.view .part-content) {
    height: 300px;
}
</style>