<script setup lang="ts">
//ref 表单数据
let formModel = reactive<TsNoticeAdd.FormModel>({
    noticeTitle: "",
    noticeType: "",
    status: "0",
    noticeContent: "",
});
//api 类型数据
const {data: optionsType} = apiGen.dicts("sys_notice_type");
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_notice_status");
//api 提交表单
const {send: sendSubmit} = apiNotice.add(formModel);
//cpa 弹框表单组合式函数
const {dialogSets, formRef, formSets, setsRequired, visible, open, confirm, close} = comDialogForm({
    dialogSets: {
        width: 1100,
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
                message: "新增公告成功",
            });
            accessAction("apiNoticeTable",(api) => api.refresh());
        })
}

defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="visible" title="新增公告" :sets="dialogSets">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-input label="公告标题" prop="noticeTitle" :sets="setsRequired"></base-form-input>
            <base-form-select label="公告类型" prop="noticeType" :options="optionsType" :sets="setsRequired"></base-form-select>
            <base-form-radio label="状态" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-edit label="内容" prop="noticeContent"></base-form-edit>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="close"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>