<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: TsFormInput.Model;
        prop: TsFormInput.Prop;
        label?: TsFormInput.Label;
        sets?: TsFormInput.Sets;
    }>(),
    {
        sets: () => {
            return {};
        },
    }
);
const emits = defineEmits(["update:modelValue"]);
let model = useVModel(props, "modelValue", emits);
const rules = computed(() => {
    if (!props.sets || (!props.sets.required && !props.sets.type)) {
        return undefined;
    } else if (typeof (props.sets.required) == "object") {
        return props.sets.required;
    }
    let r: TsElement.FormItemRule[] = [];
    if (typeof (props.sets.required) == "function") {
        r.push({
            validator: props.sets.required,
            trigger: "blur",
        })
    } else if (props.sets.type == 'phone') {
        r = [{
            required: props.sets.required,
            pattern: regPhone,
            message: "请输入正确的手机号码",
            trigger: "blur"
        }]
        props.sets.type = "text";
    } else if (props.sets.type == "email") {
        r = [{
            required: props.sets.required,
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
        }]
        props.sets.type = "text";
    } else if (props.sets.type == 'idCard') {
        r = [{
            required: props.sets.required,
            pattern: regIdCard,
            message: "请输入正确的身份证号",
            trigger: "blur"
        }]
        props.sets.type = "text";
    } else if(props.sets.required) {
        r = [{
            required: true,
            message: props.label ? ("请输入" + props.label) : props.sets.placeholder,
            trigger: "blur",
        }]
    }
    return r;
});
if (props.label && props.label.indexOf("备注") >= 0) {
    props.sets.type = "textarea";
}
const slots = reactive({
    append: false,
    prepend: false,
})
const getSlots = useSlots();
onMounted(()=>{
    if(getSlots.append) {
        slots.append = true;
    }
    if(getSlots.prepend) {
        slots.prepend = true;
    }
})
</script>
<template>
    <base-form-item :label="label" :prop="prop" :sets="sets" :rules="rules" class="base-form-input">
        <div class="base-form-input-prepend" v-if="slots.prepend">
            <slot name="prepend"></slot>
        </div>
        <base-input v-bind="$attrs" v-model="model" :sets="sets" :class="props.sets.type"></base-input>
        <div class="base-form-input-append" v-if="slots.append">
            <slot name="append"></slot>
        </div>
    </base-form-item>
</template>
<style scoped>
.base-form-input-prepend {
    margin-right: var(--base-gap);
}
.base-form-input-append {
    margin-left: var(--base-gap);
}
.base-form-input :deep(.el-form-item__content) {
    width: var(--base-input-width);
}
.base-form-input :deep(.base-input) {
    flex: 1;
    width: initial;
}
</style>