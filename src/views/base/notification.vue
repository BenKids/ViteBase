<script setup lang="ts">
const step:string = `const title = import.meta.env.VITE_BASE_TITLE;
const {
    isSupported,
    show,
    onClick,
} = useWebNotification({
    title: title,
    body: "这里是网页发送的通知消息",
    dir: 'auto',
    lang: 'en',
    renotify: true,
    tag: 'test',
})
onClick(()=>{
    console.log("[onClick] 点击通知消息，浏览器获取焦点",);
    window.focus();
})
function onSend() {
    if(isSupported.value) show();
}`;
const template:string = `<base-button label="发送通知" @click="onSend"></base-button>`;
const title = import.meta.env.VITE_BASE_TITLE;
const {
    isSupported,
    show,
    onClick,
} = useWebNotification({
    title: title,
    body: "这里是网页发送的通知消息",
    dir: 'auto',
    lang: 'en',
    renotify: true,
    tag: 'test',
})
onClick(()=>{
    console.log("[onClick] 点击通知消息，浏览器获取焦点",);
    window.focus();
})
function onSend() {
    if(isSupported.value) show();
}
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://www.vueusejs.com/core/useWebNotification/">
        <template #view>
            <base-button label="发送通知" @click="onSend"></base-button>
        </template>
    </the-base-layout>
</template>
<style scoped></style>