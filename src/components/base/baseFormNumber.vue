<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: number;
        prop: TsFormNumber.Prop;
        label?: TsFormNumber.Label;
        sets?: TsFormNumber.Sets;
    }>(),
    {
        sets: () => {
            return {};
        },
    }
);
const emits = defineEmits(["update:modelValue"]);
let model = useVModel(props,"modelValue", emits);
const rules = computed(() => {
    if (!props.sets || !props.sets.required) return undefined;
    let r: TsElement.FormItemRule[] = [{
        required: true,
        message: "请输入" + props.label,
        trigger: ["blur", "change"],
    }];
    if (typeof (props.sets.required) == "function") {
        r.push({
            validator: props.sets.required,
            trigger: ["blur", "change"],
        })
    } else if (typeof (props.sets.required) == "object") {
        return props.sets.required;
    }
    return r;
});
</script>
<template>
    <base-form-item :label="label" :prop="prop" :rules="rules" :sets="sets" class="base-form-number">
        <base-number v-bind="$attrs" v-model="model" :sets="sets"></base-number>
    </base-form-item>
</template>
