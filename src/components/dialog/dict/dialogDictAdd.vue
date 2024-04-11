<script setup lang="ts">
// 弹框实例
const formRef = ref();
//* 弹框设置
const dialogSets: TsDialog.Sets = {
	width: 450,
	beforeClose: (done) => {
		done();
	},
};
//* 表单设置
const formSets: TsForm.Sets = {
	labelWidth: "7em",
	inline: false,
};
//* 必填项设置
const setsRequired: TsFormItem.Sets = {
	required: true,
};
//ref 弹框开关
let model = ref<TsDialog.Model>(false);
//ref 表单数据
let formModel = reactive<TsDictAdd.FormModel>({
	dictName: "",
	dictType: "",
	status: "0",
	remark: "",
});
//api 状态数据
const { data: optionsStatus } = apiGen.dicts("sys_normal_disable");
//api 提交表单
const { send: sendSubmit } = apiDict.add(formModel);
//handle 确定
function onConfirm() {
	formRef.value
		.validate()
		.then(() => sendSubmit())
		.then(() => {
			ElMessage({
				type: "success",
				message: "新增字典类型成功",
			});
			onClose();
		});
}
//handle 取消
function onClose() {
	formRef.value.resetFields();
	model.value = false;
    accessAction("apiDictTable", (api) => api.refresh());
}
//handle 打开弹框
function open() {
	model.value = true;
}
defineExpose({
	open,
});
</script>
<template>
	<base-dialog v-model="model" title="添加字典类型" :sets="dialogSets">
		<base-form v-model="formModel" ref="formRef" :sets="formSets">
			<base-form-input label="字典名称" prop="dictName" :sets="setsRequired"></base-form-input>
			<base-form-input label="字典类型" prop="dictType" :sets="setsRequired"></base-form-input>
			<base-form-radio label="状态" prop="status" :options="optionsStatus"></base-form-radio>
			<base-form-input label="备注" prop="remark"></base-form-input>
		</base-form>
		<template #footer>
			<base-button label="确定" @click="onConfirm"></base-button>
			<base-button label="取消" @click="onClose"></base-button>
		</template>
	</base-dialog>
</template>
<style scoped></style>
