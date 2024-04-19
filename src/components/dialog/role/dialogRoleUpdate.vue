<script setup lang="ts">
//sets 预设设置
const {setsRequired} = cpaSets();
//sets 其他设置
const {setsDialog, setsRoleSort, setsMenuIds, setsForm} = cpaRoleDialog();
//api 提交表单
const {send: sendSubmit, form, reset, updateForm} = apiRole.update();
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 菜单权限数据
const {data: optionsMenus} = apiMenus.permi();
//api 权限数据
const {send: getMenusPermi} = apiRole.menuPermi();
//cpa 弹框表单组合式api
const {formRef, visible, open: _open, confirm, close} = cpaDialogForm();

//handle 获取数据
function open(row: TsRole.TableItem) {
    _open().then(() => {
        row.roleSort = Number(row.roleSort);
        updateForm(evReObj({
            obj: form.value,
            cover: row
        }))
        return getMenusPermi(row.roleId)
    }).then(res => {
        form.value.menuIds = res;
    })
}

// handle 提交
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
})
</script>
<template>
    <base-dialog v-model="visible" title="修改角色" :sets="setsDialog" @before-close="onCancel" class="dialog-role-update">
        <base-form v-model="form" ref="formRef" :sets="setsForm">
            <base-form-input label="角色名称" v-model="form.roleName" prop="roleName" :sets="setsRequired"></base-form-input>
            <base-form-input label="权限字符" v-model="form.roleKey" prop="roleKey" :sets="setsRequired"></base-form-input>
            <base-form-number label="角色顺序" v-model="form.roleSort" prop="roleSort" :sets="setsRoleSort"></base-form-number>
            <base-form-radio label="状态" v-model="form.status" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-tree label="菜单权限" v-model="form.menuIds" prop="menuIds" :options="optionsMenus" :sets="setsMenuIds" class="menu-ids"></base-form-tree>
            <base-form-input label="备注" v-model="form.remark" prop="remark"></base-form-input>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="onCancel"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped>
.dialog-role-update :deep(.base-form) {
    padding-right: 560px;
    position: relative;
    height: 500px;
}

.menu-ids {
    position: absolute;
    right: 0;
    top: 0;
    width: 560px;
    height: 100%;
    margin-bottom: 0;
}

.dialog-role-update :deep(.base-tree) {
    width: 100%;
    height: 100%;
}
</style>
