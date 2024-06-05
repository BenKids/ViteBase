<script setup lang="ts">
let {collapse} = pinia.storeToRefs(storeSystem());
const options = routesMenus;
const logo = evAssets("image/vite.svg");
const title = import.meta.env.VITE_BASE_TITLE;
const scrollbarRef = ref()
const onMenuItem = (item: TsMenu.Option) => {
    if (item.name.indexOf("http") === 0) {
        ElMessageBox.confirm("即将前往第三方链接！是否访问？", "系统提示", {
            confirmButtonText: "前往",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                window.open(item.name);
            })
            .catch(() => {
            });
    } else if (item.meta.blank) {
        ElMessageBox.confirm("即将在新标签页打开！是否继续？", "系统提示", {
            confirmButtonText: "继续",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                window.open(window.location.href.split("#")[0] + "#" + item.name);
            })
            .catch(() => {
            });
    }
};
const route = useRoute();
const menu = computed((): TsMenu.Model | undefined => {
    return evKeyChild({
        data: options,
        param: route.name!.toString(),
        key: "name",
    });
});
onMounted(() => {
    nextTick(() => onScrollTo())
})
watch(() => collapse.value, (val: boolean) => {
    if (!val) setTimeout(() => onScrollTo(), 500)
});

function onScrollTo() {
    const isActive = document.getElementsByClassName("is-active base-menu-item");
    if (isActive && isActive.length > 0) {
        const top = (isActive[0] as HTMLElement).offsetTop;
        setTimeout(() => {
            fnScrollTo(0, top);
        }, 300)
    }
}

function fnScrollTo(ini: number, top: number) {
    let toTop = ini;
    if (toTop < top) {
        setTimeout(() => {
            scrollbarRef.value!.scrollTo(0, toTop);
            toTop += 20;
            fnScrollTo(toTop, top);
        }, 10)
    }
    return;
}
</script>

<template>
    <div class="the-menu">
        <el-tooltip :content="title" :disabled="!collapse" placement="right">
            <div :class="{ 'project-logo': true, collapse: collapse }">
                <base-image v-model="logo" :aria-label="title"></base-image>
            </div>
        </el-tooltip>
        <div v-show="!collapse" class="project-title">
            <span>{{ title }}</span>
        </div>
        <div class="menu-box">
            <el-scrollbar ref="scrollbarRef" v-if="menu">
                <base-menu v-model="menu" :options="options" :collapse="collapse" @menuItem="onMenuItem"></base-menu>
            </el-scrollbar>
        </div>
    </div>
</template>

<style scoped>
.project-logo {
    height: var(--base-header-height);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--base-gap);
    font-size: 16px;
    font-weight: bold;
    z-index: 10;
    width: 100%;
    padding: 0 var(--base-gap);
}

.project-title {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 36px;
}

.project-title > span {
    white-space: nowrap;
    position: absolute;
    line-height: 36px;
    color: var(--base-color-white);
    text-align: center;
    width: 100%;
    left: 0;
    font-weight: bold;
}

.menu-box {
    height: calc(100% - var(--base-header-height) - 36px);
}

.project-logo :deep(.base-image) {
    width: 32px;
}

.project-logo.collapse :deep(.base-image) {
    width: 24px;
}

.the-menu {
    height: 100%;
    border-radius: var(--base-radius);
    background-color: var(--base-bgc-menu);
}
</style>
