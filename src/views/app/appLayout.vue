<script setup lang="ts">
let {include} = pinia.storeToRefs(system());
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
    background-color: var(--base-bgc-gray);
    padding: var(--base-gap);
}
</style>