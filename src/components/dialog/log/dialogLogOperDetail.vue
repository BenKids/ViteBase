<script setup lang="ts">
//sets 弹框设置
const dialogSets: TsDialog.Sets = {
    width: 1100,
    beforeClose: onClose,
}
//options 配置
const options: TsDescriptions.Options<TsLogOperDetail.FormModel> = [
    {
        label: "操作模块",
        prop: "title",
    }, {
        label: "登录信息",
        prop: "operName"
    }, {
        label: "请求地址",
        prop: "operUrl"
    }, {
        label: "请求方式",
        prop: "requestMethod"
    }, {
        label: "操作方法",
        prop: "method",
        span: 2,
    }, {
        label: "请求参数",
        prop: "operParam",
        span: 3,
    }, {
        label: "返回参数",
        prop: "jsonResult"
    }, {
        label: "操作状态",
        prop: "status"
    }, {
        label: "消耗时间(毫秒)",
        prop: "costTime"
    }, {
        label: "操作时间",
        prop: "operTime"
    }, {
        label: "异常信息",
        prop: "errorMsg"
    }
]
//ref 弹框开关
let model = ref<TsDialog.Model>(false);
//ref 展示数据
let formModel = reactive<TsLogOperDetail.FormModel>({
    operId: "",
    title: "",
    businessType: "",
    operName: "",
    operIp: "",
    operLocation: "",
    status: "",
    operTime: "",
    costTime: "",
    operUrl: "",
    requestMethod: "",
    method: "",
    operParam: "",
    jsonResult: "",
    errorMsg: "",
});
//api 类型数据
const {data: optionsType} = apiGen.dicts("sys_oper_type");
//api 状态数据
const {data: optionsStatus} = apiGen.dicts("sys_common_status");

//handle 关闭
function onClose() {
    model.value = false;
}

//handle 打开弹框
function open(row: TsLogOper.TableItem) {
    model.value = true;
    formModel = row;
}

defineExpose({
    open,
})
</script>
<template>
    <base-dialog v-model="model" title="操作日志详细" :sets="dialogSets" class="dialog-log-oper-detail">
        <base-descriptions v-model="formModel" :options="options">
            <template #titleValue>
                <span style="margin-right:var(--base-gap);">{{ formModel.title }}</span>
                <base-tag v-model="formModel.businessType" :options="optionsType"></base-tag>
            </template>
            <template #operNameValue>{{ formModel['operName'] }} / {{ formModel['operIp'] }} /
                {{ formModel['operLocation'] }}
            </template>
            <template #statusValue>
                <base-tag v-model="formModel.status" :options="optionsStatus"></base-tag>
            </template>
        </base-descriptions>
        <template #footer>
            <base-button label="关闭" @click="onClose"></base-button>
        </template>
    </base-dialog>
</template>
<style scoped>
.dialog-log-oper-detail :deep(.el-descriptions__label) {
    white-space: nowrap;
}

.dialog-log-oper-detail :deep(.el-descriptions__content) {
    word-break: break-all;
    min-width: 250px;
}
</style>