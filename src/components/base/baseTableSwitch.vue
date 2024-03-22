<script setup lang="ts">
const props = withDefaults(defineProps<{
    label: TsTableSwitch.Label,
    prop: TsTableSwitch.Prop,
    sets?: TsTableSwitch.Sets,
}>(), {
    sets() {
        return {}
    }
})
const className = computed(():TsTableSpecial.Sets['className'] => {
    let r = "base-table-switch ";
    r += props.sets.className ?? '';
    return r;
})
const emits = defineEmits(["change"]);
function onChange(val:TsSwitch.Change, row:TsTable.Row) {
    emits("change",val,row);
}
</script>
<template>
    <base-table-column :label="label" :prop="prop" :sets="sets" :class-name="className">
        <template #default="scope">
            <base-switch v-bind="$attrs" v-model="scope.row[prop]" :sets="sets" width="40" @change="(val:TsSwitch.Change) => onChange(val,scope.row)" v-if="scope.row[prop] != undefined"></base-switch>
            <span v-else>--</span>
        </template>
    </base-table-column>
</template>