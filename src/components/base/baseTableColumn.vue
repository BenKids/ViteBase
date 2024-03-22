<script setup lang="ts">
const props = withDefaults(defineProps<{
    label: TsTableColumn.Label,
    prop: TsTableColumn.Prop,
    sets?: TsTableColumn.Sets,
}>(),{
    sets: () => {
        return {}
    }
})
function fnHidden():boolean {
    if(props.sets.hidden == undefined) return false;
    return props.sets.hidden();
}
const className = computed(():TsTableSpecial.Sets['className'] => {
    let r = "base-table-column ";
    r += props.sets.className ?? '';
    return r;
})
</script>

<template>
    <el-table-column
        v-if="!fnHidden()"
        :property="prop"
        :label="label"
        :width="sets.width"
        :min-width="sets.minWidth || (label.length * 14 + 25)"
        :fixed="sets.fixed"
        :formatter="sets.formatter"
        :show-overflow-tooltip="sets.showOverflowTooltip ?? true"
        :align="sets.align || 'center'"
        :header-align="sets.headerAlign || 'center'"
        :class-name="className"
        :label-class-name="sets.labelClassName"
    >
        <template #default="{row,column,$index}">
            <slot :row="row" :column="column" :$index="$index">{{ row[prop] ?? "--" }}</slot>
        </template>
    </el-table-column>
</template>