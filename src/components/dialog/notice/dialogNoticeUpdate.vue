<script setup lang="ts">
// 弹框实例
const formRef = ref();
//sets 弹框设置
const dialogSets: TsDialog.Sets = {
    width: 1100,
    beforeClose: onClose
};
//sets 表单设置
const formSets: TsForm.Sets = {
    labelWidth: "7em",
}
//sets 必填项设置
const setsRequired: TsFormItem.Sets = {
    required: true
}
//ref 弹框开关
let model = ref<TsDialog.Model>(false);
//ref 表单数据
let formModel = reactive<TsNoticeUpdate.FormModel>({
    noticeId: "",
    noticeTitle: "",
    noticeType: "",
    status: "",
    noticeContent: "",
});
//api 类型数据
const {data: optionsType} = apiGen.dicts("sys_notice_type");
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_notice_status");
//api 获取公告信息
const {send: sendMsg} = apiNotice.msg();
//api 提交表单
const {send: sendSubmit} = apiNotice.update(formModel);

//todo 确定
function onConfirm() {
    formRef.value
        .validate()
        .then(() => sendSubmit())
        .then(() => {
            onClose();
            ElMessage({
                type: "success",
                message: "修改公告成功",
            });
            accessAction("apiNoticeTable", (api) => api.refresh());
        })
}

//todo 取消
function onClose() {
    formRef.value.resetFields();
    model.value = false;
}

//todo 打开弹框
async function open(id: TsNotice.Id) {
    model.value = true;
    const msg = await sendMsg(id);
    formModel = evReObj({
        obj: formModel,
        cover: msg,
    })
}

defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="model" title="" :sets="dialogSets">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-input label="公告标题" prop="noticeTitle" :sets="setsRequired"></base-form-input>
            <base-form-select label="公告类型" prop="noticeType" :options="optionsType" :sets="setsRequired"></base-form-select>
            <base-form-radio label="状态" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-edit label="内容" prop="noticeContent"></base-form-edit>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="onClose"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>