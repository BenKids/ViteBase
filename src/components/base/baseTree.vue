<script setup lang="ts">
const defaultProps = {
    children: "children",
    label: "label",
    isLeaf: "isLeaf",
    disabled: "disabled"
}
const props = withDefaults(defineProps<{
    modelValue: TsTree.Model,
    options?: TsTree.Options,
    sets?: TsTree.Sets,
}>(),{
    options: () => [],
    sets: () => {
        return {}
    }
})
const treeRef = ref();
const filterText = ref("");
const emits = defineEmits(["nodeClick","checkChange","update:modelValue","search"]);
const filterNode = (value:string, data:TsTree.Option) => {
    if (!value) return true
    return data.label.includes(value)
}
watch(() => filterText.value, (val) => {
    if(props.sets.lazy) emits("search",val)
    else treeRef.value.filter(val)
})
let treeKey = ref<number>(0);
let defaultExpandedKeys = reactive<(string | number)[]>([]);
watch(
	() => props.modelValue,
	() => {
        if(clickVal.value) {
            clickVal.value = false
        } else {
            getChecked();
            treeKey.value = treeKey.value ? 0 : 1
        }
    }
);
//handle 选中回显
function getChecked() {
    if(typeof(props.modelValue) == "object") {
        let keys:(string | number)[] = [];
        for (let index = 0; index < props.modelValue.length; index++) {
            const item = evKeyChild({
                data: props.options,
                param: props.modelValue[index],
                key: "value",
            });
            if(item && (props.sets.checkStrictly || !item.children || item.children.length == 0)) keys.push(item.value);
        }
        defaultExpandedKeys = keys;
    } else {
        defaultExpandedKeys = [props.modelValue];
    }
}
//ref 用于判断是否是本组件内的操作，防止props.modelValue的监听事件重复执行
let clickVal = ref<boolean>(false);
//handle 移除高亮
const removeHighlight = () => {
    const current = treeRef.value.$el.getElementsByClassName("is-current");
    if(current && current.length > 0) {
        current[0].classList.remove("is-current");
    }
}
//handle 重置
const reset = () => {
    removeHighlight();
    filterText.value = "";
}
//handle 节点点击
function onNodeClick(params:TsTree.Option) {
    clickVal.value = true;
    if(!props.sets.showCheckbox) {
        emits("update:modelValue",params.value);
    }
    emits("nodeClick",params);
}
//handle 多选框选择
function onCheckbox(item:TsTree.Option) {
    clickVal.value = true;
    let modelValue = treeRef.value.getCheckedKeys();
    if(props.sets && !props.sets.checkStrictly) modelValue = [...treeRef.value.getHalfCheckedKeys(), ...modelValue];
    emits("update:modelValue",modelValue);
    emits("checkChange",item);
}
//handle 全部收起
function onFold(val: boolean) {
    let nodes = treeRef.value.store.nodesMap;
    for (const key in nodes) {
        nodes[key].expanded = val;
    }
}
defineExpose({
    reset,
    removeHighlight
})
</script>

<template>
    <div :class="'base-tree ' + (sets.handleBtn ? 'is-handle-btn' : '')">
        <div class="base-tree-handle">
            <el-input
                v-model="filterText"
                clearable
                :placeholder="sets.placeholder || '请输入关键词'"
                v-if="sets.search ?? true"
            />
            <template v-if="sets.handleBtn">
                <el-button type="primary" plain size="small" @click="onFold(true)">全部展开</el-button>
                <el-button type="primary" plain size="small" @click="onFold(false)">全部收起</el-button>
            </template>
        </div>
        <el-tree
            v-bind="$attrs"
            ref="treeRef"
            node-key="value"
            :key="treeKey"
            :accordion="sets.accordion ?? true"
            :check-on-click-node="sets.checkOnClickNode"
            :check-strictly="sets.checkStrictly"
            :current-node-key="typeof(modelValue) == 'object' ? undefined : modelValue"
            :data="options"
            :default-expanded-keys="defaultExpandedKeys"
            :default-checked-keys="defaultExpandedKeys"
            :empty-text="sets.emptyText"
            :expand-on-click-node="sets.expandOnClickNode ?? false"
            :filter-node-method="filterNode"
            :highlight-current="sets.highlightCurrent ?? true"
            :indent="sets.indent"
            :icon="sets.icon"
            :lazy="sets.lazy"
            :props="defaultProps"
            :render-after-expand="false"
            :show-checkbox="sets.showCheckbox"
            @node-click="onNodeClick"
            @check-change="onCheckbox"
        />
    </div>
</template>

<style scoped>
    .base-tree {
        height: 100%;
    }
    .base-tree-handle .el-button {
        margin-top: 10px;
    }
    .base-tree :deep(.el-tree) {
        overflow: auto;
        margin-top: 10px;
    }
    .base-tree:not(.is-handle-btn) :deep(.el-tree) {
        height: calc(100% - 44px);
    }
    .base-tree.is-handle-btn :deep(.el-tree) {
        height: calc(100% - 68px);
    }
</style>