<script setup lang="ts">
//sets 弹框设置
const setsDialog: TsDialog.Sets = {
    width: 500,
}
//sets 表单设置
const setsForm: TsForm.Sets = {
    inline: false,
}
//sets 角色名称设置
const roleNameSets: TsFormInput.Sets = {
    readonly: true,
};
//sets 权限字符设置
const roleKeySets: TsFormInput.Sets = {
    readonly: true,
};
//sets 数据权限设置
const deptSets: TsTree.Sets = {
    accordion: false,
    showCheckbox: true,
    handleBtn: true,
    checkOnClickNode: true,
};
//ref 数据权限数据
let optionsDept = reactive<TsTree.Options>([]);
//api 权限范围数据
const optionsAuth = apiRole.auth();
//api 数据权限数据
const {send: sendDept} = apiDept.roleId();
//api 提交表单
const {send: sendSubmit, form, reset, updateForm} = apiRole.updatePermit();
//cpa 弹框表单组合式api
const {formRef, visible, open: _open, confirm, close} = cpaDialogForm();

//handle 数据回显
async function open(row: TsRole.TableItem) {
    _open().then(() => {
        updateForm(evReObj({
            obj: form.value,
            cover: row,
        }))
        return sendDept(row.roleId)
    }).then(res => {
        optionsDept = res.depts;
        form.value.deptIds = res.checkedKeys;
    });
}

//handle 确定
function onConfirm() {
    confirm()
        .then(() => sendSubmit())
        .then(() => close());
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
    <base-dialog v-model="visible" title="分配数据权限" :sets="setsDialog" @before-close="onCancel" class="dialog-role-auth">
        <base-form v-model="form" ref="formRef" :sets="setsForm">
            <base-form-input label="角色名称" v-model="form.roleName" prop="roleName" :sets="roleNameSets"></base-form-input>
            <base-form-input label="权限字符" v-model="form.roleKey" prop="roleKey" :sets="roleKeySets"></base-form-input>
            <base-form-select label="权限范围" v-model="form.dataScope" prop="dataScope" :options="optionsAuth"></base-form-select>
            <base-form-tree label="数据权限" v-model="form.deptIds" prop="deptIds" :options="optionsDept" :sets="deptSets" v-if="form.dataScope == '2'"></base-form-tree>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="onCancel"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped>
.dialog-role-auth :deep(.base-tree) {
    width: 100%;
    height: 350px;
}
</style>
