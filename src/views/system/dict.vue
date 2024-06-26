<script setup lang="ts">
// 权限判断
const isPermit = (v: TsGen.Permissions) => evPermit(v);
// 表单实例
const formRef = ref();
// 表格实例
const tableRef = ref();
// 新增弹框实例
const dialogAddRef = ref();
// 修改弹框实例
const dialogUpdateRef = ref();
//sets 创建时间设置
const dateRangeSets: TsFormDatePicker.Sets = {
    type: "daterange",
};
//sets 批量删除按钮设置
const setsDeleteMultiple = computed((): TsButton.Sets => {
    return {
        disabled: tableSelect.value.length == 0,
    };
});
//sets 表格设置
const tableSets: TsTable.Sets<TsDict.TableItem> = {
    rowKey: "dictId",
};
//ref 表单数据
let formModel = reactive<TsDict.FormModel>({
    dictName: "",
    dictType: "",
    status: "",
    dateRange: [],
});
//ref 表格选择数据
let tableSelect = ref<TsDict.Table>([]);
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 表格数据
const {loading: tableLoading, data: tableModel, page, pageSize, total, refresh} = apiDict.table(formModel);
//api 删除请求
const {send: sendDelete} = apiDict.delete();

//handle 重置
function reload() {
    formRef.value.resetFields();
}

//handle 新增
function onAdd() {
    dialogAddRef.value.open();
}

//handle 修改
function onUpdate(row: TsDict.TableItem) {
    dialogUpdateRef.value.open(row.dictId);
}

//handle 删除
function onDelete(row: TsDict.TableItem) {
    ElMessageBox.confirm("确认删除字典编号为“" + row.dictId + "”的数据项？删除后无法恢复！", "系统警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => sendDelete(row.dictId))
        .catch(() => {
        });
}

//handle 导出
function onExport() {

}
</script>
<template>
    <base-layout @refresh="refresh(page)">
        <template #form>
            <base-form v-model="formModel" ref="formRef">
                <base-form-input label="字典名称" v-model="formModel.dictName" prop="dictName"></base-form-input>
                <base-form-input label="字典类型" v-model="formModel.dictType" prop="dictType"></base-form-input>
                <base-form-select label="状态" v-model="formModel.status" prop="status" :options="optionsStatus"></base-form-select>
                <base-form-date-picker label="创建时间" v-model="formModel.dateRange" prop="dateRange" :sets="dateRangeSets"></base-form-date-picker>
                <template #handle>
                    <base-button label="重置" @click="reload"></base-button>
                </template>
            </base-form>
        </template>
        <template #handleLeftExtra>
            <base-button label="新增" v-if="isPermit(['system:dict:add'])" @click="onAdd"></base-button>
            <base-button label="批量删除" :sets="setsDeleteMultiple" v-if="isPermit(['system:dict:remove'])"></base-button>
            <base-button label="导出" v-if="isPermit(['system:dict:export'])" @click="onExport"></base-button>
        </template>
        <template #table>
            <base-table v-model="tableModel" v-model:selectData="tableSelect" v-loading="tableLoading" ref="tableRef" :sets="tableSets">
                <base-table-special type="selection"></base-table-special>
                <base-table-column label="字典编号" prop="dictId" width="120"></base-table-column>
                <base-table-column label="字典名称" prop="dictName"></base-table-column>
                <base-table-column label="字典类型" prop="dictType">
                    <template #default="scope">
                        <base-link to="DictData" :query="{dictId:scope.row.dictId}">{{ scope.row.dictType }}
                        </base-link>
                    </template>
                </base-table-column>
                <base-table-tag label="状态" prop="status" :options="optionsStatus"></base-table-tag>
                <base-table-column label="备注" prop="remark"></base-table-column>
                <base-table-time label="创建时间" prop="createTime"></base-table-time>
                <base-table-special type="handle">
                    <template #default="scope">
                        <base-button label="修改" @click="onUpdate(scope.row)" v-if="isPermit(['system:dict:edit'])"></base-button>
                        <base-button label="删除" @click="onDelete(scope.row)" v-if="isPermit(['system:dict:remove'])"></base-button>
                    </template>
                </base-table-special>
            </base-table>
        </template>
        <template #pagination>
            <base-pagination v-model:currentPage="page" v-model:pageSize="pageSize" :total="total"></base-pagination>
        </template>
    </base-layout>
    <dialog-dict-add ref="dialogAddRef"></dialog-dict-add>
    <dialog-dict-update ref="dialogUpdateRef"></dialog-dict-update>
</template>
<style scoped></style>
