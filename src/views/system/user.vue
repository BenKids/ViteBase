<script setup lang="ts">
//permit 权限
const isPermit = (v: TsGen.Permissions) => evPermit(v);
// 表单实例
const formRef = ref();
// 新增弹框实例
const dialogAddRef = ref();
//sets 修改弹框实例
const dialogUpdateRef = ref();
//sets 表单设置
const formSets: TsForm.Sets = {
    labelWidth: "6em",
};
//sets 表单隐藏项设置（用于重置数据）
const setFormItemHidden: TsFormItem.Sets = {
    hidden: true,
};
//sets 创建时间设置
const dateRangeSets: TsFormDatePicker.Sets = {
    type: "daterange",
};
//sets 表格设置
const tableSets: TsTable.Sets<TsUser.TableItem> = {
    rowKey: "userId",
};
//sets 批量删除按钮设置
const setsDeleteMultiple = computed((): TsButton.Sets => {
    return {
        disabled: tableSelect.value.length == 0,
    };
});
//sets 状态开关设置
const setsSwitch: TsTableSwitch.Sets = {
    activeValue: "0",
    inactiveValue: "1",
};
//sets 重置密码设置
const setsResetPsw: TsButton.Sets = {
    icon: markRaw(IconSolarKeyMinimalistic2Linear),
};
//ref 表单数据
let formModel = reactive<TsUser.FormModel>({
    deptId: "",
    userName: "",
    phonenumber: "",
    status: "",
    dateRange: [],
});
//ref 表格选择数据
let tableSelect = ref<TsUser.Table>([]);
//ref 修改状态传参
let statusObj = reactive<TsUser.UpdateStatus>({
    userId: "",
    status: "",
});
//api 左侧树数据
const {data: optionsTree} = apiDept.tree();
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 表格数据
const {loading: tableLoading, data: tableModel, page, pageSize, total, refresh} = apiUser.table(formModel);
//api 删除
const {send: sendDelete} = apiUser.delete();
//api 重置密码
const {send: resetPassword} = apiUser.resetPassword();
//api 导出数据查询
const {send: getExport} = apiUser.export(formModel);
//api 修改状态
const {send: sendStatus} = apiUser.updateStatus(statusObj);

//handle 重置
function reload() {
    formRef.value.resetFields();
}

//handle 新增
function onAdd() {
    dialogAddRef.value.open();
}

//handle 修改
function onEdit(row: TsUser.TableItem) {
    dialogUpdateRef.value.open(row.userId);
}

//handle 删除
function onDelete(row: TsUser.TableItem) {
    ElMessageBox.confirm("是否确认删除用户“" + row.nickName + "”？", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => sendDelete(row.userId))
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

//handle 重置密码
function onReset(row: TsUser.TableItem) {
    ElMessageBox.prompt("请输入" + row.userName + "的新密码", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(({value}) =>
            resetPassword({
                userId: row.userId,
                password: value,
            })
        )
        .then(() => {
            ElMessage({
                type: "success",
                message: "密码修改成功",
            });
        })
        .catch(() => {
        });
}

//handle 导出
function onExport() {
    ElMessageBox.confirm("是否确认导出所有用户数据项?", "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(async () => getExport())
        .then((res) => {
            console.log("[res]", res);
            // evDownload(res.msg);
        })
        .catch(() => {
        });
}

//handle 切换状态
function onSwitch(val: TsSwitch.Change, row: TsUser.TableItem) {
    const text = val === "1" ? "停用" : "启用";
    ElMessageBox.confirm("确认要" + text + "用户“" + row.userName + "”吗？", "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            statusObj.status = val;
            statusObj.userId = row.userId;
            return sendStatus();
        })
        .then(() => {
            ElMessage({
                type: "success",
                message: text + "成功！",
            });
            accessAction("apiUserTable", (api) => api.refresh());
        })
        .catch(() => {
            row.status = val === "0" ? "1" : "0";
        });
}
</script>
<template>
    <base-layout @refresh="refresh(page)">
        <template #left>
            <base-tree v-model="formModel.deptId" :options="optionsTree"></base-tree>
        </template>
        <template #form>
            <base-form v-model="formModel" ref="formRef" :sets="formSets">
                <base-form-input label="用户名称" prop="userName"></base-form-input>
                <base-form-input label="手机号码" prop="phonenumber"></base-form-input>
                <base-form-select label="状态" prop="status" :options="optionsStatus"></base-form-select>
                <base-form-date-picker label="创建时间" prop="dateRange" :sets="dateRangeSets"></base-form-date-picker>
                <base-form-item prop="deptId" :sets="setFormItemHidden"></base-form-item>
                <template #handle>
                    <base-button label="重置" @click="reload"></base-button>
                </template>
            </base-form>
        </template>
        <template #handleLeftExtra>
            <base-button label="新增" v-if="isPermit(['system:user:add'])" @click="onAdd"></base-button>
            <base-button label="批量删除" :sets="setsDeleteMultiple" v-if="isPermit(['system:user:remove'])" @click="onDeleteMultiple"></base-button>
            <base-button label="导入" v-if="isPermit(['system:user:import'])"></base-button>
            <base-button label="导出" v-if="isPermit(['system:user:export'])" @click="onExport"></base-button>
        </template>
        <template #table>
            <base-table v-model="tableModel" v-model:selectData="tableSelect" v-loading="tableLoading" ref="tableRef" :sets="tableSets">
                <base-table-special type="selection"></base-table-special>
                <base-table-column label="用户编号" prop="userId"></base-table-column>
                <base-table-column label="用户名称" prop="userName" width="140"></base-table-column>
                <base-table-column label="用户昵称" prop="nickName"></base-table-column>
                <base-table-column label="部门" prop="deptName" width="210"></base-table-column>
                <base-table-column label="手机号码" prop="phonenumber" width="130"></base-table-column>
                <base-table-switch label="状态" prop="status" :sets="setsSwitch" width="72" @change="onSwitch"></base-table-switch>
                <base-table-time label="创建时间" prop="createTime"></base-table-time>
                <base-table-special type="handle" width="245">
                    <template #default="scope">
                        <base-button label="修改" v-if="scope.row.userId !== 1 && isPermit(['system:user:edit'])" @click="onEdit(scope.row)"></base-button>
                        <base-button label="删除" v-if="scope.row.userId !== 1 && isPermit(['system:user:remove'])" @click="onDelete(scope.row)"></base-button>
                        <base-button label="重置密码" :sets="setsResetPsw" v-if="scope.row.userId !== 1 && isPermit(['system:user:resetPwd'])" @click="onReset(scope.row)"></base-button>
                    </template>
                </base-table-special>
            </base-table>
        </template>
        <template #pagination>
            <base-pagination v-model:currentPage="page" v-model:pageSize="pageSize" :total="total"></base-pagination>
        </template>
    </base-layout>
    <dialog-user-add ref="dialogAddRef"></dialog-user-add>
    <dialog-user-edit ref="dialogUpdateRef"></dialog-user-edit>
</template>
<style scoped>
.base-layout :deep(.base-layout-handle-left) {
    min-width: 430px;
}
</style>
