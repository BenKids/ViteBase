<script setup lang="ts">
const props = withDefaults(defineProps<{
    label: TsTableSelect.Label,
    prop: TsTableSelect.Prop,
    options: TsTableSelect.Options,
    sets?: TsTableSelect.Sets,
}>(), {
    sets() {
        return {}
    }
})
const emits = defineEmits(["change","visibleChange"])
const className = computed(():TsTableSpecial.Sets['className'] => {
    let r = "base-table-select ";
    r += props.sets.className ?? '';
    return r;
})
function onChange(val:TsSelect.Model, row:TsGen.Object) {
    emits("change",{val,row})
}
function onVisible(val:boolean, row:TsGen.Object) {
    emits("visibleChange",{val,row});
}
</script>
<template>
    <base-table-column :label="label" :prop="prop" :sets="sets" :class-name="className">
        <template #default="scope">
            <base-select
                v-bind="$attrs"
                v-model="scope.row[prop]"
                :options="typeof(options) == 'string' ? scope.row[options] : options"
                :sets="sets"
                @change="(val:TsSelect.Model) => onChange(val,scope.row)"
                @visible-change="(val:boolean) => onVisible(val,scope.row)"
                :label-text="label"
            ></base-select>
        </template>
    </base-table-column>
</template>