<script setup lang="ts">
type modelValue = TsDatePicker.Model | undefined;
const props = withDefaults(defineProps<{
    modelValue: TsDatePicker.Model,
    sets?: TsDatePicker.Sets,
    labelText?: TsTableInput.Label;
}>(), {
    sets: () => {
        return {}
    }
})
const iconTime = markRaw(IconSolarClockCircleLinear);
const iconDate = markRaw(IconSolarCalendarOutline);
const iconErr = markRaw(IconSolarCloseCircleLinear);
const tableIn = inject<boolean>("tableIn", false);
const tableValidates = inject("validateRules", false) as Ref<TsTable.Rules> | false;
const datePickerRef = ref();
const emits = defineEmits(["update:modelValue", "blur"]);
const model = useVModel(props, "modelValue", emits);
const valueFormat = computed((): string => {
    if (props.sets.format) return props.sets.format;
    let res: TsGen.Fmt;
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
let parent: any;
let errorMsg = ref<string>("");
onMounted(()=>{
    if (tableIn) {
        parent = getCurrentInstance();
        const propsSets = parent.props.sets;
        const modelValue = model.value as modelValue;
        if (propsSets.required && tableValidates && (modelValue !== undefined)) tableValidates.value.push(validate);
    }
})
function onText() {
    edit.value = true;
    nextTick(() => {
        datePickerRef.value.focus();
    })
}

function onBlur(val: FocusEvent) {
    emits("blur", val);
    if (tableIn) {
        validate();
        edit.value = false;
    }
}
function validate(): boolean {
    const rule = parent.props.sets as TsTableDatePicker.Sets;
    if (rule) {
        if (rule.required) {
            errorMsg.value = model.value ? "" : (rule.errorMsg ?? "请选择" + props.labelText);
        }
        if (errorMsg.value) {
            ElMessage({
                type: "error",
                message: errorMsg.value,
            })
        }
    }
    return !!errorMsg.value;
}
</script>
<template>
    <div :class="{
        'base-date-picker': true,
        [sets.type ?? '']: true,
        'table-in': tableIn,
    }">
        <div
            v-if="tableIn && !edit"
            :class=" {
                'view-text-date-picker': true,
                'placeholder': !model
            }"
            @click="onText">
            <el-tooltip :content="errorMsg" placement="top" v-if="errorMsg">
                <base-icons :icon="iconErr" class="base-date-picker-error-icon"></base-icons>
            </el-tooltip>
            {{ model || sets.placeholder || '请选择' }}
            <base-icons :icon="iconTime" v-if="sets.type && sets.type.indexOf('time') >= 0"></base-icons>
            <base-icons :icon="iconDate" v-else></base-icons>
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

.view-text-date-picker {
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

.view-text-date-picker :deep(.el-icon) {
    position: absolute;
    left: 0;
    top: 9px;
    color: var(--el-text-color-placeholder);
}

.view-text-date-picker.placeholder {
    color: var(--el-text-color-placeholder);
}
.view-text-date-picker:has(.base-date-picker-error-icon) {
    padding-left: 22px;
    color: var(--base-color-danger);
}

.view-text-date-picker .base-date-picker-error-icon {
    position: absolute;
    left: 0;
    top: calc(50% - 0.5em);
    color: var(--base-color-danger);
    cursor: pointer;
}
</style>