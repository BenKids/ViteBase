<script setup lang="ts">
//sets 预设设置
import {cpaDialogForm} from "@/assets/ts/composable.ts";
import BaseDialog from "@/components/base/baseDialog.vue";

const {setsRequired,setsRemark} = cpaSets();
//sets 其他设置
const {setsDialog,setsForm,setsType} = cpaDictDataDialog();
//api 类型数据
const optionsClass = apiGen.status();
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 提交表单
const {send: sendSubmit, form, reset, updateForm} = apiDict.dataUpdate();
//api 修改数据信息获取
const {send: sendDataMsg} = apiDict.dataMsg();
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
        .then(() => sendDataMsg(id))
        .then(res => {
            updateForm(evReObj({
                obj: form.value,
                cover: res
            }))
        })
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
    <base-dialog v-model="visible" title="修改数据字典" :sets="setsDialog" @before-close="onCancel">
        <base-form v-model="form" ref="formRef" :sets="setsForm">
            <base-form-input label="字典类型" v-model="form.dictType" prop="dictType" :sets="setsType"></base-form-input>
            <base-form-input label="数据标签" v-model="form.dictLabel" prop="dictLabel" :sets="setsRequired"></base-form-input>
            <base-form-input label="数据键值" v-model="form.dictValue" prop="dictValue" :sets="setsRequired"></base-form-input>
            <base-form-select label="回显样式" v-model="form.listClass" prop="listClass" :options="optionsClass">
                <template #option="{option}">
                    <el-tag :type="option.value" effect="dark" style="margin-right:10px;"></el-tag>
                    <span>{{option.label}}</span>
                </template>
            </base-form-select>
            <base-form-number label="显示排序" v-model="form.dictSort" prop="dictSort" :sets="setsRequired"></base-form-number>
            <base-form-radio label="状态" v-model="form.status" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-input label="备注" v-model="form.remark" prop="remark" :sets="setsRemark"></base-form-input>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="onCancel"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped>
.el-tag {
    border: none;
    aspect-ratio: 1;
}
</style>