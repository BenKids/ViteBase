<script setup lang="ts">
const errorText = "无访问权限"
function onBack() {
    router.go(-2);
}
</script>
<template>
    <base-layout type="entire">
        <template #entire>
            <base-empty :label="errorText">
                <base-button label="返回上一页" @click="onBack"></base-button>
            </base-empty>
        </template>
    </base-layout>
</template>
<style scoped>
.base-layout :deep(.base-layout-entire) {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>