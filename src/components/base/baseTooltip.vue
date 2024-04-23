<script setup lang="ts">
withDefaults(
    defineProps<{
        content: TsTooltip.Content,
        sets?: TsTooltip.Sets,
    }>(),
    {
        sets: () => {
            return {}
        }
    }
)
</script>
<template>
    <el-tooltip
        :content="content"
        :rawContent="sets.rawContent"
        :placement="sets.placement"
        :disabled="sets.disabled"
    >
        <slot></slot>
    </el-tooltip>
</template>
<style scoped>

</style>