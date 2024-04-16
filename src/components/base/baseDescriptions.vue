<script setup lang="ts">
    withDefaults(defineProps<{
        title?: TsDescriptions.Title,
        sets?: TsDescriptions.Sets,
        options: TsDescriptions.Options<TsGen.Object>,
        modelValue: TsDescriptions.Model,
    }>(),{
        sets: () => {
            return {}
        },
    })
    const slots = useSlots();
    let temp = reactive({
        title: false,
        extra: false
    });
    type tTemp = "title" | "extra";
    onMounted(() => {
        for (const key in temp) {
            if (Object.hasOwnProperty.call(slots, key)) {
                temp[key as tTemp] = true;
            }
        }
    })
</script>

<template>
    <el-descriptions
        :title="title"
        :column="sets.column"
        :direction="sets.direction"
        :size="sets.size"
        :border="sets.border ?? true"
        class="base-descriptions"
    >
        <template #title v-if="temp.title"><slot name="title"></slot></template>
        <template #extra v-if="temp.extra"><slot name="extra"></slot></template>
        <el-descriptions-item
            v-for="item in options"
            :key="item.prop"
            :align="item.align || sets.align"
            :label-align="item.labelAlign || sets.labelAlign"
            :span="item.span"
            :width="item.labelWidth ?? sets.labelWidth"
            :min-width="item.minWidth ?? sets.minWidth"
        >
            <template #label>
                <slot :name="item.prop + 'Label'" :option="item" :value="modelValue[item.prop]">
                    <el-icon v-if="item.icon">
                        <component :is="item.icon" />
                    </el-icon>
                    {{ item.label }}
                </slot>
            </template>
            <slot
                :name="item.prop + 'Value'"
                :option="item"
                :value="modelValue[item.prop]"
            >{{ modelValue[item.prop] }}</slot>
        </el-descriptions-item>
    </el-descriptions>
</template>

<style scoped>
.base-descriptions .el-icon {
    vertical-align: middle;
}
</style>