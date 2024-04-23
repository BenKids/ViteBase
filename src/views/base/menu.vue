<script setup lang="ts">
const step: string = `const stores = system();
let {collapse} = pinia.storeToRefs(stores);
const options:TsMenu.Options = routesBase;
const route = useRoute();
const menu = computed((): TsMenu.Model => {
    let r = evKeyChild({
        data: options,
        param: route.name!.toString(),
        key: "name",
    });
    return r!;
});
const onMenuItem = (item: TsMenu.Option) => {
    console.log("item",item)
};`;
const template: string = `<base-menu v-model="menu" :options="options" :collapse="collapse" @menuItem="onMenuItem"></base-menu>`;
const stores = storeSystem();
let {collapse} = pinia.storeToRefs(stores);
const options:TsMenu.Options = routesBase;
const route = useRoute();
const menu = computed((): TsMenu.Model => {
    let r = evKeyChild({
        data: options,
        param: route.name!.toString(),
        key: "name",
    });
    return r!;
});
const onMenuItem = (item: TsMenu.Option) => {
    console.log("item",item)
};
const tableAttr: TsTheBaseTable.Model = [
    {
        key: "v-model",
        explain: "选中对象",
        dataType: "TsMenu.Model",
        required: true,
        default: "",
        optional: "",
    },{
        key: "options",
        explain: "配置",
        dataType: "TsMenu.Options",
        required: true,
        default: "",
        optional: "",
    },{
        key: "collapse",
        explain: "折叠开关",
        dataType: "TsMenu.Collapse",
        required: true,
        default: "",
        optional: "true / false",
    },{
        key: "@menuItem",
        explain: "点击回调",
        dataType: "Function",
        required: false,
        default: "",
        optional: "(item:TsMenu.Option) => void",
    }
];
const tableOptions: TsTheBaseTable.Model = [
    {
        key: "path",
        explain: "访问路径/地址",
        dataType: "string",
        required: true,
        default: "",
        optional: "",
    },{
        key: "name",
        explain: "页面名称，用于路由跳转时的name",
        dataType: "string",
        required: true,
        default: "",
        optional: "",
    },{
        key: "redirect",
        explain: "路由重定向,重定向要写访问路径",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "children",
        explain: "嵌套子级",
        dataType: "TsRoutes.RoutesMenus",
        required: false,
        default: "",
        optional: "",
    },{
        key: "component",
        explain: "页面文件，在页面有children时此参数可以不传，但重定向需要配置",
        dataType: "TsRouter.RouteRecordSingleView['component']",
        required: true,
        default: "",
        optional: "",
    },{
        key: "meta",
        explain: "配置",
        dataType: "TsRoutes.Meta",
        required: true,
        default: "",
        optional: "",
    },{
        key: "meta.label",
        explain: "展示文本",
        dataType: "string",
        required: true,
        default: "",
        optional: "",
    },{
        key: "meta.hidden",
        explain: "是否显示，可用于配置权限",
        dataType: "Function",
        required: false,
        default: "() => false",
        optional: "() => boolean",
    },{
        key: "meta.disabled",
        explain: "禁用",
        dataType: "Function",
        required: false,
        default: "() => false",
        optional: "() => boolean",
    },{
        key: "meta.blank",
        explain: "在新的标签页中打开",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    },{
        key: "meta.menu",
        explain: "访问此路由时菜单选中name",
        dataType: "string",
        required: false,
        default: "",
        optional: "",
    },{
        key: "meta.icon",
        explain: "图标",
        dataType: "string",
        required: false,
        default: "",
        optional: "Icons",
    },{
        key: "meta.keepAlive",
        explain: "页面缓存，访问其他页面再次访问此页面保留页面数据",
        dataType: "boolean",
        required: false,
        default: "false",
        optional: "true / false",
    }
];
const tableSets: TsTheBaseTable.Model = [
    {
        key: "uniqueOpened",
        explain: "只保持一个子菜单的展开",
        dataType: "boolean",
        required: false,
        default: "true",
        optional: "true / false",
    },{
        key: "backgroundColor",
        explain: "菜单的背景颜色",
        dataType: "string",
        required: false,
        default: "var(--base-bgc-menu)",
        optional: "",
    },{
        key: "textColor",
        explain: "文字颜色",
        dataType: "string",
        required: false,
        default: "var(--base-color-white)",
        optional: "",
    },{
        key: "activeTextColor",
        explain: "激活文字颜色",
        dataType: "string",
        required: false,
        default: "var(--base-color-white)",
        optional: "",
    }
];

</script>
<template>
    <the-base-layout :step="step" :template="template" original-link="https://element-plus.gitee.io/zh-CN/component/menu.html">
        <template #view>
            <base-menu v-model="menu" :options="options" :collapse="collapse" @menuItem="onMenuItem"></base-menu>
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
<style scoped>
.the-base-layout :deep(.the-base-view .part-content) {
    overflow: auto;
    max-height: 500px;
}
</style>