<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        label?: TsButton.Label;
        sets?: TsButton.Sets;
    }>(),
    {
        sets: () => {
            return {};
        },
    }
);
const tableIn = inject("tableIn", false);
let presets = reactive<TsButton.Sets>({
    type: "primary",
});
if (props.label) {
    if (props.label.startsWith("新")) {
        presets.icon = markRaw(IconSolarAddSquareLinear);
    } else if (props.label.startsWith("下载")) {
        presets.icon = markRaw(IconSolarDownloadLinear);
        presets.type = "warning";
    } else if (props.label.startsWith("上传")) {
        presets.icon = markRaw(IconSolarUploadLinear);
        presets.type = "success";
    } else {
        switch (props.label) {
            case "登录":
                presets.type = "primary";
                presets.block = true;
                break;
            case "注册":
                presets.type = "primary";
                presets.plain = true;
                presets.block = true;
                break;
            case "搜索":
            case "查询":
                presets.type = "primary";
                presets.icon = markRaw(IconSolarMagniferLinear);
                break;
            case "重置":
            case "重置密码":
                presets.icon = markRaw(IconSolarRestartBold);
                presets.type = "warning";
                presets.plain = true;
                break;
            case "刷新":
                presets.icon = markRaw(IconSolarRefreshBold);
                presets.type = "success";
                break;
            case "关闭":
                presets.icon = markRaw(IconSolarCloseCircleOutline);
                presets.type = "danger";
                break;
            case "返回":
                presets.icon = markRaw(IconSolarBackspaceLinear);
                presets.type = "warning";
                break;
            case "删除":
            case "批量删除":
                presets.icon = markRaw(IconSolarTrashBinTrashLinear);
                presets.type = "danger";
                break;
            case "确定":
            case "确认":
            case "保存":
                presets.icon = markRaw(IconSolarCheckCircleLinear);
                presets.type = "primary";
                break;
            case "取消":
                presets.icon = markRaw(IconSolarCloseCircleLinear);
                presets.type = "warning";
                presets.plain = true;
                break;
            case "修改":
            case "编辑":
                presets.icon = markRaw(IconSolarPen2Linear);
                presets.type = "primary";
                break;
            case "新增":
            case "添加":
                presets.icon = markRaw(IconSolarAddSquareLinear);
                presets.type = "primary";
                break;
            case "打印":
                presets.icon = markRaw(IconSolarPrinter2Linear);
                presets.type = "warning";
                break;
            case "详情":
            case "查看":
                presets.icon = markRaw(IconSolarEyeLinear);
                presets.type = "success";
                presets.text = true;
                break;
            case "反馈":
                presets.icon = markRaw(IconSolarDocumentAddLinear);
                presets.type = "danger";
                presets.text = true;
                break;
            case "发送":
            case "转发":
                presets.icon = markRaw(IconSolarPlainLinear);
                presets.type = "warning";
                presets.text = true;
                break;
            case "加载中":
            case "loading":
                presets.icon = markRaw(IconLineMdLoadingLoop);
                presets.type = "primary";
                presets.loading = true;
                break;
            case "导入":
            case "上传":
                presets.icon = markRaw(IconSolarUploadLinear);
                presets.type = "success";
                break;
            case "导出":
            case "下载":
                presets.icon = markRaw(IconSolarDownloadLinear);
                presets.type = "warning";
                break;
            case "退出":
            case "登出":
            case "注销":
                presets.icon = markRaw(IconSolarLogout2Linear);
                presets.type = "danger";
                presets.text = true;
                break;
            default:
                break;
        }
    }
}
if (props.sets.link === undefined) {
    const parentName: string | undefined = getCurrentInstance()!.parent!.type!.name;
    presets.link = (() => {
        let res;
        switch (parentName) {
            case "ElTableColumn":
            case "ElTableBody":
                res = true;
                break;
            default:
                res = false;
                break;
        }
        return res;
    })();
}
</script>

<template>
    <el-button
        :color="sets.color"
        :type="sets.type || presets.type"
        :plain="sets.plain || presets.plain"
        :text="sets.text || presets.text"
        :link="sets.link || presets.link"
        :loading="sets.loading ?? presets.loading"
        :circle="sets.circle"
        :round="sets.round"
        :disabled="sets.disabled"
        :size="sets.size"
        :icon="sets.icon || presets.icon"
        :class="{
          'base-button': true,
          block: sets.block || presets.block,
          'no-value': label === undefined,
          'table-in': tableIn,
        }">
        {{ label }}
    </el-button>
</template>

<style scoped>
.base-button.block {
    width: 100%;
}

.base-button.table-in {
    margin: 0 6px;
}

.base-button.no-value :deep([class*="el-icon"] + span) {
    display: none;
}
.base-button {
    position: relative;
    overflow: hidden;
}
.base-button:not(.is-disabled)::after {
    content: '';
    z-index: 1;
    background-color: hsla(0, 0%, 100%, 0.5);
    position: absolute;
    top: -100%;
    bottom: -100%;
    width: 20%;
    transform: translate3d(-525%, 0, 0) rotate(35deg);
}

.base-button:not(.is-disabled):hover::after {
    transition: transform 0.45s ease-in-out;
    transform: translate3d(525%, 0, 0) rotate(35deg);
}
</style>
