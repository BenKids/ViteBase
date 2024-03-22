<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: TsForm.Model,
    sets?: TsForm.Sets
}>(),{
    sets: () => {
        return {}
    }
})
const formRef = ref<TsElement.FormInstance>();
function resetFields() {
    if(!formRef.value) return;
    formRef.value.resetFields();
}
function validate() {
    return new Promise(function(resolve,reject) {
        if (!formRef.value) return;
        formRef.value.validate((valid, fields) => {
            if (valid) {
                resolve(true);
            } else {
                if(props.sets.errorAlert != false) {
                    for (const key in fields) {
                        const item = fields[key][0];
                        ElMessage({
                            type: "error",
                            message: item.message,
                        });
                    }
                }
                reject(fields);
            }
        })
    })
}
function validateField(params: string) {
    return new Promise(function(resolve,reject) {
        if (!formRef.value) return;
        formRef.value.validateField(params,(valid, fields) => {
            if (valid) {
                resolve(true);
            } else {
                reject(fields![params]);
            }
        })
    })
}
function clearValidate() {
    if(!formRef.value) return;
    formRef.value.clearValidate();
}
let handle = ref<boolean>(true);
onMounted(()=>{
    const slots = useSlots()
    handle.value = "handle" in slots;
})
defineExpose({
    resetFields,
    validate,
    validateField,
    clearValidate,
})
</script>

<template>
    <el-form
        class="base-form"
        ref="formRef"
        :model="modelValue"
        :inline="sets.inline ?? true"
        :label-width="sets.labelWidth"
        :label-position="sets.labelPosition"
        :size="sets.size"
        :disabled="sets.disabled"
    >
        <slot></slot>
        <el-form-item v-if="handle"><slot name="handle"></slot></el-form-item>
    </el-form>
</template>
<style scoped>
.base-form-item-none {
    display: none;
}
</style>
<style>
.base-form:not(.el-form--inline) .base-form-tree-select .base-tree-select,
.base-form:not(.el-form--inline) .base-tree-select,
.base-form:not(.el-form--inline) .base-form-select .base-select,
.base-form:not(.el-form--inline) .base-form-number .base-number ,
.base-form:not(.el-form--inline) .base-input,
.base-form:not(.el-form--inline) .base-date-picker {
	width: 100%;
}

.base-form :deep(.el-form--inline .el-form-item) {
	vertical-align: initial;
}
</style>