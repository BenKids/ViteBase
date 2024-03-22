<script setup lang="ts">
const step:string = ``;
const template:string = `<base-layout>
    <template #left>left</template>
    <template #form>form</template>
    <template #handleLeftExtra>handleLeftExtra</template>
    <template #headleRight>headleRight</template>
    <template #table>table</template>
    <template #pagination>pagination</template>
    <template #right>right</template>
</base-layout>`;
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "sets",
        explain: "参数设置",
        dataType: "TsLayout.Sets",
        required: false,
        default: "",
        optional: "",
    },{
        key: "@refresh",
        explain: "刷新按钮回调",
        dataType: "Function",
        required: false,
        default: "",
        optional: "() => void",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "menu",
        explain: "显示menu区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "header",
        explain: "显示header区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "tabs",
        explain: "显示tabs区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "view",
        explain: "显示view区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "left",
        explain: "显示left区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "form",
        explain: "显示form区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "handle",
        explain: "显示handle区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "handleLeft",
        explain: "显示handleLeft区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "handleLeftExtra",
        explain: "显示handleLeftExtra区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "handleRight",
        explain: "显示handleRight区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "handleRightExtra",
        explain: "显示handleRightExtra区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "handleBtnSearch",
        explain: "显示查询按钮，有form插槽时会默认显示此按钮",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "handleBtnRefresh",
        explain: "显示刷新按钮，有table插槽时会默认显示此按钮",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "handleBtnLeft",
        explain: "显示left区域开关按钮，有left插槽时会默认显示此按钮",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "handleBtnRight",
        explain: "显示right区域开关按钮，有right插槽时会默认显示此按钮",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "table",
        explain: "显示table区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "pagination",
        explain: "显示pagination区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "right",
        explain: "显示right区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "entire",
        explain: "显示entire区域",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },
];
const tableSlot:TsTheBaseTableSlot.Model = [
    {
        key: "menu",
        explain: "menu区域插槽"
    },{
        key: "header",
        explain: "header区域插槽"
    },{
        key: "tabs",
        explain: "tabs区域插槽"
    },{
        key: "view",
        explain: "view区域插槽"
    },{
        key: "left",
        explain: "left区域插槽"
    },{
        key: "form",
        explain: "form区域插槽"
    },{
        key: "handle",
        explain: "handle区域插槽，此区域包含了handleLeft,handleLeftExtra,handleRight,handleRightExtra"
    },{
        key: "handleLeft",
        explain: "handleLeft区域插槽，此插槽内容会将left区域开关按钮覆盖掉"
    },{
        key: "handleLeftExtra",
        explain: "handleLeftExtra区域插槽，属于handleLeft拓展区域，不会将left区域开关按钮覆盖掉"
    },{
        key: "handleRight",
        explain: "handleRight区域插槽，此插槽会覆盖掉区域内默认的按钮"
    },{
        key: "handleRightExtra",
        explain: "handleRightExtra区域插槽，handleRightExtra的拓展区域，不会将handleRight区域的按钮覆盖掉"
    },{
        key: "table",
        explain: "table区域插槽"
    },{
        key: "pagination",
        explain: "pagination区域插槽"
    },{
        key: "right",
        explain: "right区域插槽"
    },{
        key: "entire",
        explain: "entire区域插槽，此插槽会占据整个区域"
    },
]
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="" class="page-layout-box">
        <template #view>
            <div style="height: 300px;">
                <base-layout>
                    <template #left>left</template>
                    <template #form>form</template>
                    <template #handleLeftExtra>handleLeftExtra</template>
                    <template #headleRight>headleRight</template>
                    <template #table>table</template>
                    <template #pagination>pagination</template>
                    <template #right>right</template>
                </base-layout>
            </div>
            <div style="height: 300px;margin-top: var(--base-gap);">
                <base-layout class="part-layout-menu">
                    <template #menu>menu</template>
                    <template #header>header</template>
                    <template #tabs>tabs</template>
                    <template #view>view</template>
                </base-layout>
            </div>
            <div style="height: 300px;margin-top: var(--base-gap);">
                <base-layout>
                    <template #entire>entire</template>
                </base-layout>
            </div>
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
.page-layout-box :deep(.the-base-view) {
    background-color: transparent;
    padding: 0;
    box-shadow: none;
}
.part-layout-menu {
    background-color: var(--base-bgc-white);
    border-radius: var(--base-radius);
    box-shadow: var(--base-shadow-part);
}
.part-layout-menu :deep(div) {
    padding: var(--base-gap);
    border-left: var(--base-border);
    border-top: var(--base-border);
}
.page-layout-box :deep(.base-layout div) {
    color: var(--base-text-color-secondary);
}
</style>