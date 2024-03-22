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
let formModel = reactive<TsDictUpdate.FormModel>({
	dictId: "",
	dictName: "",
	dictType: "",
	status: "0",
	remark: ""
});
//api 状态数据
const { data: optionsStatus } = apiGen.dicts("sys_normal_disable");
//api 字典数据
const { send: sendGet } = apiDict.msg();
//api 提交数据
const { send: sendSubmit } = apiDict.update(formModel);
//todo 确定
function onConfirm() {
	formRef.value
		.validate()
		.then(() => sendSubmit())
		.then(() => {
			onClose();
			ElMessage({
				type: "success",
				message: "修改成功",
			});
			accessAction("apiDictTable", (api) => api.refresh());
		});
}
//todo 取消
function onClose() {
	formRef.value.resetFields();
	model.value = false;
}
//todo 打开弹框
async function open(id: TsDict.Id) {
	model.value = true;
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
	<base-dialog v-model="model" title="修改字典类型" :sets="dialogSets">
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
