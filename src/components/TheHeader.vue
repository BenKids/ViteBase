<script setup lang="ts">
//? 全局变量
const route = useRoute();
const {collapse, lock} = pinia.storeToRefs(storeSystem());
const {avatar, nickName, deptName} = pinia.storeToRefs(storeUser());
//sets 锁屏设置
const setsLock: TsButton.Sets = {
    text: true,
    icon: IconSolarLockPasswordLinear,
};
//ref 图标
const collapseRight: TsIcons.Icon = shallowRef(IconLineMdMenuFoldRight);
const collapseLeft: TsIcons.Icon = shallowRef(IconLineMdMenuFoldLeft);
const iconUser: TsIcons.Icon = markRaw(IconSolarUserLinear);
//ref 面包屑
const optBreadcrumb = computed(() => {
    let pathArr = route.path.split("/");
    pathArr.splice(0, 1);
    let names = evMatchObjs({
        data: [...routesMenus],
        dataKey: "name",
        params: pathArr,
    });
    let res: TsBreadcrumb.Options = [];
    for (let index = 0; index < names.length; index++) {
        const item = names[index];
        if (!item.meta || !item.name) continue;
        res.push({
            label: item.meta.label,
            toName: item.name,
        });
    }
    return res;
});
//api 退出登录
const {send: sendLogout} = apiLogin.logout();

//handle 导航折叠
function onCollapse() {
    collapse.value = !collapse.value;
}

//handle 锁屏
function onLock() {
    lock.value = true;
    router.push({
        name: "TheLock",
    });
}
</script>

<template>
    <div class="the-header">
        <div class="the-header-left">
            <base-icons class="the-icon" :icon="collapseRight" @click="onCollapse" v-if="collapse"></base-icons>
            <base-icons class="the-icon" :icon="collapseLeft" @click="onCollapse" v-else></base-icons>
            <base-breadcrumb :options="optBreadcrumb"></base-breadcrumb>
        </div>
        <div class="the-header-right">
            <el-text class="user-name-dept">
                <base-icons :icon="iconUser"></base-icons>
                {{ nickName }} / {{ deptName }}
            </el-text>
            <base-button label="锁屏" :sets="setsLock" @click="onLock"></base-button>
            <the-toggle-circle></the-toggle-circle>
            <the-toggle-language></the-toggle-language>
            <the-auto-insert-space></the-auto-insert-space>
            <the-size></the-size>
            <base-avatar v-model="avatar"></base-avatar>
            <base-button label="退出" @click="sendLogout"></base-button>
        </div>
    </div>
</template>

<style scoped>
.the-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: var(--base-border);
    padding: 0 var(--base-gap);
    height: var(--base-header-height);
}

.the-header-left {
    display: flex;
    align-items: center;
    gap: var(--base-gap);
}
.the-header-right {
    display: flex;
    align-items: center;
    gap: var(--base-gap);
}
.the-header-right :deep(.base-button) {
    padding: 0;
}
.the-header-right :deep(.base-button:hover) {
    background-color: transparent;
}
.the-icon {
    font-size: 18px;
    color: var(--el-color-primary);
    cursor: pointer;
}

.user-name-dept {
    position: relative;
    top: 1px;
    margin-right: 10px;
}

.user-name-dept svg {
    position: relative;
    top: 4px;
}
</style>
