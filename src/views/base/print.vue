<script setup lang="ts">
const step: string = `const printRef = ref();
const printModel = reactive<TsPrint.Model>({
    aaa: "aaa",
    bbb: "bbb",
});
function onPrint() {
    console.log("[printModel]",printModel);
    printRef.value.print();
}`;
const template: string = `<base-button label="打印" @click="onPrint"></base-button>
<base-print v-model="printModel" ref="printRef">
    <div data-edit="aaa">{{ printModel["aaa"] }}</div>
    <div data-edit="bbb">{{ printModel["bbb"] }}</div>
</base-print>`;
const printRef = ref();
const printModel = reactive<TsPrint.Model>({
    aaa: "打包",
    bbb: "抓取、处理并将我们的源码模块串联成可以在浏览器中运行的文件。",
});

function onPrint() {
    console.log("[printModel]", printModel);
    printRef.value.print();
}

const tableAttr: TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定数据",
        dataType: "TsPrint.Model",
        required: true,
        default: "",
        optional: "",
    }, {
        key: "sets",
        explain: "参数设置",
        dataType: "TsPrint.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets: TsTheBaseTable.Model = [
    {
        key: "empty",
        explain: "编辑内容删除完后替换的文本",
        dataType: "string",
        required: false,
        default: "4个空格",
        optional: "",
    }, {
        key: "type",
        explain: "纸张类型",
        dataType: "enum",
        required: false,
        default: "A4",
        optional: "A4 / A5",
    }, {
        key: "direction",
        explain: "纸张方向",
        dataType: "enum",
        required: false,
        default: "portrait",
        optional: "portrait / landscape",
    }, {
        key: "mark",
        explain: "是否显示可编辑元素的小三角标记，打印时会将其隐藏",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },
];
const tableSlot: TsTheBaseTableSlot.Model = [
    {
        key: "default",
        explain: "打印内容，可以通过给插槽内的元素添加data-edit属性，来让用户可以在页面上对内容进行编辑；可编辑内容会默认添加下划线，若不需要可通过css将其覆盖"
    }
]
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="" class="page-print">
        <template #tips>
            <base-alert title="组件有封装的打印方法，可以通过调用组件的print方法开始打印"></base-alert>
        </template>
        <template #view>
            <base-button label="打印" @click="onPrint"></base-button>
            <base-print v-model="printModel" ref="printRef">
                <p>
                    <span>在浏览器支持 ES 模块之前，JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发。这也正是我们对 “</span>
                    <span data-edit="aaa">{{ printModel["aaa"] }}</span>
                    <span>” 这个概念熟悉的原因：使用工具</span>
                    <span data-edit="bbb">{{ printModel["bbb"] }}</span>
                </p>
            </base-print>
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
<style scoped>
.page-print :deep(.base-alert) {
    margin-bottom: var(--base-gap);
}

.page-print :deep(.base-print) {
    background-color: var(--base-bgc-gray);
}

.page-print :deep(.base-print p) {
    text-indent: 2em;
    padding: var(--base-gap);
    text-align: justify;
}

.page-print :deep(.base-print div + div) {
    margin-top: var(--base-gap);
}
</style>