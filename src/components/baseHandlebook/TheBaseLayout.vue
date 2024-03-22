<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        originalLink: string;
        step?: string;
        template?: string;
        sets?: TsTheBaseLayout.Sets;
    }>(),
    {
        sets() {
            return {};
        },
    }
)
let sets = reactive<TsTheBaseLayout.Sets>(props.sets);
const demo = getCurrentInstance();
if (demo) {
    for (const key in demo.slots) {
        sets[key as keyof TsTheBaseLayout.Sets] = true;
    }
}
</script>
<template>
    <div class="the-base-layout">
        <div class="the-base-tips part tips" v-if="sets.tips">
            <div class="part-title">注意事项</div>
            <div class="part-content">
                <slot name="tips"></slot>
            </div>
        </div>
        <div class="the-base-view part view">
            <div class="part-title">
                <span>展示</span>
                <base-link :href="originalLink" target="_blank" v-if="originalLink">原文链接</base-link>
            </div>
            <div class="part-content">
                <slot name="view"></slot>
            </div>
        </div>
        <div class="the-base-vue part">
            <template v-if="step">
                <div class="part-title step">Step</div>
                <div class="part-content step">
                    <the-code-mirror :code="step"></the-code-mirror>
                </div>
            </template>
            <template v-if="template">
                <div class="part-title template">Template</div>
                <div class="part-content template">
                    <the-code-mirror :code="template"></the-code-mirror>
                </div>
            </template>
        </div>
        <div class="the-base-handle part attr" v-if="sets.attr">
            <div class="part-title">Attr</div>
            <div class="part-content">
                <slot name="attr"></slot>
            </div>
        </div>
        <div class="the-base-handle part options" v-if="sets.options">
            <div class="part-title">Options</div>
            <div class="part-content">
                <slot name="options"></slot>
            </div>
        </div>
        <div class="the-base-handle part sets" v-if="sets.sets">
            <div class="part-title">Sets</div>
            <div class="part-content">
                <slot name="sets"></slot>
            </div>
        </div>
        <div class="the-base-handle part slot" v-if="sets.slot">
            <div class="part-title">Slot</div>
            <div class="part-content">
                <slot name="slot"></slot>
            </div>
        </div>
    </div>
</template>
<style scoped>
.the-base-layout {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.the-base-vue {
    display: flex;
    flex-direction: column;
}

.the-base-vue .part-content {
    flex: 1;
}

.part {
    border-radius: var(--base-radius);
    background-color: var(--base-bgc-white);
    box-shadow: var(--base-shadow-part);
    padding: var(--base-gap);
}

.part + .part {
    margin-top: var(--base-gap);
}

.part-title {
    font-size: 16px;
    margin-bottom: var(--base-gap);
}

.part-content {
    height: calc(100% - 34px);
}

.part-content + .part-title {
    margin-top: var(--base-gap);
}

.the-base-view .part-title {
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.the-base-layout :deep(.base-form-radio .base-radio) {
    width: 100%;
}

.the-base-layout :deep(.el-empty) {
    padding: 0;
}

.the-base-layout :deep(.CodeMirror-code>div) {
    padding: 3px 0;
}
</style>