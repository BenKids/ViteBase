<script setup lang="ts">
const step: string = `const steps = ref<TsSteps.Model>(1);
const optSteps = reactive<TsSteps.Options>([
    {
        title: "第一步",
    },{
        icon: markRaw(IconSolarAlignLeftLinear),
        title: "第二步",
    },{
        title: "第三步",
        description: "这里是第三步的说明"
    }
]);`;
const template: string = `<base-steps v-model="steps" :options="optSteps"></base-steps>`;
const steps = ref<TsSteps.Model>(1);
const optSteps = reactive<TsSteps.Options>([
    {
        title: "第一步",
    }, {
        icon: markRaw(IconSolarAlignLeftLinear),
        title: "第二步",
    }, {
        title: "第三步",
        description: "这里是第三步的说明"
    }
]);
const tableAttr: TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值，当前激活步骤索引",
        dataType: "TsSteps.Model",
        required: true,
        default: "",
        optional: "number",
    }, {
        key: "options",
        explain: "配置",
        dataType: "TsSteps.Options",
        required: true,
        default: "",
        optional: "",
    }, {
        key: "sets",
        explain: "参数设置",
        dataType: "TsStesp.Sets",
        required: false,
        default: "",
        optional: "",
    },{
        key: "@step",
        explain: "点击回调",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(item: TsSteps.Option, index: number) => void",
    }
];
const tableOptions: TsTheBaseTable.Model = [
    {
        key: "title",
        explain: "标题",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "description",
        explain: "描述",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "icon",
        explain: "图标，会覆盖步骤的索引值，使用Icons图标时需要用markRaw包裹起来",
        dataType: "string",
        required: false,
        default: "",
        optional: "Icons",
    }
]
const tableSets: TsTheBaseTable.Model = [
    {
        key: "click",
        explain: "可点击，true可以点击任意一步，prev只能点击上一步",
        dataType: "enum",
        required: false,
        default: "",
        optional: "prev / true",
    },{
        key: "space",
        explain: "每个 step 的宽度，不填写将自适应间距。 支持百分比",
        dataType: "string / number",
        required: false,
        default: "",
        optional: "",
    },{
        key: "direction",
        explain: "布局方向",
        dataType: "enum",
        required: false,
        default: "horizontal",
        optional: "horizontal / vertical",
    },{
        key: "processStatus",
        explain: "当前步骤状态",
        dataType: "enum",
        required: false,
        default: "process",
        optional: "wait / process / finish / error / success",
    },{
        key: "finishStatus",
        explain: "结束步骤状态",
        dataType: "enum",
        required: false,
        default: "finish",
        optional: "wait / process / finish / error / success",
    },{
        key: "alignCenter",
        explain: "居中对齐",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "simple",
        explain: "简洁风格",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "tru / false",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/steps.html">
        <template #view>
            <base-steps v-model="steps" :options="optSteps"></base-steps>
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