<script setup lang="ts">
//sets 预设设置
const {setsRequired, setsPhonenumber, setsEmail, setsRemark, setsPassword} = cpaSets();
//sets 其他设置
const {setsDialog, setsForm, setsDeptId, setsPostIds, setsRoleIds} = cpaUserDialog();
//api 表单数据
const {form, send: sendSubmit, reset} = apiUser.add();
//api 用户性别数据
const {data: optionsSex} = apiGen.dicts("sys_user_sex");
//api 岗位数据
const {data: optionsPostIds} = apiPosition.select();
//api 角色数据
const {data: optionsRoleIds} = apiRole.select();
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 部门数据
const {data: optionsDeptId} = apiDept.tree();
//cpa 弹框表单组合函数
const {formRef, visible, open, confirm, close} = cpaDialogForm();

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

defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="visible" title="新增用户" :sets="setsDialog" @before-close="onCancel">
        <base-form v-model="form" ref="formRef" :sets="setsForm">
            <base-form-input label="用户昵称" v-model="form.nickName" prop="nickName" :sets="setsRequired"></base-form-input>
            <base-form-tree-select label="归属部门" v-model="form.deptId" prop="deptId" :options="optionsDeptId" :sets="setsDeptId"></base-form-tree-select>
            <base-form-input label="手机号码" v-model="form.phonenumber" prop="phonenumber" :sets="setsPhonenumber"></base-form-input>
            <base-form-input label="邮箱" v-model="form.email" prop="email" :sets="setsEmail"></base-form-input>
            <base-form-input label="用户名称" v-model="form.userName" prop="userName" :sets="setsRequired"></base-form-input>
            <base-form-input label="用户密码" v-model="form.password" prop="password" :sets="setsPassword"></base-form-input>
            <base-form-select label="用户性别" v-model="form.sex" prop="sex" :options="optionsSex"></base-form-select>
            <base-form-radio label="状态" v-model="form.status" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-select label="岗位" v-model="form.postIds" prop="postIds" :options="optionsPostIds" :sets="setsPostIds"></base-form-select>
            <base-form-select label="角色" v-model="form.roleIds" prop="roleIds" :options="optionsRoleIds" :sets="setsRoleIds"></base-form-select>
            <base-form-input label="备注" v-model="form.remark" prop="remark" :sets="setsRemark"></base-form-input>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="onCancel"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped>
.base-form :deep(.base-input.textarea) {
    width: 562px;
}
</style>