<script setup lang="ts">
//ref 表单数据
let formModel = reactive<TsPositionAdd.FormModel>({
    postName: "",
    postCode: "",
    postSort: 0,
    status: "0",
})
//api 状态数据
const { data: statusOptions } = apiGen.dicts("sys_normal_disable");
//api 表单提交
const { send: sendSubmit } = apiPosition.add(formModel);
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
        .then(()=>sendSubmit())
        .then(()=>{
            close();
            ElMessage({
                type: "success",
                message: "添加岗位成功！",
            });
            accessAction("apiPositionTable", (api)=>api.refresh());
        });
}
defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="visible" title="添加岗位" :sets="dialogSets">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-input label="岗位名称" prop="postName" :sets="setsRequired"></base-form-input>
            <base-form-input label="岗位编码" prop="postCode" :sets="setsRequired"></base-form-input>
            <base-form-number label="岗位顺序" prop="postSort" :sets="setsRequired"></base-form-number>
            <base-form-radio label="岗位状态" prop="status" :options="statusOptions"></base-form-radio>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="close"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>