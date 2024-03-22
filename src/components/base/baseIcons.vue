<script setup lang="ts">
withDefaults(
    defineProps<{
        icon: TsIcons.Icon;
        sets?: TsIcons.Sets;
    }>(),
    {
        sets: () => {
            return {}
        }
    }
)
</script>

<template>
    <el-icon :color="sets.color" :size="sets.size" class="base-icons">
        <component :is="icon"/>
    </el-icon>
</template>
