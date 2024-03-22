<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: TsDatePicker.Model,
    sets?: TsDatePicker.Sets,
}>(),{
    sets: () => {
        return {}
    }
})
const tableIn = inject<boolean>("tableIn",false);
const datePickerRef = ref();
const emits = defineEmits(["update:modelValue", "blur"])
const model = computed({
    get: () => props.modelValue,
    set: val => emits("update:modelValue", val)
})
const valueFormat = computed(():string=>{
    if(props.sets.format) return props.sets.format;
    let res = null;
    switch (props.sets.type) {
        case "year":
            res = "YYYY"
            break;
        case "month":
        case "monthrange":
            res = "YYYY-MM"
            break;
        case "datetime":
        case "datetimerange":
            res = "YYYY-MM-DD hh:mm:ss"
            break;
        case "date":
        case "dates":
        case "daterange":
        default:
            res = "YYYY-MM-DD"
            break;
    }
    return res;
})
let edit = ref<TsInput.Edit>(false);
let text = ref<TsSelect.Option['label']>("");
function onText() {
    edit.value = true;
    nextTick(() => {
        datePickerRef.value.focus();
    })
}
function onBlur(val: FocusEvent) {
    emits("blur", val);
    if (!tableIn) return;
    edit.value = false;
    fnText((<HTMLInputElement>val.target).value);
}
function fnText(val?:string) {
    if (tableIn) text.value = val ?? "";
}
watch(()=> props.modelValue, (val) => {
    if(tableIn && !val) text.value = "";
})
onMounted(() => {
    fnText();
})
</script>
<template>
    <div :class="'base-date-picker ' + sets.type + (tableIn ? ' table-in' : '')">
        <div
            v-if="tableIn && !edit"
            :class=" {
                'view-text': true,
                'placeholder': !model,
            }"
            @click="onText">
            {{ text || sets.placeholder || '请选择' }}
            <el-icon v-if="sets.type && sets.type.indexOf('time') >= 0"><IconSolarClockCircleLinear/></el-icon>
            <el-icon v-else><IconSolarCalendarOutline/></el-icon>
        </div>
        <el-date-picker
            v-else
            v-model="model"
            v-bind="$attrs"
            ref="datePickerRef"
            :type="sets.type || 'date'"
            :format="sets.format"
            :value-format="valueFormat"
            :readonly="sets.readonly"
            :disabled="sets.disabled"
            :size="sets.size"
            :editable="sets.editable"
            :clearable="sets.clearable"
            :placeholder="sets.placeholder || '请选择'"
            :start-placeholder="sets.startPlaceholder || '开始日期'"
            :end-placeholder="sets.endPlaceholder || '结束日期'"
            :prefix-icon="sets.prefixIcon"
            @blur="onBlur"
        />
    </div>
</template>

<style scoped>
.base-date-picker {
    width: var(--base-input-width);
}
.base-date-picker.datetimerange {
    width: 330px;
}
.base-date-picker :deep(.el-input),
.base-date-picker :deep(.el-date-editor.el-input__wrapper) {
    width: 100%;
}
.base-date-picker :deep(.el-date-editor .el-range-input) {
    flex: 1;
}
.base-date-picker :deep(.el-date-editor .el-range-separator) {
    flex: initial;
}
.base-date-picker.table-in {
    width: 100%;
}
.base-date-picker.table-in :deep(.el-input) {
    --el-input-border-color: transparent;
    --el-input-hover-border-color: transparent;
    --el-input-focus-border-color: transparent;
}
.base-date-picker.table-in :deep(.el-input__wrapper) {
    padding: 0;
    background-color: transparent;
}
.view-text {
    text-align: left;
    cursor: text;
    padding-left: 22px;
    position: relative;
    font-size: var(--el-font-size-base);
    display: inline-flex;
    width: 100%;
    line-height: var(--el-component-size);
    vertical-align: middle;
}
.view-text :deep(.el-icon) {
    position: absolute;
    left: 0;
    top: 9px;
    color: var(--el-text-color-placeholder);
}
.view-text.placeholder {
    color: var(--el-text-color-placeholder);
}
</style>