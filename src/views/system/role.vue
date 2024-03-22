<script setup lang="ts">
//? 权限
const isPermi = (v:TsGen.Permissions) => evPermi(v);
//? 表单实例
const formRef = ref();
//ref 表单数据
let formModel = reactive<TsRole.FormModel>({
	roleName: "",
	roleKey: "",
	status: "",
	dateRange: [],
});
//api 状态
const { data: optionsStatus } = apiGen.dicts("sys_normal_disable");
//* 创建时间设置
const setsDateRange: TsFormDatePicker.Sets = {
	type: "daterange",
};
//* 表格设置
const tableSets: TsTable.Sets<TsRole.TableItem> = {
	rowKey: "roleId",
};
//api 表格数据
const { data: tableModel, page, pageSize, total, refresh } = apiRole.table(formModel);
//ref 表格选择数据
let tableSelect = ref<TsUser.Table>([]);
//* 数据权限设置
const setsPermi: TsButton.Sets = {
	icon: IconSolarDatabaseLinear,
};
//todo 重置
function onReset() {
	formRef.value.resetFields();
}
//ref 新增角色弹框开关
let dialogAdd = ref<TsDialog.Model>(false);
//? 修改角色弹框实例
const dialogUpdateRef = ref();
//ref 修改角色弹框开关
let dialogUpdate = ref<TsDialog.Model>(false);
//todo 修改
function onUpdate(row: TsRole.TableItem) {
	dialogUpdate.value = true;
	dialogUpdateRef.value.getRow(row);
}
//ref 数据权限弹框开关
let dialogAuth = ref<TsDialog.Model>(false);
//? 数据权限弹框实例
const dialogAuthRef = ref();
//todo 数据权限
function onAuth(row: TsRole.TableItem) {
	dialogAuth.value = true;
	dialogAuthRef.value.getRow(row);
}
//ref 删除传递参数
let deleteRoleId = ref<TsRole.RoleId>("");
//todo 删除
const { send: sendDelete } = apiRole.delete(deleteRoleId);
function onDelete(row: TsRole.TableItem) {
	ElMessageBox.confirm("是否确认删除角色编号为“" + row.roleId + "”的数据项", "警告", {
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		type: "warning",
	})
		.then(() => {
			deleteRoleId.value = row.roleId;
			return sendDelete();
		})
		.then(() => {
			ElMessage({
				type: "success",
				message: "删除成功",
			});
			refresh();
		})
		.catch(() => {});
}
//* 批量删除按钮设置
const setsDeleteMultiple = computed((): TsButton.Sets => {
	return {
		disabled: tableSelect.value.length == 0,
	};
});
//todo 批量删除
function onDeleteMultiple() {
	const ids = evArrGetKey({
		data: tableSelect.value,
		key: "userId",
	});
	ElMessageBox.confirm("是否确认删除用户编号为“" + ids + "”的数据项?", "标题", {
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		type: "warning",
	})
		.then(() => {
			deleteRoleId.value = ids.join();
			return sendDelete();
		})
		.then(() => {
			ElMessage({
				type: "success",
				message: "删除成功",
			});
			refresh();
		})
		.catch(() => {});
}
</script>
<template>
	<base-layout @refresh="refresh(page)">
		<template #form>
			<base-form v-model="formModel" ref="formRef">
				<base-form-input label="角色名称" prop="roleName"></base-form-input>
				<base-form-input label="权限字符" prop="roleKey"></base-form-input>
				<base-form-select label="状态" prop="status" :options="optionsStatus"></base-form-select>
				<base-form-date-picker label="创建时间" prop="dateRange" :sets="setsDateRange"></base-form-date-picker>
				<template #handle>
					<base-button label="重置" @click="onReset"></base-button>
				</template>
			</base-form>
		</template>
		<template #handleLeftExtra>
			<base-button label="新增" v-if="isPermi(['system:role:add'])" @click="dialogAdd = true"></base-button>
			<base-button label="批量删除" v-if="isPermi(['system:role:remove'])" :sets="setsDeleteMultiple" @click="onDeleteMultiple"></base-button>
			<base-button label="导出" v-if="isPermi(['system:role:export'])"></base-button>
		</template>
		<template #table>
			<base-table v-model="tableModel" v-model:selectData="tableSelect" ref="tableRef" :sets="tableSets">
				<base-table-special type="selection"></base-table-special>
				<base-table-column label="角色编号" prop="roleId" width="120"></base-table-column>
				<base-table-column label="角色名称" prop="roleName"></base-table-column>
				<base-table-column label="权限字符" prop="roleKey"></base-table-column>
				<base-table-column label="显示顺序" prop="roleSort"></base-table-column>
				<base-table-tag label="状态" prop="status" :options="optionsStatus"></base-table-tag>
				<base-table-time label="创建时间" prop="createTime"></base-table-time>
				<base-table-special type="handle" width="240">
					<template #default="scope">
						<base-button label="修改" v-if="scope.row.roleKey != 'admin' && isPermi(['system:role:edit'])" @click="onUpdate(scope.row)"></base-button>
						<base-button label="数据权限" :sets="setsPermi" v-if="scope.row.roleKey != 'admin' && isPermi(['system:role:edit'])" @click="onAuth(scope.row)"></base-button>
						<base-button label="删除" v-if="scope.row.roleKey != 'admin' && isPermi(['system:role:remove'])" @click="onDelete(scope.row)"></base-button>
					</template>
				</base-table-special>
			</base-table>
		</template>
		<template #pagination>
			<base-pagination v-model:currentPage="page" v-model:pageSize="pageSize" :total="total"></base-pagination>
		</template>
	</base-layout>
	<dialog-role-add v-model="dialogAdd"></dialog-role-add>
	<dialog-role-update v-model="dialogUpdate" ref="dialogUpdateRef"></dialog-role-update>
	<dialog-role-auth v-model="dialogAuth" ref="dialogAuthRef"></dialog-role-auth>
</template>
<style scoped></style>
