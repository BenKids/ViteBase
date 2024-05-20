<script setup lang="ts">
type modelValue = TsInput.Model | undefined;
const props = withDefaults(
    defineProps<{
        modelValue: TsInput.Model;
        sets?: TsInput.Sets;
    }>(),
    {
        sets: () => {
            return {};
        },
    }
);
const emits = defineEmits(["update:modelValue", "blur"]);
const model = computed({
    get: () => {
        fnShowTooltip();
        return props.modelValue
    },
    set: (val) => emits("update:modelValue", val),
});
let showTooltip = ref<boolean>(false);
const icon = markRaw(IconSolarPen2Linear);
const iconErr = markRaw(IconSolarCloseCircleLinear);
const slots = reactive({
    prepend: false,
    append: false,
});
const getSlots = useSlots();
const tableIn = inject("tableIn", false);
const tableValidates = inject("validateRules",false) as Ref<TsTable.Rules> | false;
const inputRef = ref();
let isEdit = ref<TsInput.Edit>(false);
let parent:any;
let errorMsg = ref<string>("");

onMounted(() => {
    if (getSlots.prepend) {
        slots.prepend = true;
    }
    if (getSlots.append) {
        slots.append = true;
    }
    if(tableIn) {
        parent = getCurrentInstance();
        const propsSets = parent.props.sets;
        const modelValue = model.value as modelValue;
        if((propsSets.required || propsSets.type || propsSets.pattern) && tableValidates && (modelValue !== undefined)) tableValidates.value.push(validate);
    }
});

function onText() {
    isEdit.value = true;
    nextTick(() => {
        inputRef.value.focus();
    });
}

function onBlur(val: FocusEvent) {
    emits("blur", val);
    if (tableIn) {
        isEdit.value = false;
        validate();
    }
}

function validate():boolean {
    const rule = parent.props.sets as TsTableInput.Sets;
    if (rule) {
        if(rule.required) {
            errorMsg.value = (model.value || model.value === 0) ? "" : (rule.errorMsg ?? "不能为空")
        } else if(!model.value && model.value !== 0) {
            errorMsg.value = "";
        }
        let pattern;
        if (rule.pattern) pattern = rule.pattern;
        else if (rule.type === "phone") pattern = regPhone;
        else if (rule.type === "email") pattern = regEmail;
        else if (rule.type === "idCard") pattern = regIdCard;
        if (pattern && (model.value || model.value === 0)) {
            errorMsg.value = pattern.test(model.value.toString()) ? "" : (rule.errorMsg ?? "格式不正确")
        }
        if(rule.ruleExtra) rule.ruleExtra("" as any,model.value,(str?:string | Error | undefined) => {
            if(str) errorMsg.value = typeof(str) === "string" ? str : str.message;
        },"" as any,"" as any);
        if(errorMsg.value) {
            ElMessage({
                type: "error",
                message: errorMsg.value,
            })
        }
    }
    return !!errorMsg.value;
}

async function fnShowTooltip() {
    if (tableIn) return;
    if (props.sets.showTooltip !== undefined) {
        showTooltip.value = props.sets.showTooltip;
        return;
    }
    await nextTick();
    const node = inputRef.value;
    if (!node) return;
    showTooltip.value = props.sets.readonly ? node.scrollWidth > node.clientWidth : node.ref.scrollWidth > node.ref.clientWidth;
}

</script>
<template>
    <div
        v-if="tableIn && !isEdit"
        @click="onText"
        :class="{'el-input__inner': true,'view-text-input': true,placeholder: !model}"
    >
        <el-tooltip :content="errorMsg" placement="top" v-if="errorMsg">
            <base-icons :icon="iconErr" class="base-input-error-icon"></base-icons>
        </el-tooltip>
        <base-icons :icon="icon" class="base-input-mark-icon" v-else></base-icons>
        {{ model || sets.placeholder || "请输入" }}
    </div>
    <el-tooltip v-else :disabled="!showTooltip" placement="top" popper-class="base-tooltip-input">
        <template #content>
            <div>{{ model }}</div>
        </template>
        <div :class="'base-input readonly ' + (sets.type || '') + (model === '' ? ' placeholder' : '')" ref="inputRef" v-if="sets.readonly">
            {{ model || sets.readonlyPlaceholder || sets.placeholder || '暂无数据' }}
        </div>
        <el-input
            v-else
            v-model.lazy="model"
            :type="sets.type"
            :maxlength="sets.maxlength"
            :minlength="sets.minlength"
            :showWordLimit="sets.showWordLimit"
            :placeholder="sets.placeholder || '请输入'"
            :clearable="sets.clearable ?? true"
            :showPassword="sets.type === 'password' && sets.showPassword === true"
            :disabled="sets.disabled"
            :rows="sets.rows"
            :autosize="sets.autosize ?? true"
            :readonly="sets.readonly"
            :resize="sets.resize"
            :autofocus="sets.autofocus"
            :min="sets.min"
            :max="sets.max"
            :size="sets.size"
            :prefixIcon="sets.prefixIcon"
            :suffixIcon="sets.suffixIcon"
            :class="{
              'base-input': true,
              'table-in': tableIn,
            }"
            ref="inputRef"
            @blur="onBlur">
            <template #prepend v-if="slots.prepend">
                <slot name="prepend"></slot>
            </template>
            <template #append v-if="slots.append">
                <slot name="append"></slot>
            </template>
        </el-input>
    </el-tooltip>
