<script setup lang="ts">
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
const slots = reactive({
    prepend: false,
    append: false,
});
const getSlots = useSlots();
const tableIn = inject("tableIn", false);
onMounted(() => {
    if (getSlots.prepend) {
        slots.prepend = true;
    }
    if (getSlots.append) {
        slots.append = true;
    }
});
const inputRef = ref();
let isEdit = ref<TsInput.Edit>(false);

function onText() {
    isEdit.value = true;
    nextTick(() => {
        inputRef.value.focus();
    });
}

function onBlur(val: FocusEvent) {
    if (tableIn) isEdit.value = false;
    emits("blur", val);
}

let showTooltip = ref<boolean>(false);

async function fnShowTooltip() {
    if (tableIn) return;
    else if (props.sets.showTooltip !== undefined) {
        showTooltip.value = props.sets.showTooltip;
    } else if (props.sets.readonly) {
        await nextTick();
        const node = inputRef.value;
        if (!node) return;
        showTooltip.value = node.scrollWidth > node.clientWidth;
    }
}
</script>
<template>
    <div
        v-if="tableIn && !isEdit"
        @click="onText"
        :class="{
          'el-input__inner': true,
          'view-text-input': true,
          placeholder: !model,
        }">
        {{ model || sets.placeholder || "请输入" }}
        <el-icon>
            <IconSolarPen2Linear/>
        </el-icon>
    </div>
    <div class="base-input-box" v-else-if="!sets.readonly">
        <el-input
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
        <span class="base-input-border-bottom"></span>
        <span class="base-input-border-right"></span>
        <span class="base-input-border-top"></span>
        <span class="base-input-border-left"></span>
    </div>
    <el-tooltip v-else :disabled="!showTooltip" placement="top" popper-class="base-tooltip-input">
        <template #content>
            <div>{{ model }}</div>
        </template>
        <div :class="'base-input readonly ' + (sets.type || '') + (model === '' ? ' placeholder' : '')" ref="inputRef">
            {{ model || sets.readonlyPlaceholder || sets.placeholder || '暂无数据' }}
        </div>
    </el-tooltip>
</template>

<style scoped>
.base-input {
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
    padding: 0;
    background-color: transparent;
}

.view-text-input {
    text-align: left;
    cursor: text;
    position: relative;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-right: 20px;
}

.view-text-input :deep(.el-icon) {
    position: absolute;
    right: 0;
    top: 8px;
    color: var(--el-text-color-placeholder);
}

.base-input.readonly.placeholder,
.view-text-input.placeholder {
    color: var(--el-text-color-placeholder);
}
.base-input-box {
    position: relative;
}
.base-input-box :deep(.el-input__wrapper.is-focus) {
    box-shadow: none;
}
.base-input ~ span {
    position: absolute;
    background-color: var(--base-color-primary);
    transition: transform 0.5s ease;
}
.base-input-border-bottom,
.base-input-border-top {
    height: 1px;
    left: 0;
    right: 0;
    transform: scaleX(0);
}

.base-input-border-left,
.base-input-border-right {
    width: 1px;
    top: 0;
    bottom: 0;
    transform: scaleY(0);
}

.base-input-border-bottom {
    bottom: 0;
    transform-origin: bottom right;
}

.base-input:has(.is-focus) ~ .base-input-border-bottom {
    transform-origin: bottom left;
    transform: scaleX(1);
}

.base-input-border-right {
    right: 0;
    transform-origin: top right;
}

.base-input:has(.is-focus) ~ .base-input-border-right {
    transform-origin: bottom right;
    transform: scaleY(1);
}

.base-input-border-top {
    top: 0;
    transform-origin: top left;
}

.base-input:has(.is-focus) ~ .base-input-border-top {
    transform-origin: top right;
    transform: scaleX(1);
}

.base-input-border-left {
    left: 0;
    transform-origin: bottom left;
}

.base-input:has(.is-focus) ~ .base-input-border-left {
    transform-origin: top left;
    transform: scaleY(1);
}
</style>
