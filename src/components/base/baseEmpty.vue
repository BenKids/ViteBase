<script setup lang="ts">
    withDefaults(defineProps<{
        label?: TsEmpty.Label,
        sets?: TsEmpty.Sets,
    }>(),{
        sets: () => {
            return {}
        }
    })
</script>
<template>
    <el-empty :description="label" :image="sets.image" :image-size="sets.imageSize">
        <slot></slot>
    </el-empty>
</template>
<style scoped>

</style>