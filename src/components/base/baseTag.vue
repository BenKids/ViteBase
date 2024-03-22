<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: TsTag.Model,
    options: TsTag.Options,
    modality?: TsTag.Modality,
    sets?: TsTag.Sets,
}>(), {
    sets: () => {
        return {}
    }
})
const label = computed(() => {
    let res = props.modelValue;
    if (props.options) {
        props.options.find((item) => {
            if (item.value == res) {
                res = item.label;
                return;
            } else if (item.value == 'default') {
                res = item.label;
                return;
            }
        })
    }
    return res;
})
const type = computed(() => {
    let res = props.sets.type ?? "primary";
    let r = props.options.find(item => (item.value == props.modelValue || item.value == 'default'))
    if (r && r.type) res = r.type;
    if (props.modality) {
        res = props.modality[props.modelValue] ?? res;
    }
    return res;
})
</script>

<template>
    <div v-if="type == 'text'">{{ label }}</div>
    <el-tag
        v-else
        :type="type"
        :closable='sets.closable'
        :size="sets.size"
        :effect="sets.effect"
        :color="sets.color"
        :hit="sets.hit"
        :round="sets.round"
        class="base-tag"
    >{{ label }}
    </el-tag>
</template>