<script setup lang="ts">
// tabs栏获显示的图标需要用markRaw包裹，但这里是读取的缓存信息，暂时没有想到解决办法
const storeSy = storeSystem();
const route = useRoute();
let {tabs} = pinia.storeToRefs(storeSy);
const sets = computed((): TsTabs.Sets => {
    return {
        closable: tabs.value.length > 1,
        icon: false,
    }
})
const removeTab = (targetName: string) => {
    const name = route.name!.toString();
    storeSy.removeTabs(targetName, name);
};

const clickTab = (obj: TsTabs.ClickObj) => {
    const index = obj.index;
    router.push({
        name: obj.props.name,
        query: tabs.value[index].query,
    });
};
</script>

<template>
    <base-tabs v-model="$route.name" :options="tabs" :sets="sets" @tab-remove="removeTab" @tab-click="clickTab" class="the-tabs"></base-tabs>
</template>
<style scoped>
.the-tabs {
    --el-tabs-header-height: 30px;
}

.the-tabs :deep(.el-tabs__header) {
    margin: 0;
    border-bottom: none;
    padding-top: 6px;
    height: initial;
}

.the-tabs :deep(.el-tabs__nav-wrap) {
    margin-bottom: 0;
    padding: 0 var(--base-gap);
}

.the-tabs :deep(.el-tabs__header .el-tabs__nav),
.the-tabs :deep(.el-tabs__header .el-tabs__item) {
    border: none;
}

.the-tabs :deep(.el-tabs__item.is-active) {
    background-color: var(--base-bgc-gray);
    border-top-left-radius: var(--base-radius);
    border-top-right-radius: var(--base-radius);
}

.the-tabs :deep(.el-tabs__nav-next),
.the-tabs :deep(.el-tabs__nav-prev) {
    line-height: 37px;
}
</style>
