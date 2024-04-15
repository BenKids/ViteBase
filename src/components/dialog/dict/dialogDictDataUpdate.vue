<script setup lang="ts">
//sets 字典类型设置
const setsType: TsFormInput.Sets = {
    required: true,
    readonly: true,
}
//ref 表单数据
let formModel = reactive<TsDictDataUpdate.FormModel>({
    dictCode: "",
    dictType: "",
    dictLabel: "",
    dictValue: "",
    listClass: "info",
    dictSort: 0,
    status: "",
    remark: "",
});
//api 类型数据
const optionsClass = apiGen.status();
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 提交表单
const {send: sendSubmit} = apiDict.dataUpdate(formModel);
//api 修改数据信息获取
const {send: sendDataMsg} = apiDict.dataMsg();
//cpa 弹框表单组合式函数
const {dialogSets, formRef, formSets, setsRequired, visible, open: onOpen, confirm, close} = comDialogForm({
    dialogSets: {
        width: 450,
    },
    formSets: {
        inline: false,
    }
});

//handle 确定
function onConfirm() {
    confirm()
        .then(() => sendSubmit())
        .then(() => {
            close();
            ElMessage({
                type: "success",
                message: "修改成功",
            });
            accessAction("apiDictData", (api) => api.refresh());
        })
}

//handle 打开弹框
async function open(id: TsDict.Id) {
    await onOpen();
    formModel = evReObj({
        obj: formModel,
        cover: await sendDataMsg(id)
    })
}

defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="visible" title="修改数据字典" :sets="dialogSets">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-input label="字典类型" prop="dictType" :sets="setsType"></base-form-input>
            <base-form-input label="数据标签" prop="dictLabel" :sets="setsRequired"></base-form-input>
            <base-form-input label="数据键值" prop="dictValue" :sets="setsRequired"></base-form-input>
            <base-form-select label="回显样式" prop="listClass" :options="optionsClass"></base-form-select>
            <base-form-number label="显示排序" prop="dictSort" :sets="setsRequired"></base-form-number>
            <base-form-radio label="状态" prop="status" :options="optionsStatus"></base-form-radio>
            <base-form-input label="备注" prop="remark"></base-form-input>
        </base-form>
        <template #footer>
            <base-button label="确定" @click="onConfirm"></base-button>
            <base-button label="取消" @click="close"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped></style>