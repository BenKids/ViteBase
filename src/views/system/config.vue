<script setup lang="ts">
//permit 权限判断
const isPermit = (v: TsGen.Permissions) => evPermit(v);
// 表单实例
const formRef = ref();
// 表格实例
const tableRef = ref();
// 添加参数弹框实例
const dialogAddRef = ref();
// 修改参数弹框实例
const dialogUpdateRef = ref();
//sets 创建时间设置
const setsDateRange: TsFormDatePicker.Sets = {
    type: "daterange",
}
//sets 表格设置
const setsTable: TsTable.Sets<TsConfig.TableItem> = {
    rowKey: "configId",
};
//sets 批量删除按钮设置
const setsDeleteM = computed((): TsButton.Sets => {
    return {
        disabled: tableSelect.value.length == 0,
    }
})
//ref 表单数据
let formModel = reactive<TsConfig.FormModel>({
    configName: "",
    configKey: "",
    configType: "",
    dateRange: [],
});
//ref 表格选择数据
let tableSelect = ref<TsConfig.TableData>([]);
//api 系统内置数据
const {data: optionsConfigType} = apiGen.dicts("sys_yes_no");
//api 表格数据
const {loading: tableLoading, data: tableModel, page, pageSize, total, refresh} = apiConfig.table(formModel);
//api 删除数据
const {send: sendDelete} = apiConfig.delete();
//api 刷新缓存
const {send: refreshCache} = apiConfig.refreshCache();

//handle 重置
function reload() {
    formRef.value.resetFields();
}

//handle 新增
function onAdd() {
    dialogAddRef.value.open();
}

//handle 修改
function onUpdate(row: TsConfig.TableItem) {
    dialogUpdateRef.value.open(row.configId);
}

//handle 删除、批量删除
function onDelete(row: TsConfig.TableItem) {
    const ids = row.configId ?? tableSelect.value.map(item => item.configId);
    ElMessageBox.confirm('是否确认删除参数编号为"' + ids + '"的数据项？', "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
    })
        .then(() => sendDelete(ids))
        .catch(() => {
        })
}
</script>
<template>
    <base-layout @refresh="refresh(page)">
        <template #form>
            <base-form v-model="formModel" ref="formRef">
                <base-form-input label="参数名称" v-model="formModel.configName" prop="configName"></base-form-input>
                <base-form-input label="参数键名" v-model="formModel.configKey" prop="configKey"></base-form-input>
                <base-form-select label="系统内置" v-model="formModel.configType" prop="configType" :options="optionsConfigType"></base-form-select>
                <base-form-date-picker label="创建时间" v-model="formModel.dateRange" prop="dateRange" :sets="setsDateRange"></base-form-date-picker>
                <template #handle>
                    <base-button label="重置" @click="reload"></base-button>
                </template>
            </base-form>
        </template>
        <template #handleLeftExtra>
            <base-button label="新增" @click="onAdd" v-if="isPermit(['system:config:add'])"></base-button>
            <base-button label="批量删除" :sets="setsDeleteM" @click="onDelete" v-if="isPermit(['system:config:remove'])"></base-button>
            <base-button label="导出" v-if="isPermit(['system:config:export'])"></base-button>
            <base-button label="刷新缓存" @click="refreshCache" v-if="isPermit(['system:config:remove'])"></base-button>
        </template>
        <template #table>
            <base-table v-model="tableModel" v-model:selectData="tableSelect" v-loading="tableLoading" ref="tableRef" :sets="setsTable">
                <base-table-special type="selection"></base-table-special>
                <base-table-column label="参数主键" prop="configId"></base-table-column>
                <base-table-column label="参数名称" prop="configName"></base-table-column>
                <base-table-column label="参数键名" prop="configKey"></base-table-column>
                <base-table-column label="参数键值" prop="configValue"></base-table-column>
                <base-table-tag label="系统内置" prop="configType" :options="optionsConfigType"></base-table-tag>
                <base-table-column label="备注" prop="remark"></base-table-column>
                <base-table-time label="创建时间" prop="createTime"></base-table-time>
                <base-table-special type="handle">
                    <template #default="scope">
                        <base-button label="修改" @click="onUpdate(scope.row)" v-if="isPermit(['system:config:edit'])"></base-button>
                        <base-button label="删除" @click="onDelete(scope.row)" v-if="isPermit(['system:config:remove'])"></base-button>
                    </template>
                </base-table-special>
            </base-table>
        </template>
        <template #pagination>
            <base-pagination v-model:currentPage="page" v-model:pageSize="pageSize" :total="total"></base-pagination>
        </template>
    </base-layout>
    <dialog-config-add ref="dialogAddRef"></dialog-config-add>
    <dialog-config-update ref="dialogUpdateRef"></dialog-config-update>
</template>
<style scoped></style>