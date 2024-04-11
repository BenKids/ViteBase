<script setup lang="ts">
// 菜单权限实例
const menuIdsRef = ref();
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
}
//ref 表单数据
let formModel = reactive<TsRoleUpdate.FormModel>({
    roleId: "",
    roleName: "",
    roleKey: "",
    roleSort: 0,
    status: "0",
    menuIds: [],
    remark: "",
});
//ref 传递参数
let roleId = ref<TsRole.RoleId>("");
//api 权限数据
const {send: getMenusPermi} = apiRole.menuPermi(roleId);



//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 菜单权限数据
const {data: optionsMenus} = apiMenus.permi();
//handle 确定
const {send: sendSubmit} = apiRole.update(formModel);
//composable 弹框表单组合式函数
const {dialogSets, formRef, formSets, setsRequired, visible, open:onOpen, confirm, close} = comDialogForm({
    dialogSets: {
        width: 1100,
    },
    formSets: {
        inline: false,
    }
});
//handle 获取数据
async function open(row: TsRole.TableItem) {
    row.roleSort = Number(row.roleSort);
    formModel = evReObj({
        obj: formModel,
        cover: row
    });
    roleId.value = row.roleId;
    formModel.menuIds = await getMenusPermi();
    onOpen();
}
function onConfirm() {
    confirm().then(() => sendSubmit()).then(() => {
        ElMessage({
            type: "success",
            message: "修改成功",
        });
        accessAction("apiRoleTable", (api) => api.refresh());
        onClose();
    });
}

//handle 取消
function onClose() {
    menuIdsRef.value.reset();
    close();
}

defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="visible" title="修改角色" :sets="dialogSets">
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
            <base-button label="取消" @click="onClose"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped>
.base-form {
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

.base-tree {
    width: 100%;
    height: 100%;
}
</style>
