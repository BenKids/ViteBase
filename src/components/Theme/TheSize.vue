<script setup lang="ts">
const {size} = pinia.storeToRefs(storeConfig());
const options: TsElement.Options = [
    {
        label: "大",
        value: "large",
    }, {
        label: "默认",
        value: "default"
    }, {
        label: "小",
        value: "small"
    }
]
</script>
<template>
    <base-tooltip content="界面尺寸">
        <el-segmented v-model="size" :options="options" class="the-size"/>
    </base-tooltip>
</template>
<style scoped>
.the-size {
    --el-segmented-item-selected-color: #303133;
    --el-segmented-item-selected-bg-color: #ffd100;
    --el-border-radius-base: 16px;
}
</style>