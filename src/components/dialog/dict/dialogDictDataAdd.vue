<script setup lang="ts">
// 弹框实例
const formRef = ref();
//sets 弹框设置
const dialogSets: TsDialog.Sets = {
    width: 450,
    beforeClose: onClose
};
//sets 表单设置
const formSets: TsForm.Sets = {
    labelWidth: "7em",
    inline: false,
}
//sets 必填项设置
const setsRequired: TsFormItem.Sets = {
    required: true
}
//sets 字典类型设置
const setsType: TsFormInput.Sets = {
    required: true,
    readonly: true,
}
//ref 弹框开关
let model = ref<TsDialog.Model>(false);
//ref 表单数据
let formModel = reactive<TsDictDataAdd.FormModel>({
    dictType: "",
    dictLabel: "",
    dictValue: "",
    listClass: "info",
    dictSort: 0,
    status: "0",
    remark: "",
});
//api 类型数据
const optionsClass = apiGen.status();
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 提交表单
const {send: sendSubmit} = apiDict.dataAdd(formModel);

//handle 确定
function onConfirm() {
    formRef.value
        .validate()
        .then(() => sendSubmit())
        .then(() => {
            onClose();
            ElMessage({
                type: "success",
                message: "字典数据添加成功",
            });
            accessAction("apiDictData",(api) => api.refresh());
        })
}

//handle 取消
function onClose() {
    formRef.value.resetFields();
    model.value = false;
}

//handle 打开弹框
function open(type: TsDict.Type) {
    model.value = true;
    formModel.dictType = type;
}

defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="model" title="添加字典数据" :sets="dialogSets">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-input label="字典类型" prop="dictType" :sets="setsType"></base-form-input>
            <base-form-input label="数据标签" prop="dictLabel" :sets="setsRequired"></base-form-input>
            <base-form-input label="数据键值" prop="dictValue" :sets="setsRequired"></base-form-input>
            <base-form-select label="回显样式" prop="listClass" :options="optionsClass"></base-form-select>
            <base-form-number label="显示排序" prop="dictSort" :sets="setsRequired"></base-form-number>
            <base-form-radio label="状态" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-input label="备注" prop="remark"></base-form-input>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="onClose"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>