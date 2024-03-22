<script setup lang="ts">
//? 全局变量
const route = useRoute();
let {collapse, lock} = pinia.storeToRefs(system());
const {avatar, nickName, deptName} = pinia.storeToRefs(user());
//* 锁屏设置
const setsLock: TsButton.Sets = {
    text: true,
    icon: IconSolarLockPasswordLinear,
};
// 图标
const collapseRight:TsIcons.Icon = shallowRef(IconLineMdMenuFoldRight);
const collapseLeft:TsIcons.Icon = shallowRef(IconLineMdMenuFoldLeft);
const iconUser:TsIcons.Icon = markRaw(IconSolarUserLinear);
//ref 面包屑
const optBreadcrumb = computed(() => {
    let pathArr = route.path.split("/");
    pathArr.splice(0, 1);
    let names = evMatchObjs({
        data: [...routesMenus, ...routesBase],
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
//todo 导航折叠
function onCollapse() {
    collapse.value = !collapse.value;
}
//todo 锁屏
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

.the-header-right :deep(.base-avatar) {
    vertical-align: middle;
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
