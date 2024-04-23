<script setup lang="ts">
const {autoInsertSpace} = pinia.storeToRefs(storeConfig());
</script>
<template>
    <base-tooltip content="按钮字间距">
        <base-switch v-model="autoInsertSpace" class="the-autoInsertSpace"></base-switch>
    </base-tooltip>
</template>
<style scoped>

</style>