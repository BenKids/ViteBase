<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		modelValue: TsDialog.Model;
	}>(),
	{}
);
const emits = defineEmits(["update:modelValue"]);
const model = useVModel(props,"modelValue",emits);
//* 弹框设置
const dialogSets: TsDialog.Sets = {
	width: 1100,
	beforeClose: (done) => {
		formRef.value.clearValidate();
		done();
	},
};
//? 表单实例
const formRef = ref();
//* 表单设置
const formSets: TsForm.Sets = {
	labelWidth: "7em",
	inline: false,
};
//* 角色顺序设置
const roleSortSets: TsFormNumber.Sets = {
	min: 0,
	required: true,
};
//* 菜单权限设置
const setsMenuIds: TsTree.Sets = {
	showCheckbox: true,
	handleBtn: true,
	checkStrictly: false,
	checkOnClickNode: true,
	expandOnClickNode: true,
};
//* 必填项设置
const setsRequired: TsFormItem.Sets = {
	required: true,
};
//ref 表单数据
let formModel = reactive<TsRoleAdd.FormModel>({
	roleName: "",
	roleKey: "",
	roleSort: 0,
	status: "0",
	menuIds: [],
	remark: "",
});
//api 状态数据
const { data: optionsStatus } = apiGen.dicts("sys_normal_disable");
//api 菜单权限数据
const { data: optionsMenus } = apiMenus.permi();
//todo 确定
const { send: sendSubmit } = apiRole.add(formModel);
function onConfirm() {
	formRef.value
		.validate()
		.then(() => {
			return sendSubmit();
		})
		.then(() => {
			ElMessage({
				type: "success",
				message: "添加成功",
			});
			formRef.value.resetFields();
			onClose();
			accessAction("apiRoleTable", (api) => {
				api.refresh();
			});
		});
}
//todo 取消
function onClose() {
	formRef.value.clearValidate();
	model.value = false;
}
</script>
<template>
	<base-dialog v-model="model" title="新增角色" :sets="dialogSets">
		<base-form v-model="formModel" ref="formRef" :sets="formSets">
			<base-form-input label="角色名称" prop="roleName" :sets="setsRequired"></base-form-input>
			<base-form-input label="权限字符" prop="roleKey" :sets="setsRequired"></base-form-input>
			<base-form-number label="角色顺序" prop="roleSort" :sets="roleSortSets"></base-form-number>
			<base-form-radio label="状态" prop="status" :options="optionsStatus"></base-form-radio>
			<base-form-item label="菜单权限" prop="menuIds" class="menu-ids">
				<base-tree v-model="formModel.menuIds" :options="optionsMenus" :sets="setsMenuIds" ref="menuIdsRef"></base-tree>
			</base-form-item>
			<base-form-input label="备注" prop="remark"></base-form-input>
		</base-form>
		<template #footer>
			<base-button label="确定" @click="onConfirm"></base-button>
			<base-button label="取消" @click="onClose"></base-button>
		</template>
	</base-dialog>
</template>
<style scoped>
.base-form {
	padding-right: 560px;
    position: relative;
	height: 500px;
}
.menu-ids {
	position: absolute;
    right: 0;
    top: 0;
    width: 560px;
	height: 100%;
	margin-bottom: 0;
}
.base-tree {
	width: 100%;
	height: 100%;
}
</style>
