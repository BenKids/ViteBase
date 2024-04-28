<script setup lang="ts">
withDefaults(
    defineProps<{
        sets?: TsCard.Sets
    }>(),
    {
        sets: () => {
            return {}
        }
    }
)
const slots = reactive({
    header: false,
    footer: false,
});
const getSlots = useSlots();
onMounted(() => {
    if (getSlots.header) {
        slots.header = true;
    }
    if (getSlots.footer) {
        slots.footer = true;
    }
});
</script>
<template>
    <el-card :body-class="sets.bodyClass" :body-style="sets.bodyStyle" :shadow="sets.shadow" class="base-card">
        <template #header v-if="slots.header"><slot name="header"></slot></template>
        <slot></slot>
        <template #footer v-if="slots.footer"><slot name="footer"></slot></template>
    </el-card>
</template>
<style scoped>
.base-card {
    box-shadow: var(--base-shadow-part);
    border: none;
    border-radius: var(--base-radius);
}
</style>