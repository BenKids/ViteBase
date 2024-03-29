<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: TsStatistic.Model,
        sets?: TsStatistic.Sets,
    }>(),
    {
        sets: () => {
            return {}
        }
    }
)
const value = computed(()=>{
    if(typeof(props.modelValue) === "number") return props.modelValue;
    else return undefined;
})
function formatter() {
    if(typeof (props.modelValue) === 'string') return props.modelValue;
    else return undefined;
}
</script>
<template>
<el-statistic :value="value" :formatter="formatter"></el-statistic>
</template>
<style scoped>

</style>