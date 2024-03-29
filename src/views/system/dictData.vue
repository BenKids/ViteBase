<script setup lang="ts">
//? 全局变量
const soreSystem = system();
//? 权限判断
const isPermi = (v: TsGen.Permissions) => evPermi(v);
//? 参数获取
const route = useRoute();
// 表单实例
const formRef = ref();
// 表格实例
const tableRef = ref();
// 新增弹框实例
const dialogAddRef = ref();
// 修改弹框实例
const dialogUpdateRef = ref();
//sets 字典名称设置
const setsType:TsFormSelect.Sets = {
    clearable: false,
}
//sets 批量删除设置
const setsDeleteMultiple = computed(():TsButton.Sets => {
    return {
        disabled: tableSelect.value.length == 0,
    }
})
//sets 表格设置
const tableSets: TsTable.Sets<TsDictData.TableItem> = {
    rowKey: "dictCode",
};
//ref 表单数据
let formModel = reactive<TsDictData.FormModel>({
    dictType: "",
    dictLabel: "",
    status: "",
});
//ref 表格选择数据
let tableSelect = ref<TsDictData.Table>([]);
//api 字典类型详情
const {send: getDictMsg} = apiDict.msg();
//api 字典名称数据
const {data: optionsType} = apiDict.options();
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_normal_disable");
//api 表格数据
const {loading: tableLoading, data: tableModel, page, pageSize, total, refresh} = apiDict.data(formModel);
//api 删除数据
const {send: sendDelete } = apiDict.dataDelete();
//todo 获取页面传值
onMounted(async () => {
    if(!route.query || !route.query.dictId) return;
    const res = await getDictMsg(route.query.dictId);
    formModel.dictType = res.dictType;
})

//todo 重置
function reload() {
    formRef.value.resetFields();
}
//todo 新增
function onAdd() {
    dialogAddRef.value.open(formModel.dictType);
}
//todo 修改
async function onUpdate(row: TsDictData.TableItem) {
    dialogUpdateRef.value.open(row.dictCode);
}

//todo 删除
function onDelete(row: TsDictData.TableItem) {
    ElMessageBox
        .confirm("是否确认删除字典编码为“" + row.dictCode + "”的数据项？","系统警告",{
            type: "warning",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
        })
        .then(()=>sendDelete(row.dictCode))
        .then(()=>{
            ElMessage({
                type: "success",
                message: "删除成功！",
            })
            accessAction("apiDictData",(api) => api.refresh());
        })
        .catch(()=>{})
}
//todo 返回
function onBack() {
    router.back();
    soreSystem.removeTabs("DictData");
}
</script>
<template>
    <base-layout @refresh="refresh(page)">
        <template #form>
            <base-form v-model="formModel" ref="formRef">
                <base-form-select label="字典名称" prop="dictType" :options="optionsType" :sets="setsType"></base-form-select>
                <base-form-input label="字典标签" prop="dictLabel"></base-form-input>
                <base-form-select label="状态" prop="status" :options="optionsStatus"></base-form-select>
                <template #handle>
                    <base-button label="重置" @click="reload"></base-button>
                </template>
            </base-form>
        </template>
        <template #handleLeftExtra>
            <base-button label="新增" @click="onAdd" v-if="isPermi(['system:dict:add'])"></base-button>
            <base-button label="批量删除" :sets="setsDeleteMultiple" v-if="isPermi(['system:dict:remove'])"></base-button>
            <base-button label="导出" v-if="isPermi(['system:dict:export'])"></base-button>
            <base-button label="返回" @click="onBack"></base-button>
        </template>
        <template #table>
            <base-table v-model="tableModel" v-model:selectData="tableSelect" v-loading="tableLoading" ref="tableRef" :sets="tableSets">
                <base-table-special type="selection"></base-table-special>
                <base-table-column label="字典编码" prop="dictCode"></base-table-column>
                <base-table-column label="字典标签" prop="dictLabel"></base-table-column>
                <base-table-column label="字典键值" prop="dictValue"></base-table-column>
                <base-table-column label="字典排序" prop="dictSort"></base-table-column>
                <base-table-tag label="状态" prop="status" :options="optionsStatus"></base-table-tag>
                <base-table-column label="备注" prop="remark"></base-table-column>
                <base-table-time label="创建时间" prop="createTime"></base-table-time>
                <base-table-special type="handle">
                    <template #default="scope">
                        <base-button label="修改" @click="onUpdate(scope.row)" v-if="isPermi(['system:dict:edit'])"></base-button>
                        <base-button label="删除" @click="onDelete(scope.row)" v-if="isPermi(['system:dict:remove'])"></base-button>
                    </template>
                </base-table-special>
            </base-table>
        </template>
        <template #pagination>
            <base-pagination v-model:currentPage="page" v-model:pageSize="pageSize" :total="total"></base-pagination>
        </template>
    </base-layout>
    <dialog-dict-data-add ref="dialogAddRef"></dialog-dict-data-add>
    <dialog-dict-data-update ref="dialogUpdateRef"></dialog-dict-data-update>
</template>
<style scoped></style>