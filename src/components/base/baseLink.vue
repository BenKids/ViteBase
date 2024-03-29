<script setup lang="ts">
withDefaults(
    defineProps<{
        href?: TsLink.Href;
        to?: TsRouter.RouteRecordName;
        query?: TsGen.Object;
        sets?: TsLink.Sets;
    }>(),
    {
        sets: () => {
            return {};
        },
    }
);
</script>
<template>
    <el-link
        class="base-link"
        :type="sets.type ?? 'primary'"
        :underline="sets.underline"
        :disabled="sets.disabled"
        :icon="sets.icon"
        :target="sets.target"
        :href="href"
    >
        <slot v-if="href"></slot>
        <router-link :to="sets.disabled ? {} : {name: to,query:query}" v-else>
            <slot></slot>
        </router-link>
    </el-link>
</template>
<style scoped>
.base-link :deep(a) {
    text-decoration: none;
    color: inherit;
    cursor: inherit;
}
</style>
