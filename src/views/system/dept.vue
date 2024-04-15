<script setup lang="ts">
//? 权限
const isPermit = (v: TsGen.Permissions) => evPermit(v);
// 表单实例
const formRef = ref();
// 新增弹框实例
const dialogAddRef = ref();
// 修改弹框实例
const dialogUpdateRef = ref();
//sets 表格部门名称设置
const setsDeptName: TsTableColumn.Sets = {
    align: "left",
    fixed: "left",
    minWidth: 200,
}
//sets 表格设置
const tableSets:TsTable.Sets = {
    defaultExpandAll: true,
}
//ref 表单数据
let formModel = reactive<TsDept.FormModel>({
    deptName: "",
    status: "",
});
//ref 表格id参数
const tableKey: keyof TsDept.TableItem = "deptId";
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 删除请求
const {send: sendDel} = apiDept.deptDel();
//api 表格数据
const {loading: tableLoading, data: tableModel, send: sendTable} = apiDept.table(formModel);

//handle 重置
function onReset() {
    formRef.value.resetFields();
}

//handle 新增
function onAdd(row?: TsDept.TableItem) {
    dialogAddRef.value.open(row ? row.deptId : undefined);
}

//handle 删除
function onDelete(row: TsDept.TableItem) {
    ElMessageBox
        .confirm("是否确认删除“" + row.deptName + "”？删除后无法恢复", "警告", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
        })
        .then(() => sendDel(row.deptId))
        .then(() => {
            ElMessage({
                type: "success",
                message: "删除成功",
            });
            sendTable(true);
        })
        .catch(() => {
        })
}

//handle 修改
function onUpdate(row: TsDept.TableItem) {
    dialogUpdateRef.value.open(row.deptId);
}
</script>
<template>
    <base-layout @refresh="sendTable(true)">
        <template #form>
            <base-form v-model="formModel" ref="formRef">
                <base-form-input label="部门名称" prop="deptName"></base-form-input>
                <base-form-select label="状态" prop="status" :options="optionsStatus"></base-form-select>
                <template #handle>
                    <base-button label="重置" @click="onReset"></base-button>
                </template>
            </base-form>
        </template>
        <template #handleLeft>
            <base-button label="新增" v-if="isPermit(['system:dept:add'])" @click="onAdd"></base-button>
        </template>
        <template #table>
            <base-table v-model="tableModel" v-loading="tableLoading" ref="tableRef" :row-key="tableKey" :sets="tableSets">
                <base-table-column label="部门名称" prop="deptName" :sets="setsDeptName"></base-table-column>
                <base-table-column label="排序" prop="orderNum"></base-table-column>
                <base-table-tag label="状态" prop="status" :options="optionsStatus"></base-table-tag>
                <base-table-time label="创建时间" prop="createTime"></base-table-time>
                <base-table-special type="handle" width="216">
                    <template #default="scope">
                        <base-button label="新增" v-if="isPermit(['system:dept:edit'])" @click="onAdd(scope.row)"></base-button>
                        <base-button label="修改" v-if="isPermit(['system:dept:add'])" @click="onUpdate(scope.row)"></base-button>
                        <base-button label="删除" v-if="isPermit(['system:dept:remove']) && scope.row.parentId != 0" @click="onDelete(scope.row)"></base-button>
                    </template>
                </base-table-special>
            </base-table>
        </template>
    </base-layout>
    <dialog-dept-add ref="dialogAddRef"></dialog-dept-add>
    <dialog-dept-update ref="dialogUpdateRef"></dialog-dept-update>
</template>
<style scoped></style>
