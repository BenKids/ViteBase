<script setup lang="ts">
const step:string = `let dialog = ref<TsDialog.Model>(false)`;
const template:string = `<base-button label="打开对话框" @click="dialog = true"></base-button>
<base-dialog v-model="dialog" title="对话框">
    <div>这里是内容</div>
    <template #footer>
        <base-button label="确定" @click="dialog = false"></base-button>
        <base-button label="取消" @click="dialog = false"></base-button>
    </template>
</base-dialog>`;
let dialog = ref<TsDialog.Model>(false)
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "对话框开关",
        dataType: "TsDialog.Model",
        required: true,
        default: "",
        optional: "true / false",
    },{
        key: "title",
        explain: "标题",
        dataType: "TsDialog.Title",
        required: false,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsDialog.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "width",
        explain: "宽度",
        dataType: "string / number",
        required: false,
        default: "50%",
        optional: "",
    },{
        key: "fullscreen",
        explain: "全屏",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "top",
        explain: "顶部距离",
        dataType: "string",
        required: false,
        default: "15vh",
        optional: "",
    },{
        key: "modal",
        explain: "遮罩层",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "closeOnClickModal",
        explain: "点击遮罩关闭对话框",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "closeOnPressEscape",
        explain: "ESC关闭对话框",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "showClose",
        explain: "关闭按钮",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "beforeClose",
        explain: "关闭前的回调函数",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(done) => void",
    },{
        key: "draggable",
        explain: "可拖拽",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "center",
        explain: "header 和 footer 部分居中排列",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "alignCenter",
        explain: "水平垂直对齐对话框",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
];
const tableSlot:TsTheBaseTableSlot.Model = [
    {
        key: "",
        explain: "主体内容"
    },{
        key: "title",
        explain: "标题区自定义内容",
    },{
        key: "footer",
        explain: "按钮操作区自定义内容"
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/dialog.html">
        <template #view>
            <base-button label="打开对话框" @click="dialog = true"></base-button>
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
    <base-dialog v-model="dialog" title="对话框">
        <div>这里是内容</div>
        <template #footer>
            <base-button label="确定" @click="dialog = false"></base-button>
            <base-button label="取消" @click="dialog = false"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>