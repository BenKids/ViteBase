<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: TsDialog.Model;
    }>(),
    {}
);
const dialogSets: TsDialog.Sets = {
    width: 450,
    beforeClose: (done) => {
        done();
    },
};
const emits = defineEmits(["update:modelValue"]);
const model = computed({
    get: () => props.modelValue,
    set: (val) => emits("update:modelValue", val),
});
//* 表单设置
const formSets:TsForm.Sets = {
    inline: false,
}
//? 表单实例
const formRef = ref();
//ref 表单数据
let formModel = reactive<TsPositionAdd.FormModel>({
    postName: "",
    postCode: "",
    postSort: 0,
    status: "0",
})
//* 表单必填项
const setsRequired: TsFormItem.Sets = {
    required: true,
}
//api 状态数据
const { data: statusOptions } = apiGen.dicts("sys_normal_disable");
//api 表单提交
const { send: sendSubmit } = apiPosition.add(formModel);
//todo 确定
function onConfirm() {
    formRef.value
        .validate()
        .then(()=>{
            return sendSubmit();
        })
        .then(()=>{
            ElMessage({
                type: "success",
                message: "添加岗位成功！",
            });
            formRef.value.resetFields();
            onClose();
            accessAction("apiPositionTable", (api)=>{
                api.refresh();
            });
        });
}
//todo 取消
function onClose() {
    model.value = false;
}
</script>
<template>
    <base-dialog v-model="model" title="添加岗位" :sets="dialogSets">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-input label="岗位名称" prop="postName" :sets="setsRequired"></base-form-input>
            <base-form-input label="岗位编码" prop="postCode" :sets="setsRequired"></base-form-input>
            <base-form-number label="岗位顺序" prop="postSort" :sets="setsRequired"></base-form-number>
            <base-form-radio label="岗位状态" prop="status" :options="statusOptions"></base-form-radio>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="onClose"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>