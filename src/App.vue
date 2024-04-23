<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from 'element-plus/dist/locale/en.mjs';

const {language, size, autoInsertSpace} = pinia.storeToRefs(storeConfig());
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
</script>
<template>
    <el-config-provider :locale="locale" :size="size" :button="{autoInsertSpace}">
        <router-view></router-view>
    </el-config-provider>
</template>
