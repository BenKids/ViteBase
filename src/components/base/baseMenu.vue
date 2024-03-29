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

<style scoped></style>