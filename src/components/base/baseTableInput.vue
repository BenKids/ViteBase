<script setup lang="ts">
const props = withDefaults(defineProps<{
    label: TsTableInput.Label,
    prop: TsTableInput.Prop,
    sets?: TsTableInput.Sets,
}>(), {
    sets() {
        return {}
    }
})
const labelText = toRef(props,"label");
provide("labelText",labelText);
const className = computed(():TsTableSpecial.Sets['className'] => {
    let r = "base-table-input ";
    r += props.sets.className ?? '';
    return r;
})
</script>
<template>
    <base-table-column :label="label" :prop="prop" :sets="sets" :class-name="className">
        <template #default="scope">
            <base-input v-bind="$attrs" v-model="scope.row[prop]" :sets="sets" :label-text="label"></base-input>
        </template>
    </base-table-column>
</template>