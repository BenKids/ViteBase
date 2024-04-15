<script setup lang="ts">
    withDefaults(defineProps<{
        title?: TsAlert.Title,
        sets?: TsAlert.Sets,
    }>(),{
        sets() {
            return {}
        }
    })
</script>
<template>
    <el-alert
        :title="title"
        :type="sets.type ?? 'warning'"
        :closable="sets.closable ?? false"
        :closeText="sets.closeText"
        :showIcon="sets.showIcon ?? true"
        :effect="sets.effect"
        :class="
            'base-alert ' +
            (sets.noBackground ? 'no-background ' : '') + 
            (sets.align ?? '')
        "
    />
</template>
<style scoped>
    .base-alert.center {
        justify-content: center;
    }
    .base-alert.right {
        justify-content: flex-end;
    }
    .base-alert.no-background {
        background-color: transparent;
    }
</style>