<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		modelValue: TsSelect.Model;
		options: TsSelect.Options;
		sets?: TsSelect.Sets;
	}>(),
	{
		sets: () => {
			return {};
		},
		options: () => [],
	}
);
const tableIn = inject<boolean>("tableIn", false);
const emits = defineEmits(["update:modelValue", "blur", "change"]);
const model = computed({
	get: () => {
		fnShowTooltip();
		return props.modelValue;
	},
	set: (val) => {
		emits("update:modelValue", val);
	},
});
const selectRef = ref();
const text = computed(() => {
	let res = "";
	if (tableIn && !props.modelValue) {
		return res;
	} else if (Array.isArray(model.value)) {
		for (let index = 0; index < model.value.length; index++) {
			const item = model.value[index];
			const r = props.options.find((i) => i.value == item);
			if (index > 0) res += " , ";
			res += r ? r.label.toString() : "错误数据";
		}
	} else {
		const r = props.options.find((i) => i.value == model.value);
		res = r ? r.label.toString() : "";
	}
	return res;
});
let showTooltip = ref<boolean>(false);
async function fnShowTooltip() {
	if (tableIn) return;
	if (props.sets.showTooltip !== undefined) {
		showTooltip.value = props.sets.showTooltip;
		return;
	}
	if (props.sets.readonly) {
		nextTick(() => {
			const node = selectRef.value;
			if (!node) return;
			showTooltip.value = evTextOver(node);
		});
		return;
	} else {
		await nextTick();
		if (props.sets.multiple) return;
		const node = selectRef.value.$el.children[0].children[0].children[1];
		if (node.offsetWidth < node.children[0].offsetWidth) {
			showTooltip.value = true;
		} else {
			showTooltip.value = false;
		}
	}
}
let edit = ref<TsInput.Edit>(false);
function onText() {
	if (props.sets.readonly) return;
	edit.value = true;
	nextTick(() => {
		selectRef.value.focus();
	});
}
function onBlur(val: FocusEvent) {
	emits("blur", val);
	if (!tableIn) return;
	edit.value = false;
}
function onChange(val: TsSelect.Model) {
	emits("change",props.options.find(i => i.value == val) ?? val);
}
</script>

<template>
	<div
		v-if="tableIn && !edit"
		@click="onText"
		:class="{
			'base-tooltip-select': true,
			'el-input__inner': true,
			'view-text-select': true,
			'readonly': sets.readonly,
			placeholder: !text,
		}">
		{{ text || sets.placeholder || (sets.readonly ? "暂无数据" : "请选择") }}
		<el-icon v-if="!sets.readonly"><IconSolarAltArrowDownLinear/></el-icon>
	</div>
	<el-tooltip v-else :disabled="!showTooltip" placement="top" popper-class="base-tooltip-select" :content="text">
		<div :class="{ 'base-select readonly': true, placeholder: !text }" v-if="sets.readonly" ref="selectRef">{{ text || "暂无数据" }}</div>
		<el-select
			v-else
			v-bind="$attrs"
			ref="selectRef"
			v-model="model"
			:placeholder="sets.placeholder || '请选择'"
			:multiple="sets.multiple"
			:disabled="sets.disabled"
			:size="sets.size"
			:clearable="sets.clearable ?? true"
			:collapse-tags="sets.collapseTags"
			:collapse-tags-tooltip="sets.collapseTagsTooltip"
			:multiple-limit="sets.multipleLimit"
			:max-collapse-tags="sets.maxCollapseTags"
			:filterable="sets.filterable ?? true"
			:loading="sets.loading"
			:loading-text="sets.loadingText"
			:no-match-text="sets.noMatchText"
			:no-data-text="sets.noDataText"
			:tag-type="sets.tagType"
			:class="{
				'base-select': true,
				overflow: !sets.multiple,
				'table-in': tableIn,
			}"
			@change="onChange"
			@blur="onBlur">
			<el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled">
				<slot name="option" :option="item"></slot>
			</el-option>
		</el-select>
	</el-tooltip>
</template>

<style scoped>
.base-select {
	width: var(--base-input-width);
}
.base-select.readonly {
	color: var(--el-text-color-regular);
	--el-input-readonly-height: calc(var(--el-input-height, 32px) - 2px);
	border: var(--el-border);
	border-radius: var(--el-border-radius-base);
	height: var(--el-input-readonly-height);
	line-height: var(--el-input-readonly-height);
	padding: 0px 11px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.base-select.readonly.placeholder {
	color: #a8abb2;
}
.base-select.table-in {
	width: 100%;
	--el-select-border-color-hover: transparent;
	--el-select-input-border-color: transparent;
	--el-select-input-hover-border-color: transparent;
	--el-select-input-focus-border-color: transparent;
}
.base-select.table-in :deep(.el-input) {
	--el-input-border-color: transparent;
}
.base-select.table-in :deep(.el-input__wrapper) {
	padding: 0;
	background-color: transparent;
}
.base-select.overflow :deep(.el-input__inner) {
	text-overflow: ellipsis;
}

.view-text-select {
	text-align: left;
	cursor: pointer;
	position: relative;
	text-overflow: ellipsis;
	overflow: hidden;
	padding-right: 20px;
}
.view-text-select.readonly {
	cursor: initial;
	text-align: inherit;
	padding-right: 0;
}
.view-text-select :deep(.el-icon) {
	position: absolute;
	right: 0;
	top: 8px;
	color: var(--el-text-color-placeholder);
}

.view-text-select.placeholder {
	color: var(--el-text-color-placeholder);
}
</style>