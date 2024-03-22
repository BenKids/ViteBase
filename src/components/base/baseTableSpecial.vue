<script setup lang="ts">
    const props = withDefaults(defineProps<{
        type: TsTableSpecial.Type,
        label?: TsTableSpecial.Label,
        sets?: TsTableSpecial.Sets,
    }>(),{
        sets() {
            return {}
        }
    })
    const fixed = props.type === "handle" ? "right" : "left";
    const label = (()=>{
        if(props.label) return props.label;
        if(props.type === "index") return "序号";
        if(props.type === "handle") return "操作";
        return undefined;
    })()
    const width = (()=>{
        if(props.sets.width !== undefined) return props.sets.width;
        else if(props.type === 'handle') return 150;
        return 55;
    })()
    const align = (()=>{
        if(props.sets.align !== undefined) return props.sets.align;
        return "center";
    })()
    const className = (():TsTableSpecial.Sets['className'] => {
        let r = "base-table-column ";
        r += props.type;
        r += props.sets.className ?? '';
        return r;
    })()
</script>

<template>
    <el-table-column
        :type="type"
        :class-name="className"
        :label-class-name="sets.labelClassName"
        :label="label"
        :width="width"
        :min-width="sets.minWidth"
        :fixed="fixed"
        :align="align"
        :headerAlign="sets.headerAlign"
    >
        <template #default="{row,column,$index}">
            <slot :row="row" :column="column" :$index="$index" v-if="type === 'handle'"></slot>
        </template>
    </el-table-column>
</template>