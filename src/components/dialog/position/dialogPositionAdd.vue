<script setup lang="ts">
//sets 预设设置
const {setsRequired} = cpaSets();
//sets 其他设置
const {setsDialog,setsForm} = cpaPositionDialog();
//api 表单提交
const {send: sendSubmit, form, reset} = apiPosition.add();
//cpa 状态数据
const {data:optionsStatus} = apiGen.dicts("sys_normal_disable");
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
    close().then(() => reset());
}

defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="visible" title="添加岗位" :sets="setsDialog" @before-close="onCancel">
        <base-form v-model="form" ref="formRef" :sets="setsForm">
            <base-form-input label="岗位名称" v-model="form.postName" prop="postName" :sets="setsRequired"></base-form-input>
            <base-form-input label="岗位编码" v-model="form.postCode" prop="postCode" :sets="setsRequired"></base-form-input>
            <base-form-number label="岗位顺序" v-model="form.postSort" prop="postSort" :sets="setsRequired"></base-form-number>
            <base-form-radio label="岗位状态" v-model="form.status" prop="status" :options="optionsStatus"></base-form-radio>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="onCancel"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>