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
}>(), {
    options: () => [],
    sets: () => {
        return {}
    }
})
const treeRef = ref();
let filterText = ref("");
let searchResultData = ref<TsTree.Options>([]);
let searchLoading = ref<boolean>(false);
let treeKey = ref<number>(0);
let defaultExpandedKeys = reactive<(string | number)[]>([]);
//ref 子级加载
let treeLoading = ref<boolean>(false);
//ref 用于判断是否是本组件内的操作，防止props.modelValue的监听事件重复执行
let clickVal = ref<boolean>(false);
const emits = defineEmits(["nodeClick", "checkChange", "update:modelValue", "search", "load"]);

watch(filterText, evDebounce({
    func: () => {
        if (props.sets.lazy) {
            searchLoading.value = true;
            searchResultData.value = [];
            if (!filterText.value) return;
            emits("search", filterText.value, searchData);
        } else {
            treeRef.value.filter(filterText.value)
        }
    },
    wait: 300,
}))
watch(
    () => props.modelValue,
    () => {
        if (clickVal.value) {
            clickVal.value = false
        } else {
            getChecked();
            treeKey.value = treeKey.value ? 0 : 1
        }
    }
);

//handle 节点筛选
function filterNode(value: string, data: TsTree.Option) {
    if (!value) return true
    return data.label.includes(value)
}

//handle 远程搜索数据赋值
function searchData(data: TsTree.Options) {
    searchResultData.value = data;
    searchLoading.value = false;
}

//handle 选中回显
function getChecked() {
    if (typeof (props.modelValue) == "object") {
        let keys: (string | number)[] = [];
        for (let index = 0; index < props.modelValue.length; index++) {
            const item = evKeyChild({
                data: props.options,
                param: props.modelValue[index],
                key: "value",
            });
            if (item && (props.sets.checkStrictly || !item.children || item.children.length == 0)) keys.push(item.value);
        }
        defaultExpandedKeys = keys;
    } else {
        defaultExpandedKeys = [props.modelValue];
    }
}

//handle 移除高亮
const removeHighlight = () => {
    const current = treeRef.value.$el.getElementsByClassName("is-current");
    if (current && current.length > 0) {
        current[0].classList.remove("is-current");
    }
}

//handle 重置
function reset() {
    removeHighlight();
    filterText.value = "";
}

//handle 节点点击
function onNodeClick(params: TsTree.Option) {
    clickVal.value = true;
    if (!props.sets.showCheckbox) {
        emits("update:modelValue", params.value);
    }
    emits("nodeClick", params);
}

//handle 多选框选择
function onCheckbox(item: TsTree.Option) {
    clickVal.value = true;
    let modelValue = treeRef.value.getCheckedKeys();
    if (props.sets && !props.sets.checkStrictly) modelValue = [...treeRef.value.getHalfCheckedKeys(), ...modelValue];
    emits("update:modelValue", modelValue);
    emits("checkChange", item);
}

//handle 全部收起
function onFold(val: boolean) {
    let nodes = treeRef.value.store.nodesMap;
    for (const key in nodes) {
        nodes[key].expanded = val;
    }
}

//handle 全选
function onCheckedAll() {
    let res: TsTree.Option["value"][] = [];
    props.options.forEach((item) => {
        res.push(item.value);
    });
    treeRef.value.setCheckedKeys(res, false);
}

//handle 全部取消
function onUncheckAll() {
    treeRef.value.setCheckedKeys([]);
}

//handle 懒加载
function onLoad(node: TsTree.Node, resolve: (data: TsTree.Options) => void, reject: () => void) {
    treeLoading.value = true;

    function loadData(data: TsTree.Options) {
        resolve(data);
        treeLoading.value = false;
    }

    emits("load", node, loadData, reject);
}

//handle 懒加载搜索结果点击
function onItem(item: TsTree.Option) {
    emits("update:modelValue", item.value);
}

defineExpose({
    reset,
    removeHighlight
})
</script>

<template>
    <div :class="'base-tree ' + (sets.handleBtn ? 'is-handle-btn' : '')">
        <div class="base-tree-handle">
            <el-input v-model="filterText" clearable :placeholder="sets.placeholder || '请输入关键词'" v-if="sets.search ?? true"></el-input>
            <template v-if="sets.handleBtn">
                <el-button type="primary" plain size="small" @click="onFold(true)">全部展开</el-button>
                <el-button type="success" plain size="small" @click="onFold(false)">全部收起</el-button>
                <el-button type="primary" plain size="small" @click="onCheckedAll" v-if="sets.showCheckbox">全选
                </el-button>
                <el-button type="warning" plain size="small" @click="onUncheckAll" v-if="sets.showCheckbox">全部取消
                </el-button>
            </template>
        </div>
        <div class="tree-search-result el-tree" v-if="sets.lazy && filterText">
            <div class="el-tree__empty-block" v-if="searchLoading">
                <span class="el-tree__empty-text">数据加载中...</span></div>
            <template v-else>
                <div :class="{'el-tree-node__content':true,'is_current':item.value === modelValue}" v-for="item in searchResultData" :key="item.value" @click="onItem(item)">
                    <span class="el-tree-node__label">{{ item.label }}</span>
                </div>
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
            :filter-node-method="filterNode as TsTree.FilterNodeMethod"
            :indent="sets.indent"
            :icon="sets.icon"
            :lazy="sets.lazy"
            :props="defaultProps"
            :render-after-expand="false"
            :show-checkbox="sets.showCheckbox"
            :load="onLoad"
            @node-click="onNodeClick"
            @check-change="onCheckbox"
        >
            <template #default="{ node }">
                <span :class="{'custom-tree-node':true,'is_current':node.key === modelValue}">{{ node.label }}</span>
            </template>
            <template #empty v-if="treeLoading">
                <span class="el-tree__empty-text">数据加载中...</span>
            </template>
        </el-tree>
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

.base-tree :deep(.tree-search-result + .el-tree) {
    display: none;
}

.el-tree-node__content.is_current,
.base-tree :deep(.el-tree-node__content:has(.is_current)) {
    background-color: var(--el-color-primary-light-9);
}

.el-tree-node__label {
    padding-left: 24px;
}
</style>