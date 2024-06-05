<script setup lang="ts">
//sets 预设设置
const {setsRequired,setsRemark} = cpaSets();
//sets 其他设置
const {setsDialog,setsForm,setsType,setsClass} = cpaDictDataDialog();
//api 类型数据
const optionsClass = apiGen.status();
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 提交表单
const {send: sendSubmit, form, reset} = apiDict.dataAdd();
//cpa 弹框表单组合式api
const {formRef, visible, open: _open, confirm, close} = cpaDialogForm();

//handle 确定
function onConfirm() {
    confirm()
        .then(() => sendSubmit())
        .then(() => close())
}

//handle 打开弹框
function open(type: TsDict.Type) {
    _open().then(() => {
        form.value.dictType = type;
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
    <base-dialog v-model="visible" title="添加字典数据" :sets="setsDialog" @before-close="onCancel">
        <base-form v-model="form" ref="formRef" :sets="setsForm">
            <base-form-input label="字典类型" v-model="form.dictType" prop="dictType" :sets="setsType"></base-form-input>
            <base-form-input label="数据标签" v-model="form.dictLabel" prop="dictLabel" :sets="setsRequired"></base-form-input>
            <base-form-input label="数据键值" v-model="form.dictValue" prop="dictValue" :sets="setsRequired"></base-form-input>
            <base-form-select label="回显样式" v-model="form.listClass" prop="listClass" :options="optionsClass" :sets="setsClass">
                <template #label="{item}">
                    <el-tag :type="item.value">{{item.label}}</el-tag>
                </template>
                <template #option="{option}">
                    <el-tag :type="option.tagType">{{option.label}}</el-tag>
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