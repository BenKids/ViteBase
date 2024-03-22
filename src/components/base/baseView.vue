<script setup lang="ts">
withDefaults(defineProps<{
    modelValue?: string[],
}>(),{
    modelValue: () => {
        return []
    }
})
// 缓存bug处理
const wrapperMap = new Map()
const wrap = (fullPath: any, component: any) => {
    let wrapper
    if (component) {
        const wrapperName = fullPath
        if (wrapperMap.has(wrapperName)) {
            wrapper = wrapperMap.get(wrapperName)
        } else {
            wrapper = {
                name: wrapperName,
                render() {
                    return h("div", { className: "vaf-page-wrapper" }, component)
                },
            }
            wrapperMap.set(wrapperName, wrapper)
        }
        return h(wrapper)
    }
}
</script>
<template>
    <div class="base-view">
        <router-view v-slot="{ Component, route }">
            <keep-alive :include="modelValue">
                <component :is="wrap(route.fullPath, Component)" :key="route.fullPath" />
            </keep-alive>
        </router-view>
    </div>
</template>
<style scoped>
    .vaf-page-wrapper,
    .base-view {
        width: 100%;
        height: 100%;
    }
</style>