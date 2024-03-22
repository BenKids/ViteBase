<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		prop: TsFormSelect.Prop;
		options: TsFormSelect.Options;
		label?: TsFormSelect.Label;
		sets?: TsFormSelect.Sets;
	}>(),
	{
		sets: () => {
			return {};
		},
	}
);
let model = getCurrentInstance()?.parent?.props.model as TsForm.Model;
const rules = computed(() => {
	if (!props.sets || !props.sets.required) return undefined;
	let r:TsElement.FormItemRule[] = [{
		required: true,
		message: "请选择" + props.label,
		trigger: "change",
	}];
	if(typeof(props.sets.required) == "function") {
		r.push({
			validator: props.sets.required,
			trigger: "change",
		})
	} else if(typeof(props.sets.required) == "object") {
		return props.sets.required;
	}
	return r;
});
</script>
<template>
	<base-form-item :label="label" :prop="prop" :rules="rules" :sets="sets" class="base-form-select">
		<base-select v-bind="$attrs" v-model="model[prop]" :options="options" :sets="sets"></base-select>
	</base-form-item>
</template>
