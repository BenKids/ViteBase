<script setup lang="ts">

const {themeMode} = pinia.storeToRefs(storeConfig());
const setsTheme: TsSwitch.Sets = {
    inlinePrompt: true,
    activeValue: "dark",
    inactiveValue: "light",
    activeActionIcon: markRaw(IconSolarMoonFogBold),
    inactiveActionIcon: markRaw(IconSolarSunFogBold)
}
let isDark = useDark({
    disableTransition: false,
    // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
    storageKey: 'useDarkKEY',
    // 暗黑class名字
    valueDark: 'dark',
    // 高亮class名字
    valueLight: 'light',
});
const onToggle = useToggle(isDark);
const {x, y} = useMouse();

function updateView() {
    const doc = document as unknown as any;
    //在不支持的浏览器里不做动画
    if (!doc.startViewTransition) {
        onToggle();
    } else {
        // 开始一次视图过渡：
        const transition = doc.startViewTransition(() => onToggle());
        transition.ready.then(() => {
            //计算按钮到最远点的距离用作裁剪圆形的半径
            const endRadius = Math.hypot(
                Math.max(x.value, innerWidth - x.value),
                Math.max(y.value, innerHeight - y.value)
            );
            const clipPath = [
                `circle(0px at ${x.value}px ${y.value}px)`,
                `circle(${endRadius}px at ${x.value}px ${y.value}px)`,
            ];
            //开始动画
            doc.documentElement.animate(
                {
                    clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
                },
                {
                    duration: 400,
                    easing: "ease-in",
                    pseudoElement: isDark.value
                        ? "::view-transition-old(root)"
                        : "::view-transition-new(root)",
                }
            );
        });
    }
}

</script>
<template>
    <base-tooltip content="主题">
        <base-switch v-model="themeMode" :sets="setsTheme" @change="updateView" class="the-toggle-circle"></base-switch>
    </base-tooltip>
</template>
<style scoped>
.the-toggle-circle {
    --el-switch-off-color: var(--el-color-warning);
}
</style>