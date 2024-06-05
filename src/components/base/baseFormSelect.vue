<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: TsFormSelect.Model;
        prop: TsFormSelect.Prop;
        options: TsFormSelect.Options;
        label?: TsFormSelect.Label;
        sets?: TsFormSelect.Sets;
    }>(),
    {
        sets: () => {
            return {};
        },
    }
);
const emits = defineEmits(["update:modelValue"]);
let model = useVModel(props,"modelValue",emits);
const rules = computed(() => {
    if (!props.sets || !props.sets.required) return undefined;
    let r: TsElement.FormItemRule[] = [{
        required: true,
        message: "请选择" + props.label,
        trigger: "change",
    }];
    if (typeof (props.sets.required) == "function") {
        r.push({
            validator: props.sets.required,
            trigger: "change",
        })
    } else if (typeof (props.sets.required) == "object") {
        return props.sets.required;
    }
    return r;
});
const slots = reactive({
    append: false,
    prepend: false,
    option: false,
    label: false,
})
const getSlots = useSlots();
onMounted(()=>{
    if(getSlots.append) {
        slots.append = true;
    }
    if(getSlots.prepend) {
        slots.prepend = true;
    }
    if(getSlots.option) {
        slots.option = true;
    }
    if(getSlots.label) {
        slots.label = true;
    }
})
</script>
<template>
    <base-form-item :label="label" :prop="prop" :rules="rules" :sets="sets" class="base-form-select">
        <div class="base-form-select-prepend" v-if="slots.prepend">
            <slot name="prepend"></slot>
        </div>
        <base-select v-bind="$attrs" v-model="model" :options="options" :sets="sets">
            <template #label="item" v-if="slots.label">
                <slot name="label" :item="item.option"></slot>
            </template>
            <template #option="item" v-if="slots.option">
                <slot name="option" :option="item.option"></slot>
            </template>
        </base-select>
        <div class="base-form-select-append" v-if="slots.append">
            <slot name="append"></slot>
        </div>
    </base-form-item>
</template>
<style scoped>
.base-form-select-prepend {
    margin-right: var(--base-gap);
}
.base-form-select-append {
    margin-left: var(--base-gap);
}
.base-form-select :deep(.el-form-item__content) {
    width: var(--base-input-width);
}
.base-form-select :deep(.base-select) {
    flex: 1;
    width: initial;
}
</style>