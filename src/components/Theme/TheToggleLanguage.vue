<script setup lang="ts">

const {language} = pinia.storeToRefs(storeConfig());
//sets 语言切换设置
const setsLanguage: TsSwitch.Sets = {
    activeValue: "en",
    inactiveValue: "zh-cn",
    activeText: "en",
    inactiveText: "cn",
    inlinePrompt: true,
}
</script>
<template>
    <base-tooltip content="语言（目前只有个别组件有语言切换）">
        <template #default>
            <base-switch v-model="language" :sets="setsLanguage" class="the-toggle-language"></base-switch>
        </template>
    </base-tooltip>
</template>
<style scoped>
.the-toggle-language {
    --el-switch-off-color: var(--el-color-success);
}
</style>