</template>

<style scoped>
.base-input {
    position: relative;
    width: var(--base-input-width);
}

.base-input.readonly {
    padding: 1px 11px;
    background-color: var(--el-fill-color-blank);
    background-image: none;
    border-radius: var(--el-border-radius-base);
    cursor: text;
    transition: var(--el-transition-box-shadow);
    transform: translate3d(0, 0, 0);
    box-shadow: 0 0 0 1px var(--el-border-color) inset;
    color: var(--el-text-color-regular);
    font-size: inherit;
}

.base-input.readonly:not(.textarea) {
    height: calc(var(--el-input-height, 32px) - 2px);
    line-height: calc(var(--el-input-height, 32px) - 2px);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.base-input.readonly.textarea {
    min-height: calc(var(--el-input-height, 32px) - 2px);
    line-height: 20px;
    padding: 5px 11px;
    box-sizing: border-box;
}

.base-input.table-in {
    width: 100%;
    --el-input-border-color: transparent;
    --el-input-hover-border-color: transparent;
    --el-input-focus-border-color: transparent;
}

.base-input.table-in :deep(.el-input__wrapper) {
    background-color: transparent;
}

.view-text-input {
    cursor: text;
    position: relative;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-left: var(--base-gap);
}

.base-input.readonly.placeholder,
.view-text-input.placeholder {
    color: var(--el-text-color-placeholder);
}

.view-text-input:has(.base-input-error-icon) {
    padding-left: var(--base-gap);
    color: var(--base-color-danger);
}

.view-text-input .base-input-mark-icon {
    position: absolute;
    left: 0;
    top: calc(50% - 0.5em);
    color: var(--el-text-color-placeholder);
}

.view-text-input .base-input-error-icon {
    position: absolute;
    left: 0;
    top: calc(50% - 0.5em);
    color: var(--base-color-danger);
    cursor: pointer;
}

.base-input :deep(.el-input__wrapper.is-focus) {
    box-shadow: none;
}

.base-input::before,
.base-input::after,
.base-input :deep(.el-input__wrapper::before),
.base-input :deep(.el-input__wrapper::after) {
    content: "";
    display: block;
    position: absolute;
    background-color: var(--base-color-primary);
    transition: transform 0.5s ease;
    z-index: 1;
}

.base-input::before,
.base-input::after {
    height: 1px;
    left: 0;
    right: 0;
    transform: scaleX(0);
}

.base-input :deep(.el-input__wrapper::before),
.base-input :deep(.el-input__wrapper::after) {
    width: 1px;
    top: 0;
    bottom: 0;
    transform: scaleY(0);
}

.base-input::after {
    bottom: 0;
    transform-origin: bottom right;
}

.base-input:has(.is-focus)::after {
    transform-origin: bottom left;
    transform: scaleX(1);
}

.base-input :deep(.el-input__wrapper::after) {
    right: 0;
    transform-origin: top right;
}

.base-input:has(.is-focus) :deep(.el-input__wrapper::after) {
    transform-origin: bottom right;
    transform: scaleY(1);
}

.base-input::before {
    top: 0;
    transform-origin: top left;
}

.base-input:has(.is-focus)::before {
    transform-origin: top right;
    transform: scaleX(1);
}

.base-input :deep(.el-input__wrapper::before) {
    left: 0;
    transform-origin: bottom left;
}

.base-input:has(.is-focus) :deep(.el-input__wrapper::before) {
    transform-origin: top left;
    transform: scaleY(1);
}

</style>
