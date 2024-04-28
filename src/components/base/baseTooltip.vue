<script setup lang="ts">
withDefaults(
    defineProps<{
        content?: TsTooltip.Content,
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
        :rawContent="sets.rawContent"
        :placement="sets.placement"
        :disabled="sets.disabled"
        class="base-tooltip"
    >
        <template #content>
            <slot name="content">{{content}}</slot>
        </template>
        <slot></slot>
    </el-tooltip>
</template>
<style scoped>

</style>