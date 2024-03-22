<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		sets?: TsLayout.Sets;
	}>(),
	{
		sets() {
			return {};
		},
	}
);
const emits = defineEmits(["search","refresh","left","right"])
const dialogIn = inject("dialogIn", false);
let sets = reactive<TsLayout.Sets>(props.sets);
const demo = getCurrentInstance();
if (demo) {
	for (const key in demo.slots) {
		sets[key as keyof TsLayout.Sets] = true;
	}
}
let show = reactive<TsLayout.Sets>({
	form: true,
	left: true,
	right: true,
});
// 左侧显隐
const setsHandleLeft = computed((): TsButton.Sets => {
	return {
		circle: true,
		plain: true,
		icon: show.left ? IconSolarDoubleAltArrowLeftLinear : IconSolarDoubleAltArrowRightLinear,
	};
});
function onLeft() {
	show.left = !show.left;
	emits("left",show.left);
}
// 右侧显隐
const setsHandleRight = computed((): TsButton.Sets => {
	return {
		circle: true,
		plain: true,
		icon: show.right ? IconSolarDoubleAltArrowRightLinear : IconSolarDoubleAltArrowLeftLinear,
	};
});
function onRight() {
	show.right = !show.right;
	emits("right",show.right);
}
// 表单显隐
const setsHandleSearch: TsButton.Sets = {
	circle: true,
	plain: true,
	icon: IconSolarMagniferLinear,
};
function onSearch() {
	show.form = !show.form;
	emits("search",show.form);
}
// 刷新按钮
const setsHandleRefresh: TsButton.Sets = {
	type: "success",
	circle: true,
	plain: true,
	icon: IconSolarRefreshBold,
}
function onRefresh() {
	emits("refresh");
}
defineExpose({
	show,
});
</script>

<template>
	<div class="base-layout">
		<div class="base-layout-menu" v-if="sets.menu">
			<slot name="menu"></slot>
		</div>
		<div class="base-layout-header" v-if="sets.header">
			<slot name="header"></slot>
		</div>
		<div class="base-layout-tabs" v-if="sets.tabs">
			<slot name="tabs"></slot>
		</div>
		<div class="base-layout-view" v-if="sets.view">
			<slot name="view"></slot>
		</div>
		<div class="base-layout-entire part" v-if="sets.entire">
			<slot name="entire"></slot>
		</div>
		<transition name="slide-left">
			<div class="base-layout-left" v-if="sets.left" v-show="show.left">
				<div class="part"><slot name="left"></slot></div>
			</div>
		</transition>
		<el-collapse-transition>
			<div class="base-layout-form" v-if="sets.form" v-show="show.form">
				<div class="part"><slot name="form"></slot></div>
			</div>
		</el-collapse-transition>
		<div class="base-layout-page part" v-if="sets.handle || sets.handleLeft || sets.handleRight || sets.handleLeftExtra || sets.handleRightExtra || sets.table || sets.pagination">
			<div class="base-layout-handle" v-if="sets.handle">
				<slot name="handle"></slot>
			</div>
			<div class="base-layout-handle-left" v-if="sets.handleLeft ?? sets.handleLeftExtra ?? (sets.left && !dialogIn)">
				<slot name="handleLeft">
					<base-button :sets="setsHandleLeft" @click="onLeft" v-if="sets.handleBtnLeft ??sets.left"></base-button>
				</slot>
				<slot name="handleLeftExtra"></slot>
			</div>
			<div class="base-layout-handle-right" v-if="sets.handleRight ?? sets.handleRightExtra ?? (sets.form && !dialogIn)">
				<slot name="handleRightExtra"></slot>
				<slot name="handleRight" v-if="!dialogIn">
					<base-button :sets="setsHandleRefresh" @click="onRefresh" v-if="sets.handleBtnRefresh ?? sets.table"></base-button>
					<base-button :sets="setsHandleSearch" @click="onSearch" v-if="sets.handleBtnSearch ?? sets.form"></base-button>
					<base-button :sets="setsHandleRight" @click="onRight" v-if="sets.handleBtnRight ?? sets.right"></base-button>
				</slot>
			</div>
			<div class="base-layout-table" v-if="sets.table">
				<slot name="table"></slot>
			</div>
			<div class="base-layout-pagination" v-if="sets.pagination">
				<slot name="pagination"></slot>
			</div>
		</div>
		<transition name="slide-right">
			<div class="base-layout-right" v-if="sets.right" v-show="show.right">
				<div class="part"><slot name="right"></slot></div>
			</div>
		</transition>
		<slot></slot>
	</div>
