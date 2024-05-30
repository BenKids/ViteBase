<script setup lang="ts">
    withDefaults(defineProps<{
        total?: TsPagination.Total,
        sets?: TsPagination.Sets
    }>(),{
        sets: () => {
            return {}
        }
    })
    const emits = defineEmits(["change"]);
    function onSize(val:number) {
        emits("change", {type:'size',val})
    }
    function onCurrent(val:number) {
        emits("change", {type:'current',val})
    }
</script>

<template>
    <el-pagination
        :total="total || 0"
        :page-sizes="sets.pageSizes || [5, 10, 20, 50, 100, 200]"
        :small="sets.small"
        :background="sets.background ?? true"
        :layout="sets.layout  || 'total, sizes, prev, pager, next, jumper'"
        :pager-count="sets.pagerCount"
        :prev-text="sets.prevText"
        :prev-icon="sets.prevIcon"
        :next-text="sets.nextText"
        :next-icon="sets.nextIcon"
        :disabled="sets.disabled"
        :hide-on-single-page="sets.hideOnSinglePage"
        class="base-pagination"
        @size-change="onSize"
        @current-change="onCurrent"
    />
</template>

<style scoped>
    .base-pagination {
        justify-content: flex-end;
    }
</style>