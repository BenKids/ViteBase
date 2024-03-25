<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: TsTreeSelect.Model;
        options: TsTreeSelect.Options;
        sets?: TsTreeSelect.Sets;
    }>(),
    {
        sets: () => {
            return {};
        },
        options: () => [],
    }
);
const modelType = evTypeOf(props.modelValue);
const defaultExpandedKeys = computed(() => {
    if (!props.modelValue) return [];
    if (typeof (props.modelValue) == "object") {
        return props.modelValue;
    } else {
        return evGetPath({
            data: props.options,
            key: "value",
            value: props.modelValue,
            get: ["value"],
        });
    }
});
const defaultProps = {
    children: "children",
    label: "label",
    value: "value",
    isLeaf: "isLeaf",
    disabled: "disabled",
};
const emits = defineEmits(["update:modelValue", "change"]);
const model = computed({
    get: () => {
        return props.modelValue;
    },
    set: (val) => {
        emits("update:modelValue", val);
    },
});
const multiple = (() => {
    if (modelType == "array") return true;
    return false;
})();
const content = computed(() => {
    if (modelType == "array") return "";
    let res = evKeyChild({
        data: props.options,
        param: props.modelValue as string | number,
    });
    if (!res) return "";
    return res.label;
});
const treeSelectRef = ref();
let showTooltip = ref<boolean>(false);
watch(
    () => props.modelValue,
    () => fnShowTooltip()
);
watch(
    () => props.options,
    () => fnShowTooltip(),
    {deep: true}
);

async function fnShowTooltip() {
    if (modelType == "array") return;
    if (props.sets.showTooltip !== undefined) {
        showTooltip.value = props.sets.showTooltip;
        return;
    }
    if (props.sets.readonly) {
        nextTick(() => {
            const node = treeSelectRef.value;
            if (!node) return;
            showTooltip.value = evTextOver(node);
        });
        return;
    } else {
        await nextTick();
        let node = treeSelectRef.value.$el.children[0].children[0].children[1];
        if (node.offsetWidth < node.children[0].offsetWidth) {
            showTooltip.value = true;
        } else {
            showTooltip.value = false;
        }
    }
}

function onChange(val: TsTreeSelect.Model) {
    if (typeof (val) == "object") {
        let res: TsTreeSelect.Options = [];
        val.forEach(item => {
            let isItem = evKeyChild({
                data: props.options,
                param: item
            })
            if (isItem) res.push(isItem);
        });
        emits("change", res);
    } else {
        let res = evKeyChild({
            data: props.options,
            param: val
        })
        emits("change", res)
    }
}
</script>

<template>
    <el-tooltip :content="content" :disabled="!showTooltip" placement="top" popper-class="base-tooltip-tree-select">
        <div :class="{ 'base-tree-select readonly': true, placeholder: !content }" v-if="sets.readonly"
             ref="treeSelectRef">{{ content || "暂无数据" }}
        </div>
        <el-tree-select
            v-else
            class="base-tree-select"
            ref="treeSelectRef"
            v-bind="$attrs"
            v-model="model"
            :props="defaultProps"
            :data="options"
            :render-after-expand="sets.renderAfterExpand ?? false"
            :show-checkbox="sets.showCheckbox ?? false"
            :check-strictly="sets.checkStrictly"
            :check-on-click-node="sets.checkOnClickNode ?? false"
            :multiple="sets.multiple ?? multiple"
            :multiple-limit="sets.multipleLimit"
            :filterable="sets.filterable ?? true"
            :placeholder="sets.placeholder || '请选择'"
            :disabled="sets.disabled"
            :size="sets.size"
            :clearable="sets.clearable ?? true"
            :collapse-tags="sets.collapseTags"
            :collapse-tags-tooltip="sets.collapseTagsTooltip"
            :loading="sets.loading"
            :loading-text="sets.loadingText"
            :no-data-text="sets.noDataText"
            :empty-text="sets.emptyText || '无匹配数据'"
            :tag-type="sets.tagType"
            :lazy="sets.lazy"
            :accordion="sets.accordion ?? true"
            :indent="sets.indent"
            :icon="sets.icon"
            :node-key="sets.nodeKey || 'value'"
            :default-expanded-keys="defaultExpandedKeys"
            :readonly="sets.readonly ?? false"
            :expand-on-click-node="sets.expandOnClickNode"
            @change="onChange"></el-tree-select>
    </el-tooltip>
</template>
<style scoped>
.base-tree-select {
    width: var(--base-input-width);
}

.base-tree-select.readonly {
    color: var(--el-text-color-regular);
    --el-input-readonly-height: calc(var(--el-input-height, 32px) - 2px);
    border: var(--el-border);
    border-radius: var(--el-border-radius-base);
    height: var(--el-input-readonly-height);
    line-height: var(--el-input-readonly-height);
    padding: 0px 11px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.base-tree-select.readonly.placeholder {
    color: #a8abb2;
}

.base-tree-select :deep(.el-input__inner) {
    text-overflow: ellipsis;
}
</style>
