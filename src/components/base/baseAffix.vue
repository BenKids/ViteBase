<script setup lang="ts">
withDefaults(
    defineProps<{
        sets?: TsAffix.Sets,
    }>(),
    {
        sets: () => {
            return {}
        }
    }
)
</script>
<template>
    <el-affix
        :offset="sets.offset"
        :position="sets.position"
        :target="sets.target"
        :zIndex="sets.zIndex"
    >
        <slot></slot>
    </el-affix>
</template>
<style scoped>

</style>