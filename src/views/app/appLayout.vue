<script setup lang="ts">
let {include} = pinia.storeToRefs(storeSystem());
</script>
<template>
    <base-layout class="app-layout">
        <template #menu>
            <the-menu></the-menu>
        </template>
        <template #header>
            <the-header></the-header>
        </template>
        <template #tabs>
            <the-tabs></the-tabs>
        </template>
        <template #view>
            <base-view v-model="include"></base-view>
        </template>
    </base-layout>
</template>
<style scoped>
.app-layout :deep( .base-layout-tabs + .base-layout-view) {
    padding: var(--base-gap);
    background-color: var(--base-bgc-gray);
}
</style>