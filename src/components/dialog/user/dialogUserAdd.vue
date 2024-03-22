<script setup lang="ts">
//? 表单实例
const formRef = ref();
//* 弹框设置
const dialogSets: TsDialog.Sets = {
    width: 750,
    beforeClose: (done) => {
        formRef.value.clearValidate();
        done();
    },
};
//* 表单设置
const formSets: TsForm.Sets = {
    labelWidth: "7em",
};
//* 部门设置
const setsTree: TsFormTreeSelect.Sets = {
    required: true,
    checkStrictly: true,
    expandOnClickNode: false,
}
//* 岗位设置
const setsPostIds: TsFormSelect.Sets = {
    multiple: true,
};
//* 角色设置
const setsRoleIds: TsFormSelect.Sets = {
    multiple: true,
};
//* 用户密码设置
const setsPassword: TsFormInput.Sets = {
    required: true,
    type: "password",
    showPassword: true,
};
//* 备注设置
const setsRemark: TsFormInput.Sets = {
    autosize: {
        minRows: 3,
    }
}
//* 必填项
const setsRequired: TsFormItem.Sets = {
    required: true,
};
//ref 弹框开关
let model = ref<TsDialog.Model>(false);
//ref 表单数据
let formModel = reactive<TsUserAdd.FormModel>({
    nickName: "",
    deptId: "",
    phonenumber: "",
    email: "",
    userName: "",
    password: "123456",
    sex: "",
    status: "0",
    postIds: [],
    roleIds: [],
    remark: "",
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

//todo 打开弹框
function open() {
    model.value = true;
}

//todo 确定
const {send: sendSubmit} = apiUser.add(formModel);

function onConfirm() {
    formRef.value
        .validate()
        .then(() => {
            return sendSubmit();
        })
        .then(() => {
            ElMessage({
                type: "success",
                message: "添加成功！",
            });
            onClose();
            accessAction("apiUserTable", (api) => api.refresh());
        });
}

//todo 取消
function onClose() {
    formRef.value.clearValidate();
    model.value = false;
}

defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="model" title="新增用户" :sets="dialogSets">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-input label="用户昵称" prop="nickName" :sets="setsRequired"></base-form-input>
            <base-form-tree-select label="归属部门" prop="deptId" :options="optionsDeptId"
                                   :sets="setsTree"></base-form-tree-select>
            <base-form-input label="手机号码" prop="phonenumber"></base-form-input>
            <base-form-input label="邮箱" prop="email"></base-form-input>
            <base-form-input label="用户名称" prop="userName" :sets="setsRequired"></base-form-input>
            <base-form-input label="用户密码" prop="password" :sets="setsPassword"></base-form-input>
            <base-form-select label="用户性别" prop="sex" :options="optionsSex"></base-form-select>
            <base-form-radio label="状态" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-select label="岗位" prop="postIds" :options="optionsPostIds"
                              :sets="setsPostIds"></base-form-select>
            <base-form-select label="角色" prop="roleIds" :options="optionsRoleIds"
                              :sets="setsRoleIds"></base-form-select>
            <base-form-input label="备注" prop="remark" :sets="setsRemark"></base-form-input>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="onClose"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped>
.base-form :deep(.base-input.textarea) {
    width: 562px;
}
</style>