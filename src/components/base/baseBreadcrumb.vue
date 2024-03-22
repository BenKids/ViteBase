<script setup lang="ts">
withDefaults(defineProps<{
    options: TsBreadcrumb.Options,
    sets?: TsBreadcrumb.Sets
}>(), {
    sets: () => {
        return {}
    }
})

</script>

<template>
    <el-breadcrumb :separator="sets.separator" :separator-icon="sets.separatorIcon" class="base-breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in options" :key="index" :to="{ name: item.toName }">{{ item.label }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>