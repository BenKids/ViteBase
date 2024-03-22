<script setup lang="ts">
    withDefaults(defineProps<{
        modelValue?: TsCarousel.Model,
        sets?: TsCarousel.Sets
    }>(),{
        sets: () => {
            return {}
        }
    })
</script>
<template>
    <el-carousel
        :initial-index="sets.initialIndex || 0"
        :height="(sets.height || 150) + 'px'"
        :trigger="sets.trigger"
        :autoplay="sets.autoplay"
        :interval="sets.interval"
        :indicatorPosition="sets.indicatorPosition"
        :arrow="sets.arrow"
        :type="sets.type"
        :loop="sets.loop"
        :direction="sets.direction"
        :pauseOnHover="sets.pauseOnHover"
        class="base-carousel"
    >
        <el-carousel-item v-for="(item, index) in modelValue" :key="index">
            <slot :option="item">{{index}}</slot>
        </el-carousel-item>
    </el-carousel>
</template>
<style scoped>
.base-carousel :deep(.el-carousel__item) {
    text-align: center;
}
</style>