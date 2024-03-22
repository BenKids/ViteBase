<script setup lang="ts">
const step:string = `let show = ref<TsImageViewer.Model>(false);
const image = evAssets("image/avatar.jpg");
let optViewer = reactive<TsImageViewer.Options>([
    image,
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
])`;
const template:string = `<base-image-viewer v-model="show" :options="optViewer"></base-image-viewer>`;
let show = ref<TsImageViewer.Model>(false);
const image = evAssets("image/avatar.jpg");
let optViewer = reactive<TsImageViewer.Options>([
    image,
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
])
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "显示开关",
        dataType: "TsImageViewer.Model",
        required: true,
        default: "",
        optional: "true / false",
    },{
        key: "options",
        explain: "预览的图片链接列表",
        dataType: "TsImageViewer.Options",
        required: true,
        default: "",
        optional: "string[]",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "initialIndex",
        explain: "初始预览图像索引",
        dataType: "number",
        required: false,
        default: "0",
        optional: "",
    },{
        key: "infinite",
        explain: "循环预览",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "hideOnClickModal",
        explain: "点击遮罩关闭",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "zoomRate",
        explain: "缩放速度",
        dataType: "number",
        required: false,
        default: "1.2",
        optional: "",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/image.html">
        <template #tips>
            <base-alert title="图片可以换成图片链接，这里是引用静态资源"></base-alert>
        </template>
        <template #view>
            <base-button label="预览" @click="show = true"></base-button>
            <base-image-viewer v-model="show" :options="optViewer"></base-image-viewer>
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