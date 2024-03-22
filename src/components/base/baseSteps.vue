<script setup lang="ts">
    const props = withDefaults(defineProps<{
        modelValue: TsSteps.Model,
        options: TsSteps.Options,
        sets?: TsSteps.Sets,
    }>(),{
        sets: () => {
            return {}
        }
    })
    const emits = defineEmits(["step","update:modelValue"]);
    const onStep = (ev:any, item:any, index:number) => {
        if (!props.sets.click) return;
        if (props.sets.click === "prev" && index >= props.modelValue) {
            return;
        }
        const classList = ev.target.classList[0];
        if (
            classList.indexOf("title") !== -1 ||
            classList.indexOf("icon") !== -1
        ) {
            emits("update:modelValue",index);
            emits("step", item, index);
        }
    }
    const model = computed({
        get: () => props.modelValue,
        set: (val) => emits("update:modelValue", val)
    })
</script>

<template>
    <el-steps
        :active="model"
        :space="sets.space"
        :direction="sets.direction"
        :process-status="sets.processStatus"
        :finish-status="sets.finishStatus"
        :align-center="sets.alignCenter"
        :simple="sets.simple"
        :class="{'base-steps':true,'click':sets.click}"
    >
        <template v-for="(item, index) in options" :key="index">
            <el-step @click="onStep($event, item, index)">
                <template #icon>
                    <slot name="icon" :item="item">
                        <base-icons :icon="item.icon" v-if="item.icon"></base-icons>
                        <div class="el-step__icon-inner" v-else>{{ index + 1 }}</div>
                    </slot>
                </template>
                <template #title>
                    <slot name="title" :item="item">{{ item.title }}</slot>
                </template>
                <template #description>
                    <slot name="description" :item="item">{{
                        item.description
                    }}</slot>
                </template>
            </el-step>
        </template>
    </el-steps>
</template>

<style scoped>
.base-steps.click :deep(.el-step__icon),
.base-steps.click :deep(.el-step__title) {
    cursor: pointer;
}
</style>