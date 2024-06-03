<script setup lang="ts">
//sets 预设设置
const {setsRequired} = cpaSets();
//sets 其他设置
const {setsDialog, setsForm} = cpaConfigDialog();
//cpa 弹框表单组合式函数
const {formRef, visible, open: _open, confirm, close} = cpaDialogForm();
//api 获取参数信息
const {send: getMsg} = apiConfig.msg();
//api 提交数据
const {send: sendSubmit, form, reset} = apiConfig.update();
//api 系统内置数据
const {data:optionsConfigType} = apiGen.dicts("sys_yes_no");
//handle 确定
function onConfirm() {
    confirm()
        .then(() => sendSubmit())
        .then(() => {
            visible.value = false;
        })
}

//handle 取消
function onCancel() {
    close().then(() => reset());
}

//handle 打开弹框
function open(id: TsConfig.Id) {
    _open()
        .then(() => getMsg(id))
        .then((res) => {
            evReObj({
                obj: form.value,
                cover: res,
            })
        })
}

defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="visible" title="修改参数" :sets="setsDialog" @before-close="onCancel">
        <base-form v-model="form" ref="formRef" :sets="setsForm">
            <base-form-input label="参数名称" v-model="form.configName" prop="configName" :sets="setsRequired"></base-form-input>
            <base-form-input label="参数键名" v-model="form.configKey" prop="configKey" :sets="setsRequired"></base-form-input>
            <base-form-input label="参数键值" v-model="form.configValue" prop="configValue" :sets="setsRequired"></base-form-input>
            <base-form-radio label="系统内置" v-model="form.configType" prop="configType" :options="optionsConfigType"></base-form-radio>
            <base-form-input label="备注" v-model="form.remark" prop="remark"></base-form-input>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="onCancel"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>