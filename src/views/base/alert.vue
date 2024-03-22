<script setup lang="ts">
const sets = reactive<TsAlert.Sets>({
	type: "info",
	closable: false,
	align: "left",
	showIcon: true,
	effect: "light",
	noBackground: false,
});
const setsSuccess = reactive<TsAlert.Sets>({
	type: "success",
	closable: false,
	align: "left",
	showIcon: true,
	effect: "light",
	noBackground: false,
});
const setsError = reactive<TsAlert.Sets>({
	type: "error",
	closable: true,
	align: "left",
	showIcon: true,
	effect: "light",
	noBackground: false,
});
const setsWarning = reactive<TsAlert.Sets>({
  type: "warning",
  showIcon: true,
})
const template = '<base-alert title="alert"></base-alert>';
const tableAttr: TsTheBaseTable.Model = [
	{
		key: "title",
		explain: "展示内容",
		dataType: "string",
		required: true,
		default: "",
		optional: "",
	},{
	    key: "description",
	    explain: "描述文本",
	    dataType: "string",
	    required: false,
	    default: "",
	    optional: "",
	},{
		key: "sets",
		explain: "参数设置",
		dataType: "TsAlert.Sets",
		required: false,
		default: "",
		optional: "",
	},
];
const tableSets: TsTheBaseTable.Model = [
    {
        key: "type",
        explain: "类型",
        dataType: "enum",
        required: false,
        default: "warning",
        optional: "success / warning / error / info",
    },{
        key: "closable",
        explain: "可关闭",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "align",
        explain: "对齐方式",
        dataType: "enum",
        required: false,
        default: "left",
        optional: "left / center / right",
    },{
        key: "closeText",
        explain: "关闭按钮文本",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "showIcon",
        explain: "是否显示类型图标",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "effect",
        explain: "主题样式",
        dataType: "enum",
        required: false,
        default: "light",
        optional: "light / dark",
    },{
        key: "noBackground",
        explain: "去掉背景颜色",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
]
</script>
<template>
	<the-base-layout :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/alert.html">
		<template #view>
			<div class="view-box">
				<base-alert title="alert info" :sets="sets"></base-alert>
				<base-alert title="alert success" :sets="setsSuccess"></base-alert>
				<base-alert title="alert warning" :sets="setsWarning"></base-alert>
				<base-alert title="alert error" :sets="setsError"></base-alert>
			</div>
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
.view-box :deep(.base-alert + .base-alert) {
	margin-top: var(--base-gap);

}
</style>
