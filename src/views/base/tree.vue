<script setup lang="ts">
const step:string = `const treeRef = ref();
const treeValue = ref<TsTree.Model>("");
const optTree = reactive<TsTree.Options>([
    {
        "value": "item1",
        "label": "选项1",
        children: [
          {
              "value": "item11",
              "label": "选项11"
          },
          {
              "value": "item12",
              "label": "选项12"
          },
          {
              "value": "item13",
              "label": "选项13"
          }
        ]
    },
    {
        "value": "item2",
        "label": "选项2"
    },
    {
        "value": "item3",
        "label": "选项3"
    }
]);`;
const template:string = `<base-tree v-model="treeValue" :options="optTree" ref="treeRef"></base-tree>`;
const treeRef = ref();
const treeValue = ref<TsTree.Model>("");
const optTree = reactive<TsTree.Options>([
    {
        "value": "item1",
        "label": "选项1",
        children: [
            {
                "value": "item11",
                "label": "选项11"
            },
            {
                "value": "item12",
                "label": "选项12"
            },
            {
                "value": "item13",
                "label": "选项13"
            }
        ]
    },
    {
        "value": "item2",
        "label": "选项2"
    },
    {
        "value": "item3",
        "label": "选项3"
    }
]);
const tableAttr:TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "绑定值",
        dataType: "TsTree.Model",
        required: true,
        default: "",
        optional: "string | number | string[] | number[]",
    },{
        key: "options",
        explain: "配置",
        dataType: "TsTree.Options",
        required: true,
        default: "",
        optional: "",
    },{
        key: "sets",
        explain: "参数设置",
        dataType: "TsTree.Sets",
        required: false,
        default: "",
        optional: "",
    }
];
const tableOptions:TsTheBaseTable.Model = [
    {
        key: "label",
        explain: "展示文本",
        dataType: "string",
        required: true,
        default: "",
        optional: "",
    },{
        key: "value",
        explain: "参数值",
        dataType: "string | number",
        required: true,
        default: "",
        optional: "",
    },{
        key: "isLeaf",
        explain: "指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效",
        dataType: "boolean",
        required: false,
        default: "",
        optional: "",
    },{
        key: "disabled",
        explain: "禁用",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "children",
        explain: "子级数据",
        dataType: "TsTree.Options",
        required: false,
        default: "",
        optional: "",
    }
];
const tableSets:TsTheBaseTable.Model = [];
</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="">
        <template #view>
            <base-tree v-model="treeValue" :options="optTree" ref="treeRef"></base-tree>
        </template>
        <template #attr>
            <the-base-table :data="tableAttr"></the-base-table>
        </template>
        <template #options>
            <the-base-table :data="tableOptions"></the-base-table>
        </template>
        <template #sets>
            <the-base-table :data="tableSets"></the-base-table>
        </template>
    </the-base-layout>
</template>
<style scoped></style>