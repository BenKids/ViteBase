<script setup lang="ts">
withDefaults(defineProps<{
    options: TsTabs.Options,
    sets?: TsTabs.Sets,
}>(), {
    sets: () => {
        return {}
    }
})
</script>

<template>
    <el-tabs
        :type="sets.type || 'card'"
        :closable="sets.closable"
        :tab-position="sets.tabPosition"
        class="base-tabs"
    >
        <el-tab-pane
            v-for="item in options"
            :key="item.value"
            :name="item.value"
            :disabled="item.disabled"
            :closable="item.closable ?? sets.closable"
        >
            <template #label>
                <span class="custom-tabs-label">
                  <base-icons :icon="item.icon" v-if="sets.icon && item.icon"></base-icons>
                  <span>{{ item.label }}</span>
                </span>
            </template>
        </el-tab-pane>
    </el-tabs>
</template>
<style scoped>
.base-tabs :deep(.base-icons) {
    margin-right: 5px;
    position: relative;
    top: 2px;
}
</style>