<script setup lang="ts">
//sets 角色顺序设置
const roleSortSets: TsFormNumber.Sets = {
    min: 0,
    required: true,
};
//sets 菜单权限设置
const setsMenuIds: TsTree.Sets = {
    showCheckbox: true,
    handleBtn: true,
    checkStrictly: false,
    checkOnClickNode: true,
    expandOnClickNode: true,
};
//ref 表单数据
let formModel = reactive<TsRoleAdd.FormModel>({
    roleName: "",
    roleKey: "",
    roleSort: 0,
    status: "0",
    menuIds: [],
    remark: "",
});
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 菜单权限数据
const {data: optionsMenus} = apiMenus.permi();
//api 提交表单
const {send: sendSubmit} = apiRole.add(formModel);
//cpa 弹框表单组合式函数
const {dialogSets, formRef, formSets, setsRequired, visible, open, confirm, close} = comDialogForm({
    dialogSets: {
        width: 1100,
    },
    formSets: {
        inline: false,
    }
});
//handle 提交
function onConfirm() {
    confirm().then(() => sendSubmit()).then(() => {
        close();
        ElMessage({
            type: "success",
            message: "添加成功",
        });
        accessAction("apiRoleTable", (api) => api.refresh());
    });
}
defineExpose({
    open
})
</script>
<template>
    <base-dialog v-model="visible" title="新增角色" :sets="dialogSets" class="dialog-role-add">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-input label="角色名称" prop="roleName" :sets="setsRequired"></base-form-input>
            <base-form-input label="权限字符" prop="roleKey" :sets="setsRequired"></base-form-input>
            <base-form-number label="角色顺序" prop="roleSort" :sets="roleSortSets"></base-form-number>
            <base-form-radio label="状态" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-item label="菜单权限" prop="menuIds" class="menu-ids">
                <base-tree v-model="formModel.menuIds" :options="optionsMenus" :sets="setsMenuIds" ref="menuIdsRef"></base-tree>
            </base-form-item>
            <base-form-input label="备注" prop="remark"></base-form-input>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="close"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped>
.dialog-role-add :deep(.base-form) {
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

.dialog-role-add :deep(.base-tree) {
    width: 100%;
    height: 100%;
}
</style>
