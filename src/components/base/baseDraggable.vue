<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        sets?: TsDraggable.Sets;
    }>(),
    {
        sets: () => {
            return {}
        }
    }
)
const { slots } = getCurrentInstance() as { slots: TsGen.Object };
let handleSlot = ref<boolean>(false);
for (const key in slots) {
    if(key == 'handle') handleSlot.value = true;
}
const handle = ref<HTMLElement>();
const draggableRef = ref<HTMLElement>();
const windowSize = useWindowSize();
const elementSize = useElementSize(draggableRef);
const {style} = useDraggable(draggableRef, {
    initialValue: {
        x: props.sets.x ?? (windowSize.width.value - elementSize.width.value) / 2,
        y: props.sets.y ?? (windowSize.height.value - elementSize.height.value) / 2
    },
    disabled: props.sets.disabled,
    handle: handleSlot.value ? handle : undefined,
})
</script>
<template>
    <div class="base-draggable" :style="style" ref="draggableRef">
        <div class="base-draggable-handle" ref="handle" v-if="handleSlot">
            <slot name="handle"></slot>
        </div>
        <slot></slot>
    </div>
</template>
<style scoped>
.base-draggable {
    position: fixed;
    z-index: 2002;
}
.base-draggable-handle {
    cursor: move;
}
</style>