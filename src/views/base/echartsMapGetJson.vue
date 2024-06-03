<script setup lang="ts">
const formRef = ref();
const setsAlert:TsAlert.Sets = {
    showIcon: true,
    type: "warning"
}
const setsAdcode: TsFormInput.Sets = {
    required: true,
}
const setsEdit: TsEdit.Sets = {
    readOnly: true,
}
const originalLink: string = "https://datav.aliyun.com/portal/school/atlas/area_selector#&lat=33.521903996156105&lng=104.29849999999999&zoom=4";
let formModel = reactive({
    adcode: "",
});
let jsonOptions = ref<string>("");
let jsonData = ref<string>("");

function onCreate() {
    formRef.value.validate().then(() => {
        apiGen.mapJson(formModel.adcode).then(({options, jsons}) => {
            jsonOptions.value = JSON.stringify(options);
            jsonData.value = JSON.stringify(jsons);
        })
    })
}
</script>
<template>
    <base-layout class="echarts-map-getjson">
        <template #form>
            <base-form v-model="formModel" ref="formRef" @keyup.enter="onCreate">
                <base-form-input label="行政区号" v-model="formModel.adcode" prop="adcode" :sets="setsAdcode"></base-form-input>
                <template #handle>
                    <base-button label="生成地图数据" @click="onCreate"></base-button>
                </template>
            </base-form>
        </template>
        <template #handleLeft>
            <base-alert title="tips：此方法调用第三方在线接口，离线请将数据保存到本地" :sets="setsAlert"></base-alert>
        </template>
        <template #handleRight>
            <base-link :href="originalLink" target="_blank">原文链接</base-link>
        </template>
        <template #table>
            <div class="part-item">
                <div class="part-title">mapOptions</div>
                <base-edit v-model="jsonOptions" :sets="setsEdit"></base-edit>
            </div>
            <div class="part-item">
                <div class="part-title">mapJson</div>
                <base-edit v-model="jsonData" :sets="setsEdit"></base-edit>
            </div>
        </template>
    </base-layout>
</template>
<style scoped>
.echarts-map-getjson :deep(.base-layout-table) {
    display: flex;
    align-items: stretch;
    gap: var(--base-gap);
}

.echarts-map-getjson .part-item {
    flex: 1;
    width: calc(50% - var(--base-gap) / 2);
}

.echarts-map-getjson .part-title {
    font: bold 18px Arial, Helvetica, sans-serif;
    margin-bottom: var(--base-gap);
}

.echarts-map-getjson :deep(.base-edit) {
    height: calc(100% - 40px);
}
</style>