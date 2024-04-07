<script setup lang="ts">
//permit 权限判断
import apiLogLogin from "@/assets/api/monitor/apiLogLogin.ts";
//sets 解锁按钮设置
const setsUnlock:TsButton.Sets = {
    type: "success",
    icon: markRaw(IconSolarLockUnlockedLinear)
}
const isPermit = (v: TsGen.Permissions) => evPermit(v);
// 表单实例
const formRef = ref();
// 表格实例
const tableRef = ref();
//sets 登录时间设置
const setsDateRange: TsFormDatePicker.Sets = {
    type: "daterange",
}
//sets 批量删除按钮设置
const setsDeleteBatch = computed((): TsButton.Sets => {
    return {
        disabled: tableSelect.value.length == 0,
    }
})
//sets 表格设置
const tableSets: TsTable.Sets<TsLogLogin.TableItem> = {
    rowKey: "infoId",
};
//ref 表单数据
let formModel = reactive<TsLogLogin.FormModel>({
    ipaddr: "",
    userName: "",
    status: "",
    dateRange: [],
});
//ref 表格选择数据
let tableSelect = ref<TsLogLogin.Table>([]);
//api 表格数据
const {loading: tableLoading, data: tableModel, page, pageSize, total, refresh} = apiLogLogin.table(formModel);
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_common_status");

//todo 重置
function reload() {
    formRef.value.resetFields();
}
//todo 解锁
function onUnlock(row:TsLogLogin.TableItem) {
    console.log("[row]",row);
}
</script>
<template>
    <base-layout @refresh="refresh(page)">
        <template #form>
            <base-form v-model="formModel" ref="formRef">
                <base-form-input label="登录地址" prop="ipaddr"></base-form-input>
                <base-form-input label="用户名称" prop="userName"></base-form-input>
                <base-form-select label="状态" prop="status" :options="optionsStatus"></base-form-select>
                <base-form-date-picker label="登录时间" prop="dateRange" :sets="setsDateRange"></base-form-date-picker>
                <template #handle>
                    <base-button label="重置" @click="reload"></base-button>
                </template>
            </base-form>
        </template>
        <template #handleLeftExtra>
            <base-button label="批量删除" :sets="setsDeleteBatch" v-if="isPermit(['monitor:logininfor:remove'])"></base-button>
            <base-button label="清空" v-if="isPermit(['monitor:logininfor:remove'])"></base-button>
            <base-button label="导出" v-if="isPermit(['monitor:logininfor:export'])"></base-button>
        </template>
        <template #table>
            <base-table v-model="tableModel" v-model:selectData="tableSelect" v-loading="tableLoading" ref="tableRef" :sets="tableSets">
                <base-table-special type="selection"></base-table-special>
                <base-table-column label="访问编号" prop="infoId"></base-table-column>
                <base-table-column label="用户名称" prop="userName"></base-table-column>
                <base-table-column label="登录地址" prop="ipaddr"></base-table-column>
                <base-table-column label="登录地点" prop="loginLocation"></base-table-column>
                <base-table-column label="浏览器" prop="browser"></base-table-column>
                <base-table-column label="操作系统" prop="os"></base-table-column>
                <base-table-tag label="登录状态" prop="status" :options="optionsStatus"></base-table-tag>
                <base-table-column label="操作信息" prop="msg"></base-table-column>
                <base-table-time label="登录日期" prop="loginTime"></base-table-time>
                <base-table-special type="handle">
                    <template #default="scope">
                        <base-button label="解锁" :sets="setsUnlock" @click="onUnlock(scope.row)" v-if="isPermit(['monitor:logininfor:unlock'])"></base-button>
                    </template>
                </base-table-special>
            </base-table>
        </template>
        <template #pagination>
            <base-pagination v-model:currentPage="page" v-model:pageSize="pageSize" :total="total"></base-pagination>
        </template>
    </base-layout>
</template>
<style scoped></style>