<script setup lang="ts">
//sets 上级部门设置
const setsDeptId: TsFormTreeSelect.Sets = {
    required: true,
    checkStrictly: true,
    expandOnClickNode: false,
}
//sets 显示顺序设置
const setsOrderNum: TsFormNumber.Sets = {
    min: 0,
    required: true,
};
//sets 联系电话设置
const setsPhone: TsFormInput.Sets = {
    required: 'phone',
}
//sets 邮箱设置
const setsEmail: TsFormInput.Sets = {
    required: "email",
}
//ref 表单数据
let formModel = reactive<TsDeptAdd.FormModel>({
    parentId: "",
    deptName: "",
    orderNum: 0,
    leader: "",
    phone: "",
    email: "",
    status: "0",
});
//api 上级部门数据
const {data: optionsDeptId} = apiDept.tree();
//api 部门状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 提交数据
const {send: sendSubmit} = apiDept.deptAdd(formModel);
//cpa 弹框表单组合式函数
const {dialogSets, formRef, formSets, setsRequired, visible, open: onOpen, confirm, close} = comDialogForm();

//handle 确定
function onConfirm() {
    confirm()
        .then(() => sendSubmit())
        .then(() => {
            ElMessage({
                type: "success",
                message: "添加成功",
            })
            close();
            accessAction("apiDeptTable", (api) => api.send());
            accessAction("apiDeptTree", (api) => api.send());
        });
}

//handle 打开弹框
function open(id?: TsDept.DeptId) {
    onOpen();
    nextTick(() => {
        if (id !== undefined) formModel.parentId = id;
    })
}

defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="visible" title="新增部门" :sets="dialogSets">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-tree-select label="上级部门" prop="parentId" :options="optionsDeptId" :sets="setsDeptId"></base-form-tree-select>
            <base-form-input label="部门名称" prop="deptName" :sets="setsRequired"></base-form-input>
            <base-form-number label="显示顺序" prop="orderNum" :sets="setsOrderNum"></base-form-number>
            <base-form-input label="负责人" prop="leader"></base-form-input>
            <base-form-input label="联系电话" prop="phone" :sets="setsPhone"></base-form-input>
            <base-form-input label="邮箱" prop="email" :sets="setsEmail"></base-form-input>
            <base-form-radio label="部门状态" prop="status" :options="optionsStatus"></base-form-radio>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="close"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>
