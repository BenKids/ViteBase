<script setup lang="ts">
withDefaults(
    defineProps<{
        modelValue: TsMenu.Model;
        options: TsMenu.Option[];
        collapse: TsMenu.Collapse;
        sets?: TsMenu.Sets;
    }>(),
    {
        sets: () => {
            return {};
        },
    }
);

const emits = defineEmits(["menuItem"]);
const onMenuItem = (item: TsMenu.Option) => {
    emits("menuItem", item);
};
provide("onMenuItem", onMenuItem);
</script>

<template>
    <el-menu
        router
        class="base-menu"
        :unique-opened="sets.uniqueOpened ?? true"
        :background-color="sets.backgroundColor || 'var(--base-bgc-menu)'"
        :text-color="sets.textColor || 'var(--base-color-white)'"
        :active-text-color="sets.activeTextColor || 'var(--base-color-white)'"
        :collapse="collapse"
        :default-active="modelValue.meta.menu || modelValue.name || ''">
        <base-menu-item :options="options"></base-menu-item>
    </el-menu>
</template>

<style scoped>
.base-menu {
    border-right: none;
}

.base-menu:not(.el-menu--collapse) {
    width: 200px;
}

.base-menu :deep(.el-menu-item:not(.is-active) .el-icon),
.base-menu :deep(.el-sub-menu:not(.is-active) .el-icon) {
    color: var(--base-text-color-placeholder);
}

.base-menu :deep(.el-sub-menu__title span) {
    position: relative;
    z-index: 10;
}

.base-menu :deep(.el-menu-item:hover),
.base-menu :deep(.el-sub-menu__title:hover) {
    background-color: transparent;
}
.base-menu :deep(.el-menu-item:before),
.base-menu :deep(.el-sub-menu__title:before) {
    content: "";
    display: block;
    margin: 0 10px;
    border-radius: var(--base-radius);
    color: var(--base-bgc-white);
    height: 40px;
    width: calc(100% - 20px);
    position: absolute;
    top: 8px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--base-bgc-menu-hover);
    transform-origin: center right;
    transform: scaleX(0);
    transition: transform 0.25s ease-in-out;
}
.base-menu :deep(.el-sub-menu .el-menu-item:before) {
    top: 5px;
}
.base-menu :deep(.el-menu-item:hover:before),
.base-menu :deep(.el-sub-menu__title:hover:before) {
    transform-origin: center left;
    transform: scaleX(1);
}
.base-menu :deep(.el-menu-item span) {
    position: relative;
    z-index: 10;
}
.base-menu :deep(.el-menu-item.is-active:before) {
    background-color: var(--base-color-primary);
    transform: scaleX(1);
}
.base-menu :deep(.el-menu-item.is-active:hover:before) {
    background-color: var(--base-color-primary);
    transform: scaleX(0);
}
</style>