<script setup lang="ts">
//ref 表单数据
let formModel = reactive<TsDictAdd.FormModel>({
    dictName: "",
    dictType: "",
    status: "0",
    remark: "",
});
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 提交表单
const {send: sendSubmit} = apiDict.add(formModel);
//cpa 弹框表单组合式函数
const {dialogSets, formRef, formSets, setsRequired, visible, open, confirm, close} = comDialogForm({
    dialogSets: {
        width: 450,
    },
    formSets: {
        inline: false,
    }
});

//handle 确定
function onConfirm() {
    confirm()
        .then(() => sendSubmit())
        .then(() => {
            close();
            ElMessage({
                type: "success",
                message: "新增字典类型成功",
            });
            accessAction("apiDictTable", (api) => api.refresh());
        });
}

defineExpose({
    open,
});
</script>
<template>
    <base-dialog v-model="visible" title="添加字典类型" :sets="dialogSets">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-input label="字典名称" prop="dictName" :sets="setsRequired"></base-form-input>
            <base-form-input label="字典类型" prop="dictType" :sets="setsRequired"></base-form-input>
            <base-form-radio label="状态" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-input label="备注" prop="remark"></base-form-input>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="close"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>
