<script setup lang="ts">
const step:string = ``;
const template:string = `<base-lock></base-lock>`;
const tableSlot:TsTheBaseTableSlot.Model = [
    {
        key: "default",
        explain: "默认插槽"
    }
];
let lock = ref<boolean>(false);
function onLock() {
    lock.value = true;
}
function onBack() {
    lock.value = false;
}
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="">
        <template #view>
            <base-button label="锁屏" @click="onLock"></base-button>
            <base-lock v-if="lock">
                <base-button label="解锁" @click="onBack"></base-button>
            </base-lock>
        </template>
        <template #slot>
            <the-base-table-slot :data="tableSlot"></the-base-table-slot>
        </template>
    </the-base-layout>
</template>
<style scoped></style>