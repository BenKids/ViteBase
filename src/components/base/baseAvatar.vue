<script setup lang="ts">
    withDefaults(defineProps<{
        modelValue?: TsAvatar.Model,
        label?: TsAvatar.Label,
        sets?: TsAvatar.Sets,
    }>(), {
        sets: () => {
            return {}
        }
    })
</script>

<template>
    <el-avatar
        :src="modelValue"
        :icon="sets.icon"
        :size="sets.size"
        :fit="sets.fit"
        :shape="sets.shape"
        :class="{ 'base-avatar': true, [sets.type || 'primary']: true }"
    >{{ label }}</el-avatar>
</template>

<style scoped>
.base-avatar.primary {
    background-color: var(--el-color-primary);
}
.base-avatar.success {
    background-color: var(--el-color-success);
}
.base-avatar.warning {
    background-color: var(--el-color-warning);
}
.base-avatar.danger {
    background-color: var(--el-color-danger);
}
.base-avatar.info {
    background-color: var(--el-color-info);
}
.base-avatar.black {
    background-color: var(--el-text-color-primary);
}
.base-avatar :deep(img) {
    pointer-events: none;
}
</style>