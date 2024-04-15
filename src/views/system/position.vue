<script setup lang="ts">
//? 权限判断
const isPermit = (v: TsGen.Permissions) => evPermit(v);
// 表单实例
const formRef = ref();
// 表格实例
const tableRef = ref();
// 新增弹框实例
const dialogAddRef = ref();
// 修改弹框实例
const dialogUpdateRef = ref();
//sets 批量删除按钮设置
const setsDeleteMultiple = computed((): TsButton.Sets => {
    return {
        disabled: tableSelect.value.length == 0,
    };
});
//sets 表格设置
const tableSets: TsTable.Sets<TsPosition.TableItem> = {
    rowKey: "postId",
};
//ref 表单数据
let formModel = reactive<TsPosition.FormModel>({
    postCode: "",
    postName: "",
    status: "",
});
//ref 表格选择数据
let tableSelect = ref<TsPosition.Table>([]);
//api 表格数据
const {loading: tableLoading, data: tableModel, page, pageSize, total, refresh} = apiPosition.table(formModel);
//api 状态数据
const {data: statusOptions} = apiGen.dicts("sys_normal_disable");
//api 删除接口
const {send: sendDelete} = apiPosition.delete();

//handle 重置
function reload() {
    formRef.value.resetFields();
}
//handle 新增
function onAdd() {
    dialogAddRef.value.open();
}
//handle 修改
function onUpdate(row: TsPosition.TableItem) {
    dialogUpdateRef.value.open(row);
}

//handle 删除
function onDelete(row: TsPosition.TableItem) {
    ElMessageBox.confirm("是否确认删除岗位编号为“" + row.postId + "”的数据项?", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => sendDelete(row.postId))
        .then(() => {
            ElMessage({
                type: "success",
                message: "岗位删除成功！",
            });
            refresh();
        })
        .catch(() => {
        });
}

//handle 批量删除
function onDeleteMultiple() {
    let ids = "";
    for (let index = 0; index < tableSelect.value.length; index++) {
        const row = tableSelect.value[index];
        ids += ids ? "," : "";
        ids = ids + row.postId;
    }
    ElMessageBox
        .confirm("是否确认删除岗位编号为“" + ids + "”的数据项?", "警告", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
        })
        .then(() => sendDelete(ids))
        .then(() => {
            ElMessage({
                type: "success",
                message: "岗位删除成功！",
            });
            refresh();
        })
        .catch(() => {
        })
}
</script>
<template>
    <base-layout @refresh="refresh(page)">
        <template #form>
            <base-form v-model="formModel" ref="formRef">
                <base-form-input label="岗位编码" prop="postCode"></base-form-input>
                <base-form-input label="岗位名称" prop="postName"></base-form-input>
                <base-form-select label="状态" prop="status" :options="statusOptions"></base-form-select>
                <template #handle>
                    <base-button label="重置" @click="reload"></base-button>
                </template>
            </base-form>
        </template>
        <template #handleLeftExtra>
            <base-button label="新增" @click="onAdd" v-if="isPermit(['system:post:add'])"></base-button>
            <base-button label="批量删除" :sets="setsDeleteMultiple" @click="onDeleteMultiple" v-if="isPermit(['system:post:remove'])"></base-button>
            <base-button label="导出" v-if="isPermit(['system:post:export'])"></base-button>
        </template>
        <template #table>
            <base-table v-model="tableModel" v-model:selectData="tableSelect" v-loading="tableLoading" ref="tableRef" :sets="tableSets">
                <base-table-special type="selection"></base-table-special>
                <base-table-column label="岗位编号" prop="postId"></base-table-column>
                <base-table-column label="岗位编码" prop="postCode"></base-table-column>
                <base-table-column label="岗位名称" prop="postName"></base-table-column>
                <base-table-column label="岗位排序" prop="postSort"></base-table-column>
                <base-table-time label="创建时间" prop="createTime"></base-table-time>
                <base-table-tag label="状态" prop="status" :options="statusOptions"></base-table-tag>
                <base-table-special type="handle">
                    <template #default="scope">
                        <base-button label="修改" @click="onUpdate(scope.row)" v-if="isPermit(['system:post:edit'])"></base-button>
                        <base-button label="删除" @click="onDelete(scope.row)" v-if="isPermit(['system:post:remove'])"></base-button>
                    </template>
                </base-table-special>
            </base-table>
        </template>
        <template #pagination>
            <base-pagination v-model:currentPage="page" v-model:pageSize="pageSize" :total="total"></base-pagination>
        </template>
    </base-layout>
    <dialog-position-add ref="dialogAddRef"></dialog-position-add>
    <dialog-position-update ref="dialogUpdateRef"></dialog-position-update>
</template>
<style scoped></style>
