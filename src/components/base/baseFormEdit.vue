<script setup lang="ts">
withDefaults(defineProps<{
    prop: TsFormEdit.Prop,
    label?: TsFormEdit.Label,
    sets?: TsFormEdit.Sets,
}>(), {
    sets: () => {
        return {}
    }
})
let model = getCurrentInstance()?.parent?.props.model as TsForm.Model;
</script>
<template>
    <base-form-item :label="label" :prop="prop" :sets="sets">
        <base-edit v-bind="$attrs" v-model="model[prop]" :sets="sets" v-if="!sets.hidden"></base-edit>
    </base-form-item>
</template>