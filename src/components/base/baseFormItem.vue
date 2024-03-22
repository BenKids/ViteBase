<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		prop: TsFormItem.Prop;
		label?: TsFormItem.Label;
		sets?: TsFormItem.Sets;
	}>(),
	{
		sets: () => {
			return {};
		},
	}
);
const rules = computed(() => {
	if (!props.sets || !props.sets.required) return undefined;
	else if(evTypeOf(props.sets.required) == "boolean") {
		return [
			{
				required: true,
				message: props.label + "不能为空",
				trigger: "blur",
			},
		];
	} else {
		return props.sets.required;
	}
});
</script>
<template>
	<el-form-item
		v-if="!sets.disabled"
		:label="label ? (label + '：') : undefined"
		:prop="prop"
        :rules="rules"
		:class="{
			'base-form-item': true,
			hidden: sets.hidden,
		}">
		<slot v-if="!sets.hidden"></slot>
	</el-form-item>
</template>
<style scoped>
.base-form-item.hidden {
	display: none;
}
</style>
<!-- <style>
.base-form.el-form--inline .el-form-item__content {
	flex: initial;
	width: var(--base-input-width);
}
</style> -->
