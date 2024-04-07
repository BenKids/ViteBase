<script setup lang="ts">
withDefaults(
    defineProps<{
        options: TsTour.Options;
        sets?: TsTour.Sets
    }>(),
    {
        sets: () => {
            return {}
        }
    }
)
</script>
<template>
    <el-tour
        class="base-tour"
        :show-arrow="sets.showArrow"
        :placement="sets.placement"
        :contentStyle="sets.contentStyle"
        :mask="sets.mask"
        :type="sets.type"
        :current="sets.current"
        :scrollIntoViewOptions="sets.scrollIntoViewOptions"
        :zIndex="sets.zIndex"
        :showClose="sets.showClose"
        :closeIcon="sets.closeIcon"
        :closeOnPressEscape="sets.closeOnPressEscape"
        :targetAreaClickable="sets.targetAreaClickable"
    >
        <el-tour-step
            v-for="(item, index) in options"
            :key="index"
            :target="item.target"
            :title="item.title"
            :description="item.description"
            :showArrow="item.showArrow"
            :placement="item.placement"
            :contentStyle="item.contentStyle"
            :mask="item.mask"
            :type="item.type"
            :nextButtonProps="item.nextButtonProps"
            :prevButtonProps="item.prevButtonProps"
            :scrollIntoViewOptions="item.scrollIntoViewOptions"
            :showClose="item.showClose"
            :closeIcon="item.closeIcon"
        >
            <slot :name="'default' + index"></slot>
            <template #header>
                <slot :name="'header' + index"></slot>
            </template>
        </el-tour-step>
    </el-tour>
</template>
<style scoped>

</style>