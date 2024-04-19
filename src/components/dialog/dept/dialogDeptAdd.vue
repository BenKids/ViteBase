<script setup lang="ts">
//sets 预设设置
const {setsRequired,setsPhonenumber, setsEmail,} = cpaSets();
//sets 其他设置
const {setsDialog, setsForm, setsDeptId, setsOrderNum} = cpaDeptDialog();
//api 上级部门数据
const {data: optionsDeptId} = apiDept.tree();
//api 部门状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 提交数据
const {send: sendSubmit, form, reset} = apiDept.deptAdd();
//cpa 弹框表单组合式api
const {formRef, visible, open: _open, confirm, close} = cpaDialogForm();

//handle 确定
function onConfirm() {
    confirm()
        .then(() => sendSubmit())
        .then(() => close())
}

//handle 打开弹框
function open(id?: TsDept.DeptId) {
    _open().then(() => {
        if (id !== undefined) form.value.parentId = id;
    });
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
    <base-dialog v-model="visible" title="新增部门" :sets="setsDialog" @before-close="onCancel">
        <base-form v-model="form" ref="formRef" :sets="setsForm">
            <base-form-tree-select label="上级部门" v-model="form.parentId" prop="parentId" :options="optionsDeptId" :sets="setsDeptId"></base-form-tree-select>
            <base-form-input label="部门名称" v-model="form.deptName" prop="deptName" :sets="setsRequired"></base-form-input>
            <base-form-number label="显示顺序" v-model="form.orderNum" prop="orderNum" :sets="setsOrderNum"></base-form-number>
            <base-form-input label="负责人" v-model="form.leader" prop="leader"></base-form-input>
            <base-form-input label="联系电话" v-model="form.phone" prop="phone" :sets="setsPhonenumber"></base-form-input>
            <base-form-input label="邮箱" v-model="form.email" prop="email" :sets="setsEmail"></base-form-input>
            <base-form-radio label="部门状态" v-model="form.status" prop="status" :options="optionsStatus"></base-form-radio>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="onCancel"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>
