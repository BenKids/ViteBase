<script setup lang="ts">
//? 用户信息
const { deptId } = pinia.storeToRefs(user());
const props = withDefaults(
	defineProps<{
		modelValue: TsDept.Dwdm;
	}>(),
	{}
);
// 树实例
const treeRef = ref();
const emits = defineEmits(["update:modelValue"]);
let model = computed({
	get: () => {
		const v = props.modelValue;
		if (!v && treeRef.value) treeRef.value.removeHighlight();
		return v;
	},
	set: (val) => emits("update:modelValue", val),
});
const setsDeptId: TsTree.Sets = {
	lazy: true,
	checkStrictly: true,
};
//api 数据初始化
const { send: getDeptId } = apiDept.TreeLazyInit(deptId.value);
//api 数据懒加载
let formDwdm = reactive<TsDept.TreeLazyChild>({
	dwdm: "",
});
const { send: getChildDeptId } = apiDept.TreeLazyChild(formDwdm);
async function onLoadTree(node: TsDept.Node, resolve: TsTree.Resolve) {
	if (node.level === 0) {
		const res = await getDeptId();
		resolve(res);
	} else {
		formDwdm.dwdm = node.data.dwdm;
		const res = await getChildDeptId();
		resolve(res);
	}
}
//api 数据远程搜索
let formDept = reactive<TsDept.TreeLazySearch>({
	deptName: "",
})
const { loading: loadingLazyValue, isLastPage: isLastPageLazyValue, data: options, page: pageLazyValue, onSuccess: getLazyValue, update: updateLazyValue } = apiDept.TreeLazyValue(formDept);
getLazyValue(async (res) => {
	if(!formDept.deptName && res.data.total == 0) {
		updateLazyValue({
			data: await getDeptId()
		})
	}
	loadingLazyValue.value = false;
})
function onSearch(val:string) {
	loadingLazyValue.value = true;
	pageLazyValue.value = 1;
	formDept.deptName = val;
}
//todo 滚动加载更多
const disabled = computed(():boolean => isLastPageLazyValue.value || loadingLazyValue.value || formDept.deptName == "");
function load() {
	if(disabled.value) return;
	loadingLazyValue.value = true;
	pageLazyValue.value++;
}
//todo 重置
async function reset() {
	formDept.deptName = "";
	treeRef.value.reset();
	updateLazyValue({
		data: await getDeptId()
	})
}
defineExpose({
	reset,
})
</script>
<template>
	<div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" class="the-tree-lazy">
		<base-tree ref="treeRef" v-model="model" :options="options" :sets="setsDeptId" :load="onLoadTree" @search="onSearch"></base-tree>
	</div>
</template>
<style scoped>
.the-tree-lazy {
	height: 100%;
	overflow: auto;
}
</style>
