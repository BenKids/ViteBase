<script setup lang="ts">
const step:string = `const image = evAssets("image/avatar.jpg");
const options = reactive<TsImage.Options>([
    image,
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
])`;
const template:string = `<base-image v-model="image" :options="options"></base-image>`;
const setsAlert:TsAlert.Sets = {
    showIcon: true,
    type: "warning",
    closable: false,
}
const image = evAssets("image/avatar.jpg");
const options = reactive<TsImage.Options>([
    image,
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]);
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "图片",
        dataType: "TsImage.Model",
        required: true,
        default: "",
        optional: "string",
    },{
        key: "options",
        explain: "预览图片列表",
        dataType: "TsImage.Options",
        required: false,
        default: "",
        optional: "string[]",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsImage.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [
    {
        key: "fit",
        explain: "图片填充方式",
        dataType: "enum",
        required: false,
        default: "",
        optional: "fill / contain / cover / none / scale-down",
    },{
        key: "lazy",
        explain: "是否使用懒加载",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "initalIndex",
        explain: "初始预览图像索引",
        dataType: "number",
        required: false,
        default: "0",
        optional: "",
    },{
        key: "hideOnClickModal",
        explain: "当配置了options时，是否可以通过点击遮罩层关闭预览",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/image.html">
        <template #tips>
            <base-alert title="图片可以换成图片链接，这里是引用静态资源" :sets="setsAlert"></base-alert>
        </template>
        <template #view>
            <base-image v-model="image" :options="options"></base-image>
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