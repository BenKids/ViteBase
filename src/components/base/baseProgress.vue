<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: TsProgress.Model;
    sets?: TsProgress.Sets
}>(), {
    sets: () => {
        return {}
    }
})
</script>
<template>
    <el-progress
        :percentage="modelValue"
        :type="sets.type"
        :stroke-width="sets.strokeWidth"
        :text-inside="sets.textInside"
        :status="sets.status"
        :indeterminate="sets.indeterminate"
        :duration="sets.duration"
        :color="sets.color"
        :width="sets.width"
        :show-text="sets.showText"
        :stroke-linecap="sets.strokeLinecap"
        :format="sets.format"
        :striped="sets.striped"
        :striped-flow="sets.stripedFlow"
    ></el-progress>
</template>
<style scoped>

</style>