<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		prop: TsFormTreeSelect.Prop;
		label?: TsFormTreeSelect.Label;
		sets?: TsFormItem.Sets;
	}>(),
	{}
);
let model = getCurrentInstance()?.parent?.props.model as TsForm.Model;
const rules = computed(() => {
	if (!props.sets || !props.sets.required) return undefined;
	let r: TsElement.FormItemRule[] = [
		{
			required: true,
			message: "请选择" + props.label,
			trigger: "change",
		},
	];
	if (typeof props.sets.required == "function") {
		r.push({
			validator: props.sets.required,
			trigger: "change",
		});
	} else if (typeof props.sets.required == "object") {
		return props.sets.required;
	}
	return r;
});
</script>
<template>
	<base-form-item :label="label" :prop="prop" :rules="rules" :sets="sets" class="the-form-tree-select-lazy">
		<the-tree-select-lazy v-model="model[prop]"></the-tree-select-lazy>
	</base-form-item>
</template>
<style scoped>
.the-tree-lazy {
	height: 100%;
	overflow: auto;
}
.the-tree-lazy .base-tree {
	height: initial;
	overflow: initial;
}
</style>
