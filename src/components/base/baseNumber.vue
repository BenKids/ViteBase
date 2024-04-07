<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: TsNumber.Model,
    sets?: TsNumber.Sets,
}>(),{
    sets: () => {
        return {}
    }
})
const icon = markRaw(IconSolarPenNewRoundLinear);
const emits = defineEmits(["update:modelValue","blur","change"]);
const model = useVModel(props,"modelValue",emits);
const tableIn = inject("tableIn",false);
const numberRef = ref();
let isEdit = ref<boolean>(false);
let isFocus = ref<boolean>(false);
function onText() {
    isEdit.value = true;
    nextTick(()=>{
        numberRef.value.focus();
    })
}
function onBlur(val:FocusEvent) {
    emits("blur",val);
    if(!tableIn) return;
    if(isFocus.value) {
        numberRef.value.focus();
        isFocus.value = false;
        return;
    }
    isEdit.value = false
}
function onChange(val:FocusEvent) {
    emits("change",val);
    if(!tableIn) return;
    isEdit.value = true;
    isFocus.value = true;
}
const controlsPosition = computed(():TsNumber.Sets['controlsPosition'] => {
    return props.sets.controlsPosition ?? tableIn ? 'right': ''
})
</script>
<template>
    <div
        v-if="tableIn && !isEdit"
        @click="onText"
        :class="{
            'el-input__inner':true,
            'view-text-number':true,
            'table-in':tableIn,
            'placeholder': !model
        }">
        {{ model ?? sets.placeholder ?? '请输入' }}
        <base-icons :icon="icon"></base-icons>
    </div>
    <el-input-number
        v-else
        :class="{
            'base-number':true,
            'table-in': tableIn,
            'right': controlsPosition
        }"
        ref="numberRef"
        v-model.lazy="model"
        :placeholder="sets.placeholder ?? '请输入'"
        :min="sets.min ?? 1"
        :max="sets.max"
        :size="sets.size"
        :precision="sets.precision"
        :controlsPosition="controlsPosition"
        :step="sets.step"
        :step-strictly="sets.stepStrictly"
        :readonly="sets.readonly"
        @blur="onBlur"
        @change="onChange"
    />
</template>
<style scoped>
.base-number {
    width: var(--base-input-width);
}
.base-number.table-in :deep( .el-input-number__decrease),
.base-number.table-in :deep( .el-input-number__increase) {
    background-color: transparent;
    border: none;
    width: 13px;
}
.base-number.table-in {
    width: 100%;
}.base-number.table-in :deep(.el-input__wrapper) {
    padding: 0;
    background-color: transparent;
}
.base-number.table-in :deep(.el-input) {
    --el-input-border-color: transparent;
    --el-input-hover-border-color: transparent;
    --el-input-focus-border-color: transparent;
}
.base-number.table-in.right :deep(.el-input__wrapper) {
    padding-left: 0;
    padding-right: 0;
}
.base-number.table-in.right :deep(.el-input__inner) {
    text-align: left;
}
.view-text-number {
    text-align: left;
    cursor: text;
    position: relative;
}
.view-text-number :deep(.el-icon) {
    position: absolute;
    right: 0;
    top: 8px;
    color: var(--el-text-color-placeholder);
}
.view-text-number.placeholder {
    color: var(--el-text-color-placeholder);
}
</style>