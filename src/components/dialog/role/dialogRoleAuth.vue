<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		modelValue: TsDialog.Model;
	}>(),
	{}
);
const emits = defineEmits(["update:modelValue"]);
const model = computed({
	get: () => props.modelValue,
	set: (val) => emits("update:modelValue", val),
});
//* 弹框设置
const dialogSets: TsDialog.Sets = {
	width: 500,
	beforeClose: (done) => {
		formRef.value.clearValidate();
		done();
	},
};
//? 表单实例
const formRef = ref();
//ref 表单数据
let formModel = reactive<TsRoleAuth.FormModel>({
    roleId: "",
	roleName: "",
	roleKey: "",
	dataScope: "",
	deptCheckStrictly: false,
	deptIds: [],
});
//* 表单设置
const formSets: TsForm.Sets = {
	labelWidth: "7em",
	inline: false,
};
//* 角色名称设置
const roleNameSets: TsFormInput.Sets = {
	readonly: true,
};
//* 权限字符设置
const roleKeySets: TsFormInput.Sets = {
	readonly: true,
};
//api 权限范围数据
const optionsAuth = apiRole.auth();
//* 数据权限设置
const deptSets: TsTree.Sets = {
	showCheckbox: true,
	handleBtn: true,
	checkOnClickNode: true,
};
//ref 数据权限数据
let optionsDept = reactive<TsTree.Options>([]);
//api 数据权限数据
let roleId = ref<TsRole.RoleId>("");
const { send: sendDept } = apiRole.deptPermi(roleId);
//todo 数据回显
async function getRow(row: TsRole.TableItem) {
	formModel = evReObj({
		obj: formModel,
		cover: row,
	});
	roleId.value = row.roleId;
	const deptObj = await sendDept();
    optionsDept = deptObj.depts;
    formModel.deptIds = deptObj.checkedKeys;
}
//todo 确定
const { send: sendSubmit } = apiRole.updatePermi(formModel);
function onConfirm() {
	formRef.value
		.validate()
		.then(() => {
			return sendSubmit();
		})
		.then(() => {
			ElMessage({
				type: "success",
				message: "数据权限修改成功",
			});
			formRef.value.resetFields();
			onClose();
			accessAction("apiRoleTable", (el) => {
				el.refresh();
			});
		});
}
//todo 取消
function onClose() {
	formRef.value.clearValidate();
	model.value = false;
}
defineExpose({
	getRow,
});
</script>
<template>
	<base-dialog v-model="model" title="分配数据权限" :sets="dialogSets">
		<base-form v-model="formModel" ref="formRef" :sets="formSets">
			<base-form-input label="角色名称" prop="roleName" :sets="roleNameSets"></base-form-input>
			<base-form-input label="权限字符" prop="roleKey" :sets="roleKeySets"></base-form-input>
			<base-form-select label="权限范围" prop="dataScope" :options="optionsAuth"></base-form-select>
			<base-form-item label="数据权限" prop="deptIds" v-if="formModel.dataScope == '2'">
				<base-tree v-model="formModel.deptIds" :options="optionsDept" :sets="deptSets"></base-tree>
			</base-form-item>
		</base-form>
		<template #footer>
			<base-button label="确定" @click="onConfirm"></base-button>
			<base-button label="取消" @click="onClose"></base-button>
		</template>
	</base-dialog>
</template>
<style scoped>
.base-tree {
	width: 100%;
	height: 350px;
}
</style>
