<script setup lang="ts">
//sets 归属部门设置
const setsDeptId: TsFormTreeSelect.Sets = {
    required: true,
    expandOnClickNode: false,
    checkStrictly: true,
}
//sets 岗位设置
const setsPostIds: TsFormSelect.Sets = {
    multiple: true,
};
//sets 角色设置
const setsRoleIds: TsFormSelect.Sets = {
    multiple: true,
};
//ref 表单数据
let formModel = reactive<TsUserEdit.FormModel>({
    userId: "",
    nickName: "",
    deptId: "",
    phonenumber: "",
    email: "",
    sex: "",
    status: "",
    postIds: [],
    roleIds: [],
    remark: "",
    userName: "",
    password: "",
});

//api 归属部门数据
const {data: optionsDeptId} = apiDept.tree();
//api 用户性别数据
const {data: optionsSex} = apiGen.dicts("sys_user_sex");
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 岗位数据
const {data: optionsPostIds} = apiPosition.select();
//api 角色数据
const {data: optionsRoleIds} = apiRole.select();
//api 表单数据
const {send: getData} = apiUser.msg();
//api 提交表单
const {send: sendSubmit} = apiUser.update(formModel);
//composable 弹框表单组合式函数
const {dialogSets, formRef, formSets, setsRequired, visible, confirm, close} = comDialogForm();

//handle 确定
function onConfirm() {
    confirm().then(() => sendSubmit()).then(() => {
        ElMessage({
            type: "success",
            message: "修改成功！",
        });
        accessAction("apiUserTable", (api) => api.refresh());
        close();
    })
}

//handle 打开弹框
function open(id: TsUser.Id) {
    visible.value = true;
    getData(id).then((data) => {
        evReObj({
            obj: formModel,
            cover: data,
        });
    })
}

defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="visible" title="修改用户" :sets="dialogSets">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-input label="用户昵称" prop="nickName" :sets="setsRequired"></base-form-input>
            <base-form-tree-select label="归属部门" prop="deptId" :options="optionsDeptId" :sets="setsDeptId"></base-form-tree-select>
            <base-form-input label="手机号码" prop="phonenumber"></base-form-input>
            <base-form-input label="邮箱" prop="email"></base-form-input>
            <base-form-select label="用户性别" prop="sex" :options="optionsSex"></base-form-select>
            <base-form-radio label="状态" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-select label="岗位" prop="postIds" :options="optionsPostIds" :sets="setsPostIds"></base-form-select>
            <base-form-select label="角色" prop="roleIds" :options="optionsRoleIds" :sets="setsRoleIds"></base-form-select>
            <base-form-input label="备注" prop="remark"></base-form-input>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="close"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped>
.base-form :deep(.base-radio) {
    width: var(--base-input-width);
}
</style>
