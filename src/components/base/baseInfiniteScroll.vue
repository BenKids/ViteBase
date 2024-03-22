<script setup lang="ts">
    withDefaults(defineProps<{
        modelValue: TsInfiniteScroll.Model[],
        sets?: TsInfiniteScroll.Sets,
    }>(),{
        sets: () => {
            return {}
        }
    })
    const emits = defineEmits(["load"])
    let loading = ref(false),
        finish = ref(false);
    const fnStop = () => {
        loading.value = false;
    }
    const fnFinish = () => {
        loading.value = false;
        finish.value = true;
    }
    const onLoad = () => {
        if(finish.value || loading.value) return;
        loading.value = true;
        emits("load",fnStop,fnFinish);
    }
</script>

<template>
    <div class="base-infinite-scroll" :style="'height:'+(sets.height || '300px')">
        <ul
            class="base-infinite-list"
            v-infinite-scroll="onLoad"
            :infinite-scroll-disabled="sets.disabled"
            :infinite-scroll-delay="sets.delay"
            :infinite-scroll-distance="sets.distance"
            :infinite-scroll-immediate="sets.immediate"
        >
            <li v-for="(item, index) in modelValue" :key="index" class="base-infinite-list-item">
                <slot name="item" :option="item" :index="index">{{index}}</slot>
            </li>
        </ul>
        <p v-if="loading">
            <slot name="loading">
                <div class="base-infinite-loading">{{sets.loadingText || '加载中...'}}</div>
            </slot>
        </p>
        <p v-if="finish">
            <slot name="finish">
                <div class="base-infinite-finish">{{sets.finishText || '没有更多了'}}</div>
            </slot>
        </p>
    </div>
</template>

<style scoped>
.base-infinite-scroll {
    overflow: auto;
}
.base-infinite-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.base-infinite-loading,
.base-infinite-finish {
    text-align:center;
    font-size: 14px;
    color: var(--el-color-info);
}
</style>