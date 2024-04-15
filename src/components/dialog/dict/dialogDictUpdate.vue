<script setup lang="ts">
//ref 表单数据
let formModel = reactive<TsDictUpdate.FormModel>({
    dictId: "",
    dictName: "",
    dictType: "",
    status: "0",
    remark: ""
});
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 字典数据
const {send: sendGet} = apiDict.msg();
//api 提交数据
const {send: sendSubmit} = apiDict.update(formModel);
//cpa 弹框表单组合式函数
const {dialogSets, formRef, formSets, setsRequired, visible, open:onOpen, confirm, close} = comDialogForm({
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
            accessAction("apiDictTable", (api) => api.refresh());
        });
}

//handle 打开弹框
async function open(id: TsDict.Id) {
    await onOpen();
    formModel = evReObj({
        obj: formModel,
        cover: await sendGet(id),
    });
}

defineExpose({
    open,
});
</script>
<template>
    <base-dialog v-model="visible" title="修改字典类型" :sets="dialogSets">
        <base-form v-model="formModel" ref="formRef" :sets="formSets">
            <base-form-input label="字典名称" prop="dictName" :sets="setsRequired"></base-form-input>
            <base-form-input label="字典类型" prop="dictType" :sets="setsRequired"></base-form-input>
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
