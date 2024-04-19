<script setup lang="ts">
//sets 预设设置
const {setsRequired} = cpaSets();
//sets 其他设置
const {setsDialog, setsForm} = cpaDictDialog();
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 字典数据
const {send: sendGet} = apiDict.msg();
//api 提交数据
const {send: sendSubmit, form, reset, updateForm} = apiDict.update();
//cpa 弹框表单组合式api
const {formRef, visible, open: _open, confirm, close} = cpaDialogForm();

//handle 确定
function onConfirm() {
    confirm()
        .then(() => sendSubmit())
        .then(() => close())
}

//handle 打开弹框
function open(id: TsDict.Id) {
    _open()
        .then(() => sendGet(id))
        .then(res => {
            updateForm(evReObj({
                obj: form.value,
                cover: res,
            }))
        })
}

//handle 取消
function onCancel() {
    close().then(() => reset());
}

defineExpose({
    open,
});
</script>
<template>
    <base-dialog v-model="visible" title="修改字典类型" :sets="setsDialog" @before-close="onCancel">
        <base-form v-model="form" ref="formRef" :sets="setsForm">
            <base-form-input label="字典名称" v-model="form.dictName" prop="dictName" :sets="setsRequired"></base-form-input>
            <base-form-input label="字典类型" v-model="form.dictType" prop="dictType" :sets="setsRequired"></base-form-input>
            <base-form-radio label="状态" v-model="form.status" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-input label="备注" v-model="form.remark" prop="remark"></base-form-input>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="onCancel"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>
