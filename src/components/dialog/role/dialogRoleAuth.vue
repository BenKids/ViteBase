<script setup lang="ts">
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
    showCheckbox: true,
    handleBtn: true,
    checkOnClickNode: true,
};
//ref 表单数据
let formModel = reactive<TsRoleAuth.FormModel>({
    roleId: "",
    roleName: "",
    roleKey: "",
    dataScope: "",
    deptCheckStrictly: false,
    deptIds: [],
});
//ref 数据权限数据
let optionsDept = reactive<TsTree.Options>([]);
//api 权限范围数据
const optionsAuth = apiRole.auth();
//api 数据权限数据
const {send: sendDept} = apiDept.roleId();
//api 提交表单
const {send: sendSubmit} = apiRole.updatePermit(formModel);
//composable 弹框表单组合式函数
const {dialogSets, formRef, formSets, visible, confirm, close} = comDialogForm({
    dialogSets: {
        width: 500,
    },
    formSets: {
        inline: false,
    }
});

//handle 数据回显
async function open(row: TsRole.TableItem) {
    visible.value = true;
    formModel = evReObj({
        obj: formModel,
        cover: row,
    });
    const deptObj = await sendDept(row.roleId);
    optionsDept = deptObj.depts;
    formModel.deptIds = deptObj.checkedKeys;
}

//handle 确定
function onConfirm() {
    confirm().then(() => sendSubmit()).then(() => {
        ElMessage({
            type: "success",
            message: "数据权限修改成功",
        });
        accessAction("apiRoleTable", (el) => el.refresh());
        close();
    });
}

defineExpose({
    open,
});
</script>
<template>
    <base-dialog v-model="visible" title="分配数据权限" :sets="dialogSets" class="dialog-role-auth">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-input label="角色名称" prop="roleName" :sets="roleNameSets"></base-form-input>
            <base-form-input label="权限字符" prop="roleKey" :sets="roleKeySets"></base-form-input>
            <base-form-select label="权限范围" prop="dataScope" :options="optionsAuth"></base-form-select>
            <base-form-item label="数据权限" prop="deptIds" v-if="formModel.dataScope == '2'">
                <base-tree v-model="formModel.deptIds" :options="optionsDept" :sets="deptSets"></base-tree>
            </base-form-item>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="close"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped>
.dialog-role-auth :deep(.base-tree) {
    width: 100%;
    height: 350px;
}
</style>
