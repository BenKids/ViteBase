<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: TsImageViewer.Model,
    options: TsImageViewer.Options,
    sets?: TsImageViewer.Sets,
}>(),{
    sets: () => {
        return {}
    }
})
const emits = defineEmits(["update:modelValue"])
const show = useVModel(props,"modelValue",emits);
</script>

<template>
    <el-image-viewer
        v-if="show"
        :url-list="options"
        :initial-index="sets.initialIndex ?? 0"
        :infinite="sets.infinite ?? false"
        :hide-on-click-modal="sets.hideOnClickModal"
        :zoom-rate="sets.zoomRate"
        @close="show = false"
    ></el-image-viewer>
</template>
<style>
.el-image-viewer__wrapper .el-image-viewer__btn.is-disabled,
.el-image-viewer__wrapper .el-image-viewer__btn.is-disabled .el-icon {
    display: none;
}
</style>