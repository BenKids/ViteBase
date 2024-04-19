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
            pattern: /^1[3-9][0-9]\d{8}$/,
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
</script>
<template>
    <base-form-item :label="label" :prop="prop" :sets="sets" :rules="rules" class="base-form-input">
        <base-input v-bind="$attrs" v-model="model" :sets="sets" :class="props.sets.type"></base-input>
    </base-form-item>
</template>
