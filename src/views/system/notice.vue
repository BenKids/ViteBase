<script setup lang="ts">
//permit 权限判断
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
const setsDeleteBatch = computed((): TsButton.Sets => {
    return {
        disabled: tableSelect.value.length == 0,
    }
})
//sets 表格设置
const tableSets: TsTable.Sets<TsNotice.TableItem> = {
    rowKey: "noticeId",
};
//ref 表单数据
let formModel = reactive<TsNotice.FormModel>({
    noticeTitle: "",
    createBy: "",
    noticeType: "",
});
//ref 表格选择数据
let tableSelect = ref<TsNotice.Table>([]);
//api 表格数据
const {loading: tableLoading, data: tableModel, page, pageSize, total, refresh} = apiNotice.table(formModel);
//api 类型数据
const {data: optionsType} = apiGen.dicts("sys_notice_type");
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_notice_status");
//api 删除数据
const {send: sendDelete} = apiNotice.delete();

//handle 重置
function reload() {
    formRef.value.resetFields();
}

//handle 新增
function onAdd() {
    dialogAddRef.value.open();
}

//handle 修改
function onUpdate(row: TsNotice.TableItem) {
    dialogUpdateRef.value.open(row.noticeId);
}

//handle 删除
function onDelete(row: TsNotice.TableItem) {
    ElMessageBox
        .confirm("是否确认删除“" + row.noticeTitle + "”的数据项？", "系统警告", {
            type: "warning",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
        })
        .then(() => sendDelete(row.noticeId))
        .then(() => {
            ElMessage({
                type: "success",
                message: "删除成功",
            });
            accessAction("apiNoticeTable",(api) => api.refresh());
        })
        .catch(() => {
        })
}
</script>
<template>
    <base-layout @refresh="refresh(page)">
        <template #form>
            <base-form v-model="formModel" ref="formRef">
                <base-form-input label="公告标题" prop="noticeTitle"></base-form-input>
                <base-form-input label="操作人员" prop="createBy"></base-form-input>
                <base-form-select label="类型" prop="noticeType" :options="optionsType"></base-form-select>
                <template #handle>
                    <base-button label="重置" @click="reload"></base-button>
                </template>
            </base-form>
        </template>
        <template #handleLeftExtra>
            <base-button label="新增" @click="onAdd" v-if="isPermit(['system:notice:add'])"></base-button>
            <base-button label="批量删除" :sets="setsDeleteBatch" v-if="isPermit(['system:notice:remove'])"></base-button>
        </template>
        <template #table>
            <base-table v-model="tableModel" v-model:selectData="tableSelect" v-loading="tableLoading" ref="tableRef" :sets="tableSets">
                <base-table-special type="selection"></base-table-special>
                <base-table-column label="公告标题" prop="noticeTitle"></base-table-column>
                <base-table-tag label="公告类型" prop="noticeType" :options="optionsType"></base-table-tag>
                <base-table-tag label="状态" prop="status" :options="optionsStatus"></base-table-tag>
                <base-table-column label="创建者" prop="createBy"></base-table-column>
                <base-table-time label="创建时间" prop="createTime"></base-table-time>
                <base-table-special type="handle">
                    <template #default="scope">
                        <base-button label="修改" @click="onUpdate(scope.row)" v-if="isPermit(['system:notice:edit'])"></base-button>
                        <base-button label="删除" @click="onDelete(scope.row)" v-if="isPermit(['system:notice:remove'])"></base-button>
                    </template>
                </base-table-special>
            </base-table>
        </template>
        <template #pagination>
            <base-pagination v-model:currentPage="page" v-model:pageSize="pageSize" :total="total"></base-pagination>
        </template>
    </base-layout>
    <dialog-notice-add ref="dialogAddRef"></dialog-notice-add>
    <dialog-notice-update ref="dialogUpdateRef"></dialog-notice-update>
</template>
<style scoped></style>