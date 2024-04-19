<script setup lang="ts">
const props = withDefaults(defineProps<{
    sets?: TsDialog.Sets
}>(),{
    sets: () => {
        return {}
    }
})
const dialogIn = true;
provide("dialogIn",dialogIn)
let footer = ref<boolean>(false);
onMounted(()=>{
    const slots = useSlots()
    if (Object.prototype.hasOwnProperty.call(slots, "footer")) footer.value = true;
})
const emits = defineEmits(["beforeClose"]);
function closeDialog(): void {
    props.sets.beforeClose && props.sets.beforeClose
    emits("beforeClose");
}
</script>

<template>
    <div>
        <el-dialog
            v-bind="$attrs"
            :width="sets.width"
            :fullscreen="sets.fullscreen"
            :top="sets.top"
            :modal="sets.modal"
            :close-on-click-modal="sets.closeOnClickModal"
            :close-on-press-escape="sets.closeOnPressEscape"
            :show-close="sets.showClose"
            :before-close="closeDialog"
            :draggable="sets.draggable"
            :center="sets.center"
            :align-center="sets.alignCenter"
            class="base-dialog"
        >
            <template #header>
                <slot name="header"></slot>
            </template>
            <slot></slot>
            <template #footer v-if="footer">
                <slot name="footer"></slot>
            </template>
        </el-dialog>
    </div>
</template>
<style scoped>
:deep(.base-dialog) {
    margin: 10vh auto;
}
:deep(.base-dialog .base-layout .part) {
    padding: 0;
    box-shadow: none;
    margin-bottom: 0;
}
:deep(.base-dialog .base-layout-form) {
    margin-bottom: 0;
}
:deep(.base-dialog .base-layout) {
    height: calc(75vh - 130px);
}
</style>