</template>

<style scoped>
.part {
	padding: var(--base-gap);
	border-radius: var(--base-radius);
	background-color: var(--base-bgc-white);
	box-shadow: var(--base-shadow-part);
}

.base-layout {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template: auto auto 1fr auto / auto 1fr auto;
}

.base-layout > div {
	position: relative;
	overflow: auto;
}

/* 导航布局 */
.base-layout-menu {
	grid-row: 1 / 5;
	grid-column: 1 / 2;
}

.base-layout-header {
	grid-row: 1 / 2;
	grid-column: 2 / 3;
}

.base-layout-tabs {
	grid-row: 2 / 3;
	grid-column: 2 / 3;
}

.base-layout-view {
	grid-row: 3 / 5;
	grid-column: 2 / 3;
}

/* 整页 */
.base-layout-entire {
	grid-row: 1 / 5;
	grid-column: 1 / 4;
}

/* 常用布局 */
.base-layout-left {
	grid-row: 1 / 5;
	grid-column: 1 / 2;
	overflow: hidden;
}
.base-layout-left > div {
	height: 100%;
	margin-right: var(--base-gap);
	overflow: auto;
}
.slide-left-enter-active,
.slide-left-leave-active {
	overflow: hidden !important;
	transition: 0.5s all ease-in-out;
}
.slide-left-enter-from,
.slide-left-leave-to {
	padding-left: 0;
	padding-right: 0;
	max-width: 0 !important;
}
.slide-left-enter-from > div,
.slide-left-leave-to > div {
	overflow: hidden !important;
}
.base-layout-right {
	grid-row: 1 / 5;
	grid-column: 3 / 4;
	overflow: hidden;
}
.base-layout-right > div {
	height: 100%;
	margin-left: var(--base-gap);
	overflow: auto;
}
.slide-right-enter-active,
.slide-right-leave-active {
	overflow: hidden !important;
	transition: 0.5s all ease-in-out;
}
.slide-right-enter-from,
.slide-right-leave-to {
	padding-left: 0;
	padding-right: 0;
	max-width: 0 !important;
}
.slide-right-enter-from > div,
.slide-right-leave-to > div {
	overflow: hidden !important;
}
.base-layout-form {
	grid-row: 1 / 2;
	grid-column: 2 / 3;
}
.base-layout-form > div {
	margin-bottom: var(--base-gap);
	padding-bottom: 0;
}
.base-layout-page {
	grid-row: 3 / 4;
	grid-column: 2 / 3;
	display: grid;
	grid-template: auto 1fr auto / 1fr 1fr;
}

.base-layout-main {
	grid-row: 3 / 4;
	grid-column: 2 / 3;
}

.base-layout-handle {
	grid-row: 1 / 2;
	grid-column: 1 / 3;
	padding-bottom: var(--base-gap);
}

.base-layout-handle-left {
	grid-row: 1 / 2;
	grid-column: 1 / 2;
	padding-bottom: var(--base-gap);
}

.base-layout-handle-right {
	grid-row: 1 / 2;
	grid-column: 2 / 3;
	text-align: right;
	padding-bottom: var(--base-gap);
}

.base-layout-table {
	grid-row: 2 / 3;
	grid-column: 1 / 3;
	overflow: auto;
}

.base-layout-pagination {
	grid-row: 3 / 4;
	grid-column: 1 / 3;
	padding-top: var(--base-gap);
}
</style>
<style scoped>
.base-layout .base-layout-left,
.base-layout .base-layout-right {
	max-width: 365px;
}
.base-layout .base-layout-page {
	min-width: 350px;
}
.base-layout-left,
.base-layout-right {
	width: 314px;
}
.base-layout-left :deep(.base-form),
.base-layout-right :deep(.base-form) {
	width: 100%;
}
.base-layout-left :deep(.el-upload-list--picture-card),
.base-layout-right :deep(.el-upload-list--picture-card) {
	--el-upload-list-picture-card-size: 100px;
}
.base-layout-left :deep(.el-upload--picture-card),
.base-layout-right :deep(.el-upload--picture-card) {
	--el-upload-picture-card-size: 100px;
}
</style>
