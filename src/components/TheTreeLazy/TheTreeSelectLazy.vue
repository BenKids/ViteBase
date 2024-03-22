<script setup lang="ts">
//? 用户信息
const { deptId } = pinia.storeToRefs(user());
const props = withDefaults(
	defineProps<{
		modelValue: TsDept.DeptId;
	}>(),
	{}
);
const emits = defineEmits(["update:modelValue"]);
//api 回显时查询对应的单位名称
const { data: deptObj, send: getDeptObj } = apiDept.getMsg(toRef(props, "modelValue"));
const model = computed({
	get: () => {
		if(props.modelValue) getDeptObj();
		return props.modelValue ? deptObj.value.deptName : props.modelValue;
	},
	set: (val) => emits("update:modelValue", val),
});
//? 树实例
const treeSelectRef = ref();
//* 设置
const setsDeptId: TsFormTreeSelect.Sets = {
	accordion: false,
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
let parameterDpet = reactive<TsDept.TreeLazySearch>({
	deptName: "",
})
const { loading: loadingLazyValue, isLastPage: isLastPageLazyValue, data: options, page: pageLazyValue, onSuccess: getLazyValue, update: updateLazyValue } = apiDept.TreeLazyValue(parameterDpet);
getLazyValue(async (res) => {
	if (!parameterDpet.deptName && res.data.total == 0) {
		updateLazyValue({
			data: await getDeptId(),
		});
	}
	loadingLazyValue.value = false;
	// 加载的数据过少没有出现滚动条时在此加载下一页数据
	if (domScrollRef.value.scrollHeight <= domScrollRef.value.clientHeight && !disabled.value) pageLazyValue.value++;
});
function onSearch(val: string) {
	loadingLazyValue.value = true;
	pageLazyValue.value = 1;
	parameterDpet.deptName = val;
}
//todo 滚动加载更多
const domScrollRef = ref();
const disabled = computed((): boolean => isLastPageLazyValue.value || loadingLazyValue.value || parameterDpet.deptName == "");
function load(e: { target: any }) {
	if (isLastPageLazyValue.value) domScrollRef.value.removeEventListener("scroll", load, false);
	if (disabled.value) return;
	const self = e.target;
	if (self.scrollHeight - self.scrollTop <= self.clientHeight) {
		loadingLazyValue.value = true;
		pageLazyValue.value++;
	}
}
function onVisible(val: boolean) {
	if (val) {
		const parentDom = document.querySelectorAll(".el-select-dropdown__wrap.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default") as NodeListOf<Element>;
		domScrollRef.value = parentDom[1];
		domScrollRef.value.addEventListener("scroll", load, false);
	} else {
		if (domScrollRef.value) domScrollRef.value.removeEventListener("scroll", load, false);
	}
}
onUnmounted(()=>{
	if(domScrollRef.value) domScrollRef.value.removeEventListener("scroll", load, false);
})
</script>
<template>
	<base-tree-select ref="treeSelectRef" v-bind="$attrs" v-model="model" :options="options" :sets="setsDeptId" :load="onLoadTree" :filter-method="onSearch" @visible-change="onVisible" class="the-tree-select-lazy"></base-tree-select>
</template>
<style scoped>
.the-tree-lazy {
	height: 100%;
	overflow: auto;
}
.the-tree-lazy .base-tree {
	height: initial;
	overflow: initial;
}
</style>
