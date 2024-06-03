<script setup lang="ts">
withDefaults(defineProps<{
    modelValue?: TsBadge.Model,
    sets?: TsBadge.Sets,
}>(),{
    sets: ()=>{
        return {}
    }
})
</script>

<template>
    <el-badge
        :value="modelValue ?? ''"
        :max="sets.max"
        :is-dot="sets.isDot"
        :hidden="sets.hidden && sets.hidden()"
        :type="sets.type"
        class="base-badge"
    ><slot></slot></el-badge>
</template>