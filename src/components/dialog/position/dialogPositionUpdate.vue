<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		modelValue: TsDialog.Model;
	}>(),
	{}
);
const dialogSets: TsDialog.Sets = {
	width: 450,
	beforeClose: (done) => {
		done();
	},
};
const emits = defineEmits(["update:modelValue"]);
const model = useVModel(props,"modelValue",emits);
//* 表单设置
const formSets: TsForm.Sets = {
	inline: false,
};
//? 表单实例
const formRef = ref();
//ref 表单数据
let formModel = reactive<TsPositionUpdate.FormModel>({
	postId: "",
	postCode: "",
	postName: "",
	postSort: 0,
	status: "",
});
//* 表单必填项
const setsRequired: TsFormItem.Sets = {
    required: true,
}
//api 状态数据
const { data: statusOptions } = apiGen.dicts("sys_normal_disable");
//api 提交表单
const { send: sendSubmit } = apiPosition.update(formModel);
//todo 确定
function onConfirm() {
	formRef.value
		.validate()
		.then(() => sendSubmit())
		.then(() => {
			ElMessage({
				type: "success",
				message: "岗位修改成功！",
			});
			onClose();
            accessAction("apiPositionTable", api => {
                api.refresh();
            })
		});
}
//todo 取消
function onClose() {
	model.value = false;
}
//todo 数据回显
function getRow(row:TsPosition.TableItem) {
    evReObj({
        obj: formModel,
        cover: {
            ...row,
            postSort: Number(row.postSort),
        }
    })
}
defineExpose({
    getRow,
})
</script>
<template>
	<base-dialog v-model="model" title="修改岗位" :sets="dialogSets">
		<base-form v-model="formModel" ref="formRef" :sets="formSets">
			<base-form-input label="岗位名称" prop="postName" :sets="setsRequired"></base-form-input>
			<base-form-input label="岗位编码" prop="postCode" :sets="setsRequired"></base-form-input>
			<base-form-number label="岗位顺序" prop="postSort" :sets="setsRequired"></base-form-number>
			<base-form-radio label="岗位状态" prop="status" :options="statusOptions"></base-form-radio>
		</base-form>
		<template #footer>
			<base-button label="确定" @click="onConfirm"></base-button>
			<base-button label="取消" @click="onClose"></base-button>
		</template>
	</base-dialog>
</template>
<style scoped></style>
