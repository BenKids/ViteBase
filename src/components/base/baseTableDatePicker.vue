<script setup lang="ts">
withDefaults(defineProps<{
    label: TsTableDatePicker.Label,
    prop: TsTableDatePicker.Prop,
    sets?: TsTableDatePicker.Sets,
}>(), {
    sets: () => {
        return {}
    }
})
</script>

<template>
    <base-table-column :label="label" :prop="prop" :sets="sets" :class-name="'base-table-date-picker ' + sets.className">
        <template #default="scope">
            <base-date-picker v-model="scope.row[prop]" v-bind="$attrs" :sets="sets"></base-date-picker>
        </template>
    </base-table-column>
</template>