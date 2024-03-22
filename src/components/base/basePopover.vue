<script setup lang="ts">
    const props = withDefaults(defineProps<{
        sets?: TsPopover.Sets
    }>(),{
        sets: () => {
            return {}
        }
    })
    const emits = defineEmits(['load']);
    let loading = ref<boolean>(true);
    const onStop = () => {
        loading.value = false;
    }
    const onShow = () => {
        if(props.sets.load) emits('load',onStop);
        else onStop();
    }
</script>

<template>
    <el-popover
        class="base-popover"
        :trigger="sets.trigger || 'hover'"
        :title="sets.title"
        :width="sets.width"
        :placement="sets.placement || 'bottom-start'"
        :disabled="sets.disabled"
        :popper-class="sets.popperClass"
        :auto-close="sets.autoClose"
        @show="onShow"
    >
        <template #reference>
            <slot></slot>
        </template>
        <slot name="loading" v-if="loading">
            <div class="base-popover-loading">{{sets.loadingText || '数据加载中...'}}</div>
        </slot>
        <slot name="content" v-else></slot>
    </el-popover>
</template>

<style scoped>
.base-popover-loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 14px;
    color: var(--el-color-info);
}
</style>