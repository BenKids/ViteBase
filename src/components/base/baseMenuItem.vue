<script setup lang="ts">
    defineProps<{
        options: TsMenu.Options
    }>();
    function isMenu(item:TsMenu.Option) {
        if(item.meta && item.meta.hidden) return item.meta.hidden();
        return true;
    }
    function isDisabled(item:TsMenu.Option) {
        if(item.meta && item.meta.disabled) return item.meta.disabled();
        return false;
    }
    function fnRoute(item:TsMenu.Option) {
        if(item.meta && item.meta.blank) {
            return {name: ""};
        } else {
            return {name: item.name};
        }
    }
    const onMenuItem = inject<(obj:TsMenu.Option)=>void>("onMenuItem")!;
</script>

<template>
    <template v-for="item in options" :key="item.name">
        <template v-if="isMenu(item)">
            <base-menu-item v-if="item.children && !item.meta" :options="item.children"></base-menu-item>
            <el-sub-menu
                v-else-if="item.children"
                :disabled="isDisabled(item)"
                :index="item.name"
                class="base-menu-sub"
            >
                <template #title>
                    <base-icons :icon="item.meta.icon" v-if="item.meta.icon"></base-icons>
                    <span>{{ item.meta.label }}</span>
                </template>
                <base-menu-item :options="item.children"></base-menu-item>
            </el-sub-menu>
            <el-menu-item
                v-else-if="!(item.meta && item.meta.menu)"
                :disabled="isDisabled(item)"
                :index="item.name"
                :route="fnRoute(item)"
                @click="onMenuItem(item)"
                class="base-menu-item"
            >
                <base-icons :icon="item.meta.icon"></base-icons>
                <template #title>
                    <span>{{ item.meta.label }}</span>
                </template>
            </el-menu-item>
        </template>
    </template>
</template>

<style scoped></style>