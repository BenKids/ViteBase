<script setup lang="ts">
//permit 权限判断
const isPermit = (v: TsGen.Permissions) => evPermit(v);
// 表单实例
const formRef = ref();
// 表格实例
const tableRef = ref();
// 详情弹框实例
const dialogDetailRef = ref();
//sets 表格设置
const tableSets: TsTable.Sets<TsLogOper.TableItem> = {
    rowKey: "operId",
};
//sets 批量删除按钮设置
const setsBatch = computed((): TsButton.Sets => {
    return {
        disabled: tableSelect.value.length == 0,
    }
})
//ref 表单数据
let formModel = reactive<TsLogOper.FormModel>({
    operIp: "",
    title: "",
    operName: "",
    businessType: "",
    status: "",
    dateRange: [],
});
//ref 表格选择数据
let tableSelect = ref<TsLogOper.Table>([]);
//api 表格数据
const {loading: tableLoading, data: tableModel, page, pageSize, total, refresh} = apiLogOper.table(formModel);
//api 类型数据
const {data: optionsType} = apiGen.dicts("sys_oper_type");
//api 状态数据
const {data:optionsStatus} = apiGen.dicts("sys_common_status");
//handle 重置
function reload() {
    formRef.value.resetFields();
}

//handle 批量删除
function onDeleteBatch() {
    console.log("[tableSelect.value]", tableSelect.value);
}
//handle 清空
function onClear() {
    ElMessageBox
        .confirm("是否确认清空所有操作日志数据项？","系统警告",{
            type: "warning",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
        })
        .then(()=>{})
        .catch(()=>{})
}
//handle 详细
function onDetail(row: TsLogOper.TableItem) {
    console.log("[row]", row);
    dialogDetailRef.value.open(row);
}
</script>
<template>
    <base-layout @refresh="refresh(page)">
        <template #form>
            <base-form v-model="formModel" ref="formRef">
                <base-form-input label="操作地址" prop="operIp"></base-form-input>
                <base-form-input label="系统模块" prop="title"></base-form-input>
                <base-form-input label="操作人员" prop="operName"></base-form-input>
                <base-form-select label="类型" prop="businessType" :options="optionsType"></base-form-select>
                <base-form-select label="状态" prop="status" :options="optionsStatus"></base-form-select>
                <base-form-date-picker label="操作时间" prop="dateRange"></base-form-date-picker>
                <template #handle>
                    <base-button label="重置" @click="reload"></base-button>
                </template>
            </base-form>
        </template>
        <template #handleLeftExtra>
            <base-button label="批量删除" :sets="setsBatch" @click="onDeleteBatch" v-if="isPermit(['monitor:operlog:remove'])"></base-button>
            <base-button label="清空" @click="onClear" v-if="isPermit(['monitor:operlog:remove'])"></base-button>
            <base-button label="导出" v-if="isPermit(['monitor:operlog:export'])"></base-button>
        </template>
        <template #table>
            <base-table v-model="tableModel" v-model:selectData="tableSelect" v-loading="tableLoading" ref="tableRef" :sets="tableSets">
                <base-table-special type="selection"></base-table-special>
                <base-table-column label="日志编号" prop="operId"></base-table-column>
                <base-table-column label="系统模块" prop="title"></base-table-column>
                <base-table-tag label="操作类型" prop="businessType" :options="optionsType"></base-table-tag>
                <base-table-column label="操作人员" prop="operName"></base-table-column>
                <base-table-column label="操作地址" prop="operIp"></base-table-column>
                <base-table-column label="操作地点" prop="operLocation"></base-table-column>
                <base-table-tag label="操作状态" prop="status" :options="optionsStatus"></base-table-tag>
                <base-table-time label="操作日期" prop="operTime"></base-table-time>
                <base-table-column label="消耗时间" prop="costTime">
                    <template #default="scope">{{scope.row.costTime}}毫秒</template>
                </base-table-column>
                <base-table-special type="handle">
                    <template #default="scope">
                        <base-button label="详情" @click="onDetail(scope.row)"></base-button>
                    </template>
                </base-table-special>
            </base-table>
        </template>
        <template #pagination>
            <base-pagination v-model:currentPage="page" v-model:pageSize="pageSize" :total="total"></base-pagination>
        </template>
    </base-layout>
    <dialog-log-oper-detail ref="dialogDetailRef"></dialog-log-oper-detail>
</template>
<style scoped></style>