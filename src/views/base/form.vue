<script setup lang="ts">
const step: string = `const setsRequired: TsFormItem.Sets = {
    required: true,
}
const formRef = ref();
const formData = reactive<TsTheBaseForm.Model>({
    userName: "",
    phone: "",
})

function onSearch() {
    formRef.value.validate().then(() => {
        console.log("验证通过")
    }).catch(() => {
    })
}`;
const template: string = `<base-form ref="formRef" v-model="formData" @keyup.enter.native="onSearch">
    <base-form-input label="用户名" prop="username" :sets="setsRequired"></base-form-input>
    <base-form-input label="手机号" prop="phone" :sets="setsRequired"></base-form-input>
    <template #handle>
        <base-button label="查询"></base-button>
    </template>
</base-form>`;
const setsRequired: TsFormItem.Sets = {
    required: true,
}
const formRef = ref();
const formData = reactive<TsTheBaseForm.Model>({
    userName: "",
    phone: "",
})

function onSearch() {
    formRef.value.validate().then(() => {
        console.log("验证通过")
    }).catch(() => {
    })
}

const tableAttr: TsTheBaseTable.Model = [];
const tableSets: TsTheBaseTable.Model = [];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/form.html">
        <template #view>
            <base-form ref="formRef" v-model="formData" @keyup.enter.native="onSearch">
                <base-form-input label="用户名" prop="username" :sets="setsRequired"></base-form-input>
                <base-form-input label="手机号" prop="phone" :sets="setsRequired"></base-form-input>
                <template #handle>
                    <base-button label="查询"></base-button>
                </template>
            </base-form>
        </template>
        <template #attr>
            <the-base-table :data="tableAttr"></the-base-table>
        </template>
        <template #sets>
            <the-base-table :data="tableSets"></the-base-table>
        </template>
    </the-base-layout>
</template>
<style scoped></style>