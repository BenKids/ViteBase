<script setup lang="ts">
//permit 权限判断
const isPermit = (v: TsGen.Permissions) => evPermit(v);
//sets 强退按钮设置
const setsForceLogout:TsButton.Sets = {
    type: "danger",
    icon: markRaw(IconSolarLogout2Linear)
}
// 表单实例
const formRef = ref();
// 表格实例
const tableRef = ref();
//sets 表格设置
const tableSets: TsTable.Sets<TsOnline.TableItem> = {
    rowKey: "tokenId",
};
//ref 表单数据
let formModel = reactive<TsOnline.FormModel>({
    ipaddr: "",
    userName: "",
});
//ref 表格选择数据
let tableSelect = ref<TsOnline.Table>([]);
//api 表格数据
const {loading: tableLoading, data: tableModel, page, pageSize, total, refresh} = apiOnline.table(formModel);

//handle 重置
function reload() {
    formRef.value.resetFields();
}
//handle 强退
function onForceLogout(row:TsOnline.TableItem) {
    console.log("[row]",row);
}
</script>
<template>
    <base-layout @refresh="refresh(page)">
        <template #form>
            <base-form v-model="formModel" ref="formRef">
                <base-form-input label="登录地址" v-model="formModel.ipaddr" prop="ipaddr"></base-form-input>
                <base-form-input label="用户名称" v-model="formModel.userName" prop="userName"></base-form-input>
                <template #handle>
                    <base-button label="重置" @click="reload"></base-button>
                </template>
            </base-form>
        </template>
        <template #handleLeftExtra></template>
        <template #table>
            <base-table v-model="tableModel" v-model:selectData="tableSelect" v-loading="tableLoading" ref="tableRef" :sets="tableSets">
                <base-table-special type="index">
                    <template #default="scope">{{(page - 1) * pageSize + scope.$index + 1}}</template>
                </base-table-special>
                <base-table-column label="会话编号" prop="tokenId"></base-table-column>
                <base-table-column label="登录名称" prop="userName"></base-table-column>
                <base-table-column label="部门名称" prop="deptName"></base-table-column>
                <base-table-column label="主机" prop="ipaddr"></base-table-column>
                <base-table-column label="登录地点" prop="loginLocation"></base-table-column>
                <base-table-column label="浏览器" prop="browser"></base-table-column>
                <base-table-column label="操作系统" prop="os"></base-table-column>
                <base-table-time label="登录时间" prop="loginTime"></base-table-time>
                <base-table-special type="handle">
                    <template #default="scope">
                        <base-button label="强退" :sets="setsForceLogout" @click="onForceLogout(scope.row)" v-if="isPermit(['monitor:online:forceLogout'])"></base-button>
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