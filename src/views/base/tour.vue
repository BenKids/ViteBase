<script setup lang="ts">
const step: string = `let show = ref<TsTour.Model>(false);
const options: TsTour.Options = [
    {
        target: "#btn1",
        title: "第一步"
    }, {
        target: "#btn2",
        description: "这里是第二步说明"
    }, {
        target: "#btn3",
        title: "第三步",
        description: "这里是第三步描述"
    }
]
onMounted(() => {
    show.value = true;
})`;
const template: string = `<base-button label="按钮一" id="btn1"></base-button>
<base-button label="按钮二" id="btn2"></base-button>
<base-button label="按钮三" id="btn3"></base-button>
<base-tour v-model="show" :options="options"></base-tour>`;
let show = ref<TsTour.Model>(false);
const options: TsTour.Options = [
    {
        target: "#btn1",
        title: "第一步"
    }, {
        target: "#btn2",
        description: "这里是第二步说明"
    }, {
        target: "#btn3",
        title: "第三步",
        description: "这里是第三步描述"
    }
]
onMounted(() => {
    show.value = true;
})
const tableAttr: TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "开关",
        dataType: "TsTour.Model",
        required: true,
        default: "",
        optional: "boolean",
    }, {
        key: "options",
        explain: "配置",
        dataType: "TsTour.Options",
        required: true,
        default: "",
        optional: "",
    }, {
        key: "sets",
        explain: "参数设置",
        dataType: "TsTour.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableOptions: TsTheBaseTable.Model = [
    {
        key: "target",
        explain: "引导卡片指向的元素，可传入元素id，为空时居中于屏幕",
        dataType: "string | Function",
        required: false,
        default: "",
        optional: "`#${string}` | (() => HTMLElement)",
    },{
        key: "title",
        explain: "标题",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "description",
        explain: "主要描述部分",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "showArrow",
        explain: "是否显示箭头",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }, {
        key: "placement",
        explain: "引导卡片相对于目标元素的位置",
        dataType: "enum",
        required: false,
        default: "bottom",
        optional: "top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end",
    }, {
        key: "contentStyle",
        explain: "content自定义样式",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    }, {
        key: "mask",
        explain: "是否启用遮罩，通过自定义属性改变遮罩样式以及填充的颜色",
        dataType: "boolean | { style?: CSSProperties; color?: string; }",
        required: false,
        default: "",
        optional: "",
    }, {
        key: "type",
        explain: "类型",
        dataType: "enum",
        required: false,
        default: "default",
        optional: "default / primary",
    },{
        key: "nextButtonProps",
        explain: "“下一步”按钮的属性",
        dataType: "{ children: VueNode | string; onClick: Function }",
        required: false,
        default: "",
        optional: "",
    },{
        key: "prevButtonProps",
        explain: "“上一步”按钮的属性",
        dataType: "{ children: VueNode | string; onClick: Function }",
        required: false,
        default: "",
        optional: "",
    }, {
        key: "scrollIntoViewOptions",
        explain: "是否支持当前元素滚动到视窗内",
        dataType: "boolean",
        required: false,
        default: "",
        optional: "true / false",
    },{
        key: "showClose",
        explain: "是否显示关闭按钮",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }, {
        key: "closeIcon",
        explain: "自定义关闭图标",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    }
]
const tableSets: TsTheBaseTable.Model = [
    {
        key: "showArrow",
        explain: "是否显示箭头",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }, {
        key: "placement",
        explain: "引导卡片相对于目标元素的位置",
        dataType: "enum",
        required: false,
        default: "bottom",
        optional: "top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end",
    }, {
        key: "contentStyle",
        explain: "content自定义样式",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    }, {
        key: "mask",
        explain: "是否启用遮罩，通过自定义属性改变遮罩样式以及填充的颜色",
        dataType: "boolean | { style?: CSSProperties; color?: string; }",
        required: false,
        default: "",
        optional: "",
    }, {
        key: "type",
        explain: "类型",
        dataType: "enum",
        required: false,
        default: "default",
        optional: "default / primary",
    }, {
        key: "current",
        explain: "当前值",
        dataType: "number",
        required: false,
        default: "",
        optional: "",
    }, {
        key: "scrollIntoViewOptions",
        explain: "是否支持当前元素滚动到视窗内",
        dataType: "boolean",
        required: false,
        default: "",
        optional: "true / false",
    }, {
        key: "zIndex",
        explain: "Tour 的层级",
        dataType: "number",
        required: false,
        default: "2001",
        optional: "",
    }, {
        key: "showClose",
        explain: "是否显示关闭按钮",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }, {
        key: "closeIcon",
        explain: "自定义关闭图标",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    }, {
        key: "closeOnPressEscape",
        explain: "是否可以通过按下 ESC 关闭引导",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }, {
        key: "targetAreaClickable",
        explain: "启用蒙层时，target 元素区域是否可以点击",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/tour.html">
        <template #view>
            <base-button label="按钮一" id="btn1"></base-button>
            <base-button label="按钮二" id="btn2"></base-button>
            <base-button label="按钮三" id="btn3"></base-button>
            <base-tour v-model="show" :options="options"></base-tour>
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