<script setup lang="ts">
//sets 预设设置
const {setsRequired} = cpaSets();
//sets 其他设置
const {setsForm,setsDialog} = cpaNoticeDialog();
//api 类型数据
const {data: optionsType} = apiGen.dicts("sys_notice_type");
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_notice_status");
//api 提交表单
const {send: sendSubmit, form, reset} = apiNotice.add();
//cpa 弹框表单组合式api
const {formRef, visible, open, confirm, close} = cpaDialogForm();
//handle 确定
function onConfirm() {
    confirm()
        .then(() => sendSubmit())
        .then(() => close())
}
//handle 取消
function onCancel() {
    close().then(()=>reset())
}
defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="visible" title="新增公告" :sets="setsDialog" @before-close="onCancel">
        <base-form v-model="form" ref="formRef" :sets="setsForm">
            <base-form-input label="公告标题" v-model="form.noticeTitle" prop="noticeTitle" :sets="setsRequired"></base-form-input>
            <base-form-select label="公告类型" v-model="form.noticeType" prop="noticeType" :options="optionsType" :sets="setsRequired"></base-form-select>
            <base-form-radio label="状态" v-model="form.status" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-edit label="内容" v-model="form.noticeContent" prop="noticeContent"></base-form-edit>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="close"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>