<script setup lang="ts">
withDefaults(defineProps<{
    options: TsRadio.Options,
    sets?: TsRadio.Sets,
}>(), {
    sets: () => {
        return {}
    }
})
</script>

<template>
    <el-radio-group :size="sets.size" :disabled="sets.disabled" :text-color="sets.textColor" :fill="sets.fill" class="base-radio">
        <template v-if="sets.type == 'button'">
            <base-badge v-for="(item, index) in options" :key="index" v-model="item.badge" :sets="item.sets">
                <template #default>
                    <el-radio-button :value="item.value" :disabled="item.disabled">
                        {{ item.label }}
                    </el-radio-button>
                </template>
            </base-badge>
        </template>
        <template v-else>
            <el-radio v-for="(item, index) in options" :key="index" :value="item.value" :disabled="item.disabled" :border="sets.border">
                {{ item.label }}
            </el-radio>
        </template>
    </el-radio-group>
</template>

<style scoped>
.base-radio :deep(.el-badge__content) {
    z-index: 10;
}

.base-radio :deep(.base-badge .el-radio-button .el-radio-button__inner) {
    border-radius: 0;
    border-left: none;
}

.base-radio :deep(.base-badge:first-child .el-radio-button .el-radio-button__inner) {
    border-radius: var(--el-border-radius-base) 0 0 var(--el-border-radius-base);
    border-left: var(--el-border);
}

.base-radio :deep(.base-badge:last-child .el-radio-button .el-radio-button__inner) {
    border-radius: 0 var(--el-border-radius-base) var(--el-border-radius-base) 0;
    border-left: none;
}
</style>