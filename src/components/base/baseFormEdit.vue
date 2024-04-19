<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: TsFormEdit.Model,
    prop: TsFormEdit.Prop,
    label?: TsFormEdit.Label,
    sets?: TsFormEdit.Sets,
}>(), {
    sets: () => {
        return {}
    }
})
const emits = defineEmits(["update:modelValue"]);
let model = useVModel(props, "modelValue", emits);
</script>
<template>
    <base-form-item :label="label" :prop="prop" :sets="sets">
        <base-edit v-bind="$attrs" v-model="model" :sets="sets" v-if="!sets.hidden"></base-edit>
    </base-form-item>
</template>