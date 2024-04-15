<script setup lang="ts">
//permit 权限
const isPermit = (v: TsGen.Permissions) => evPermit(v);
// 表单实例
const formRef = ref();
// 新增角色弹框实例
const dialogAddRef = ref();
// 修改角色弹框实例
const dialogUpdateRef = ref();
// 数据权限弹框实例
const dialogAuthRef = ref();

//sets 创建时间设置
const setsDateRange: TsFormDatePicker.Sets = {
    type: "daterange",
};
//sets 表格设置
const tableSets: TsTable.Sets<TsRole.TableItem> = {
    rowKey: "roleId",
};
//sets 数据权限设置
const setsPermi: TsButton.Sets = {
    icon: IconSolarDatabaseLinear,
};
//sets 批量删除按钮设置
const setsDeleteMultiple = computed((): TsButton.Sets => {
    return {
        disabled: tableSelect.value.length == 0,
    };
});

//ref 表单数据
let formModel = reactive<TsRole.FormModel>({
    roleName: "",
    roleKey: "",
    status: "",
    dateRange: [],
});
//ref 表格选择数据
let tableSelect = ref<TsUser.Table>([]);

//api 状态
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 表格数据
const {data: tableModel, page, pageSize, total, refresh} = apiRole.table(formModel);
//api 删除
const {send: sendDelete} = apiRole.delete();

//handle 重置
function onReset() {
    formRef.value.resetFields();
}

//handle 修改
function onUpdate(row: TsRole.TableItem) {
    dialogUpdateRef.value.open(row);
}

//handle 数据权限
function onAuth(row: TsRole.TableItem) {
    dialogAuthRef.value.open(row);
}

//handle 删除
function onDelete(row: TsRole.TableItem) {
    ElMessageBox.confirm("是否确认删除角色编号为“" + row.roleId + "”的数据项", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => sendDelete(row.roleId))
        .then(() => {
            ElMessage({
                type: "success",
                message: "删除成功",
            });
            refresh();
        })
        .catch(() => {
        });
}

//handle 批量删除
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
        .then(() => sendDelete(ids.join()))
        .then(() => {
            ElMessage({
                type: "success",
                message: "删除成功",
            });
            refresh();
        })
        .catch(() => {
        });
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
            <base-button label="新增" v-if="isPermit(['system:role:add'])" @click="dialogAddRef.open()"></base-button>
            <base-button label="批量删除" v-if="isPermit(['system:role:remove'])" :sets="setsDeleteMultiple" @click="onDeleteMultiple"></base-button>
            <base-button label="导出" v-if="isPermit(['system:role:export'])"></base-button>
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
                        <base-button label="修改" v-if="scope.row.roleKey != 'admin' && isPermit(['system:role:edit'])" @click="onUpdate(scope.row)"></base-button>
                        <base-button label="数据权限" :sets="setsPermi" v-if="scope.row.roleKey != 'admin' && isPermit(['system:role:edit'])" @click="onAuth(scope.row)"></base-button>
                        <base-button label="删除" v-if="scope.row.roleKey != 'admin' && isPermit(['system:role:remove'])" @click="onDelete(scope.row)"></base-button>
                    </template>
                </base-table-special>
            </base-table>
        </template>
        <template #pagination>
            <base-pagination v-model:currentPage="page" v-model:pageSize="pageSize" :total="total"></base-pagination>
        </template>
    </base-layout>
    <dialog-role-add ref="dialogAddRef"></dialog-role-add>
    <dialog-role-update ref="dialogUpdateRef"></dialog-role-update>
    <dialog-role-auth ref="dialogAuthRef"></dialog-role-auth>
</template>
<style scoped></style>
