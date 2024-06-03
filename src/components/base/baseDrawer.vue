<script setup lang="ts">
withDefaults(
    defineProps<{
        title?: TsDrawer.Title;
        sets?: TsDrawer.Sets;
    }>(),
    {
        sets: () => {
            return {}
        }
    }
)
</script>
<template>
    <el-drawer
        class="base-drawer"
        :append-to-body="sets.appendToBody"
        :close-on-click-modal="sets.closeOnClickModal"
        :close-on-press-escape="sets.closeOnPressEscape"
        :open-delay="sets.openDelay"
        :close-delay="sets.closeDelay"
        :destroy-on-close="sets.destroyOnClose"
        :modal="sets.modal"
        :direction="sets.direction"
        :show-close="sets.showClose"
        :size="sets.size"
        :with-header="sets.withHeader"
        :modal-class="'base-drawer-modal ' + sets.modalClass"
        :z-index="sets.zIndex"
    >
        <template #header="{ close, titleId, titleClass }">
            <slot name="header" :close="close" :titleId="titleId" :titleClass="titleClass">{{title}}</slot>
        </template>
        <slot></slot>
        <template #footer>
            <slot name="footer"></slot>
        </template>
    </el-drawer>
</template>
<style scoped></style>