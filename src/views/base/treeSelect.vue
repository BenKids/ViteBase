<script setup lang="ts">
const step: string = `const treeValue = ref<TsTreeSelect.Model>("");
const optTree = reactive<TsTreeSelect.Options>([
    {
        "value": "item1",
        "label": "选项1",
        children: [
            {
                "value": "item11",
                "label": "选项11选项11选项11选项11选项11选项11选项11"
            }, {
                "value": "item12",
                "label": "选项12"
            }, {
                "value": "item13",
                "label": "选项13"
            }
        ]
    }, {
        "value": "item2",
        "label": "选项2"
    }, {
        "value": "item3",
        "label": "选项3"
    }
]);`;
const template: string = `<base-tree-select v-model="treeValue" :options="optTree"></base-tree-select>`;
const treeValue = ref<TsTreeSelect.Model>("");
const optTree = reactive<TsTreeSelect.Options>([
    {
        "value": "item1",
        "label": "选项1",
        children: [
            {
                "value": "item11",
                "label": "选项11选项11选项11选项11选项11选项11选项11"
            }, {
                "value": "item12",
                "label": "选项12"
            }, {
                "value": "item13",
                "label": "选项13"
            }
        ]
    }, {
        "value": "item2",
        "label": "选项2"
    }, {
        "value": "item3",
        "label": "选项3"
    }
]);
const tableAttr: TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值",
        dataType: "TsTreeSelect.Model",
        required: true,
        default: "",
        optional: "",
    },{
        key: "options",
        explain: "配置",
        dataType: "TsTreeSelect.Options",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsTreeSelect.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="">
        <template #view>
            <base-tree-select v-model="treeValue" :options="optTree"></base-tree-select>
        </template>
        <template #attr>
            <the-base-table :data="tableAttr"></the-base-table>
        </template>
    </the-base-layout>
</template>
<style scoped></style>