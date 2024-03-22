<script setup lang="ts">
const props = withDefaults(defineProps<{
    label: TsTableTag.Label,
    prop: TsTableTag.Prop,
    options: TsTableTag.Options,
    sets?: TsTableTag.Sets,
    modality?: TsTableTag.Modality,
}>(), {
    sets() {
        return {}
    }
})
const className = computed((): TsTableSpecial.Sets['className'] => {
    let r = "base-table-tag ";
    r += props.sets.className ?? '';
    return r;
})
</script>
<template>
    <base-table-column :label="label" :prop="prop" :sets="sets" :class-name="className">
        <template #default="scope">
            <base-tag v-bind="$attrs" v-model="scope.row[prop]" :options="options" :sets="sets" :modality="modality"></base-tag>
        </template>
    </base-table-column>
</template>