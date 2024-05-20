<script setup lang="ts">
const step:string = ``;
const template:string = ``;
const videoSrc:TsVideo.Model = "https://www.runoob.com/try/demo_source/movie.mp4";
// const videoSrc:TsVideo.Model = evAssets("video/video.mp4");
const tableAttr:TsTheBaseTable.Model = [];
const tableSets:TsTheBaseTable.Model = [];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="">
        <template #view>
            <base-video v-model="videoSrc"></base-video>
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