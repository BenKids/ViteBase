<script setup lang="ts">
withDefaults(defineProps<{
    prop: TsFormDatePicker.Prop,
    label?: TsFormDatePicker.Label,
    sets?: TsFormDatePicker.Sets,
}>(), {
    sets: () => {
        return {}
    }
})
let model = getCurrentInstance()?.parent?.props.model as TsForm.Model;
</script>
<template>
    <base-form-item :label="label" :prop="prop" :sets="sets">
        <base-date-picker v-bind="$attrs" v-model="model[prop]" :sets="sets" v-if="!sets.hidden"></base-date-picker>
    </base-form-item>
</template>