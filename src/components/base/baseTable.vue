<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		modelValue: TsTable.Model;
		selectData?: TsTable.Model;
		sets?: TsTable.Sets;
	}>(),
	{
		sets: () => {
			return {};
		},
	}
);
const tableIn = true;
provide("tableIn", tableIn);
let loading = ref<TsTable.Loading>(false);
const tableRef = ref();
const rowKey = (props.sets.rowKey as string) ?? "id";
const emits = defineEmits(["update:selectData", "select", "selectAll", "expandChange"]);
watch(
	() => props.selectData,
	() => reSelection()
);
watch(
	() => props.modelValue,
	() => reSelection(),
);
let tableTreeChildrenName = ref<string>('children');
provide("tableTreeChildrenName",tableTreeChildrenName)
nextTick(()=>{
	tableTreeChildrenName.value = tableRef.value.treeProps.children;
})
function onSelect(selection: TsTable.Model, row: TsTable.Row) {
	if (props.selectData) {
		if (selection.length && selection.indexOf(row) >= 0) {
			emits("update:selectData", evUniqueObj([...props.selectData, ...selection], rowKey));
		} else {
			emits(
				"update:selectData",
				props.selectData.filter((item) => item[rowKey] != row[rowKey])
			);
		}
	}
	emits("select", selection, row);
}
function onSelectAll(selection: TsTable.Model) {
	if (props.selectData) {
		if (selection.length == 0) {
			emits(
				"update:selectData",
				props.selectData.filter((item) => props.modelValue.findIndex((i) => i[rowKey] == item[rowKey]) < 0)
			);
		} else {
			emits("update:selectData", evUniqueObj([...props.selectData, ...selection], rowKey));
		}
	}
	emits("select", selection);
	emits("selectAll", selection);
}
function reSelection() {
	nextTick(() => {
		tableRef.value.clearSelection();
		if (!tableRef.value || !props.selectData || props.selectData.length == 0) return;
		let rows = props.modelValue.filter((item) => props.selectData!.findIndex((i) => i[rowKey] == item[rowKey]) >= 0);
		rows.forEach((row) => {
			tableRef.value.toggleRowSelection(row, undefined);
		});
	});
}
function fnSummary(param: TsTable.SummaryParams): string[] {
	if (!props.sets.showSummary || !props.sets.summaryMethod) return [];
	const { columns, data } = param;
	const sums: string[] = [];
	columns.forEach((column, index) => {
		if (index === 0) {
			sums[index] = "合计";
			return;
		}
		const values = data.map((item) => Number(item[column.property]));
		const paramItem = props.sets.summaryMethod!.find((i) => i.prop == column.property);
		if (paramItem) {
			const paramT = paramItem.fmt.split("{v}");
			let n = `${values.reduce((prev, curr) => {
				const value = Number(curr);
				if (!Number.isNaN(value)) {
					return prev + curr;
				} else {
					return prev;
				}
			}, 0)}`;
			n = evToFixed(Number(n), 2).toString();
			sums[index] = paramT[0] + n + paramT[1];
		} else {
			sums[index] = "";
		}
	});
	return sums;
}
// 计算children列的宽度
function onExpand(row:TsTable.Row,expand:Boolean) {
	emits("expandChange",row,expand);
}
function load(row: TsDept.TableItem, _treeNode: unknown, resolve: (date: TsDept.Table) => void) {
	if(props.sets.load) props.sets.load(row,resolve);
}
function rowClass({row}:{row:TsTable.Row}){
	return row[tableTreeChildrenName.value] ? "row-children" : ""
}
defineExpose({
	loading,
});
</script>
<template>
	<el-table
		v-loading="loading"
		:data="modelValue"
		:height="sets.height ?? (sets.maxHeight ? undefined : '100%')"
		:max-height="sets.maxHeight"
		:stripe="sets.stripe ?? true"
		:border="sets.border ?? true"
		:size="sets.size"
		:show-header="sets.showHeader"
		:highlight-current-row="sets.highlightCurrentRow"
		:current-row-key="sets.currentRowKey"
		:row-key="rowKey"
		:empty-text="sets.emptyText"
		:tooltip-effect="sets.tooltipEffect"
		:show-summary="sets.showSummary"
		:sum-text="sets.sumText"
		:summary-method="fnSummary"
		:span-method="sets.spanMethod"
		:row-class-name="rowClass"
		:lazy="sets.lazy"
		:load="load"
		class="base-table"
		ref="tableRef"
		@select="onSelect"
		@select-all="onSelectAll"
		@expand-change="onExpand">
		<slot></slot>
		<template #empty>
			<slot name="empty"></slot>
		</template>
	</el-table>
</template>
<style scoped>
.base-table :deep(.base-table-column.handle .cell) {
	padding: 0 6px;
}
.base-table :deep(.row-children .base-table-column.children) {
	cursor: pointer;
}
.base-table :deep(.cell.el-tooltip) {
	width: 100%!important;
}
</style>
