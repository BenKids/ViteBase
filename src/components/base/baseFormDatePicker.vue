<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: TsFormDatePicker.Model,
    prop: TsFormDatePicker.Prop,
    label?: TsFormDatePicker.Label,
    sets?: TsFormDatePicker.Sets,
}>(), {
    sets: () => {
        return {}
    }
})
const emits = defineEmits(["update:modelValue"]);
let model = useVModel(props,"modelValue",emits);
</script>
<template>
    <base-form-item :label="label" :prop="prop" :sets="sets" class="base-form-date-picker">
        <base-date-picker v-bind="$attrs" v-model="model" :sets="sets" v-if="!sets.hidden"></base-date-picker>
    </base-form-item>
</template>
<style scoped>
.base-form-date-picker :deep(.el-form-item__content) {
    width: var(--base-input-width);
}
.base-form-date-picker :deep(.base-date-picker) {
    flex: 1;
    width: initial;
}
</style>