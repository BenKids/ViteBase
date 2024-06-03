<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: TsUpload.Model;
        sets?: TsUpload.Sets;
    }>(),
    {
        sets: () => {
            return {};
        },
    }
);
const iconFolder = markRaw(IconSolarGallerySendLinear);
const iconAlbum = markRaw(IconSolarAlbumLinear);
const iconTrash = markRaw(IconSolarTrashBinMinimalisticLinear);
const refUpload = ref();
const refUploadClick = ref();
const demo = getCurrentInstance() as any;
const emits = defineEmits(["beforeSelect", "change", "update:modelValue"]);
const dialogSets = reactive<TsImageViewer.Sets>({
    initialIndex: 0,
});
const accept = computed(() => {
    let res = "";
    if (!props.sets.accept) return res;
    for (let index = 0; index < props.sets.accept.length; index++) {
        const element = props.sets.accept[index];
        res += "." + element + ",";
    }
    return res;
});
const allowUpload = computed(() => {
    if (props.sets.readonly) return false;
    else if (props.sets.limit && props.modelValue.length >= props.sets.limit) return false;
    return true;
});
let time: NodeJS.Timeout;
let localHandle = ref<boolean>(false);
let loading = ref<boolean>(false);
let dialogVisible = ref(false);
let dialogImageUrl = ref<string[]>([]);
// let model = ref<TsElement.UploadUserFile[]>(evBase64ToUpload(props.modelValue));
let model = useVModel(props,"modelValue",emits);
let modelLists = ref<TsElement.UploadUserFile[]>([]);
watch(
    () => model.value,
    (val) => {
        if (localHandle.value) return (localHandle.value = false);
        modelLists.value = evBase64ToUpload(val);
    }
);
//handle 表单验证
function validate() {
    if (!demo.parent.refs.formItemRef) return;
    const prop = demo.parent.proxy.prop;
    const rules = demo.parent.parent.proxy.rules ?? demo.parent.parent.parent.parent.proxy.rules;
    if (!rules) return;
    const rule = rules[prop];
    if (!rule || !rule[0] || !rule[0].required) return;
    if (rule[0].trigger !== "change") {
        console.error("[BaseUpload Error] trigger of " + prop + " is must be 'change'");
        return;
    }
    const formRef = demo.parent.parent.parent.refs.formRef ?? demo.parent.parent.parent.parent.parent.refs.formRef;
    formRef.validateField(prop);
}
//handle 查看大图
function onPreview(file: TsElement.UploadFile) {
    modelLists.value.forEach((item, num) => {
        if (file.uid && file.uid === item.uid) {
            dialogSets.initialIndex = num;
        } else if (!file.uid && file.name === item.name) {
            dialogSets.initialIndex = num;
        }
    });
    if (file.url) {
        dialogVisible.value = true;
        dialogImageUrl.value = [];
        for (let index = 0; index < modelLists.value.length; index++) {
            const el = modelLists.value[index];
            if (el.url) {
                dialogImageUrl.value.push(el.url);
            }
        }
    }
}
//handle 关闭查看大图
function onClose() {
    dialogVisible.value = false;
    dialogImageUrl.value = [];
}
//handle 文件个数超出限制
function onExceed() {
    ElMessage({
        type: "warning",
        message: "超出文件上传限制，最多上传" + props.sets.limit + "个文件！",
        duration: 2 * 1000,
        showClose: true,
    });
}
//handle 打开文件选择对话框
function openSelect() {
    refUploadClick.value.parentNode.children[1].click();
}
//handle 打开文件选择对话框拦截
function onBeforeSelect() {
    props.sets.beforeSelect ? props.sets.beforeSelect(openSelect) : openSelect();
}
//handle 删除文件
function onDelete(file: TsElement.UploadFile) {
    modelLists.value = modelLists.value.filter((i) => i.uid !== file.uid);
    localHandle.value = true;
    updateModelValue();
}
// 选择文件回调
function onChange(_uploadFile: TsElement.UploadFile, uploadFiles: TsElement.UploadFiles) {
    loading.value = true;
    if (time) {
        clearTimeout(time);
    }
    time = setTimeout(() => {
        if (props.sets.limitSize) {
            uploadFiles = uploadFiles.filter((i: TsElement.UploadFile) => {
                if (!i.size) return true;
                let isLimitSize = (i.size / 1024 / 1024) < props.sets.limitSize!
                if (!isLimitSize) {
                    ElMessage({
                        type: "error",
                        message: "“" + i.name + "”超过" + props.sets.limitSize + "M",
                        duration: 5 * 1000,
                        showClose: true,
                    })
                }
                return isLimitSize;
            })
        }
        modelLists.value = uploadFiles;
        localHandle.value = true;
        updateModelValue();
        emits("change", modelLists.value);
    }, 300);
}
//handle 更新modelValue绑定值
async function updateModelValue() {
    model.value = [];
    for (let index = 0; index < modelLists.value.length; index++) {
        const item = modelLists.value[index];
        if (!item.raw) {
            model.value.push({
                name: item.name,
                url: item.url ?? "",
            });
        } else {
            await evUploadToBase64(item).then((r) => {
                model.value.push({
                    name: item.name,
                    url: r as string,
                });
            });
        }
    }
    validate();
    loading.value = false;
}
//handle 重命名文件名
function onRename(file: TsElement.UploadFile) {
    if (props.sets.readonly) return;
    if (!props.sets.updateName) return;
    ElMessageBox.prompt("请输入文件名称", "文件重命名", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(({value}) => {
            localHandle.value = true;
            file.name = value;
            updateModelValue();
        })
        .catch(() => {
        });
}
</script>

<template>
    <div class="base-upload empty" v-if="!allowUpload && modelLists.length == 0">
        <base-empty label="暂无图片" :image-size="100"></base-empty>
    </div>
    <el-upload
        v-else
        v-loading="loading"
        v-bind="$attrs"
        v-model:file-list="modelLists"
        ref="refUpload"
        :action="sets.action || '#'"
        :drag="sets.drag"
        :multiple="sets.multiple ?? true"
        :accept="accept"
        :show-file-list="sets.showFileList ?? true"
        :limit="sets.limit"
        :disabled="sets.disabled"
        :list-type="sets.listType || 'picture-card'"
        :auto-upload="sets.autoUpload ?? false"
        @preview="onPreview"
        @exceed="onExceed"
        @change="onChange"
        :class="{
          'base-upload': true,
          hiddenUpload: !allowUpload,
        }"
    >
        <template v-if="allowUpload">
            <div class="upload-click" ref="refUploadClick" @click.stop="onBeforeSelect">
                <base-icons :icon="sets.icon || iconFolder" class="upload-click-icon"></base-icons>
                <div class="el-upload__text" v-if="sets.drag">
                    <slot name="placeholder">{{ sets.placeholder || "点击/拖拽上传" }}</slot>
                </div>
            </div>
        </template>
        <template #file="{ file }">
            <div v-if="sets.listType === 'picture-card'">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="onPreview(file)">
                    <base-icons :icon="iconAlbum"></base-icons>
                  </span>
                  <span v-if="!sets.readonly" class="el-upload-list__item-delete" @click="onDelete(file)">
                    <base-icons :icon="iconTrash"></base-icons>
                  </span>
                </span>
            </div>
            <template v-else-if="sets.listType === 'picture'">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" @click="onPreview(file)">
                <div class="el-upload-list__item-info">
                    <a class="el-upload-list__item-name" @click="onRename(file)">
                        <i class="el-icon el-icon--document">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                <path fill="currentColor" d="M832 384H576V128H192v768h640zm-26.496-64L640 154.496V320zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32m160 448h384v64H320zm0-192h160v64H320zm0 384h384v64H320z"></path>
                            </svg>
                        </i>
                        <span class="el-upload-list__item-file-name" title="02.jpg">{{ file.name }}</span>
                    </a>
                </div>
                <label class="el-upload-list__item-status-label" style="display: initial;" v-if="file.status === 'success'">
                    <i class="el-icon el-icon--upload-success el-icon--check">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                            <path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path>
                        </svg>
                    </i>
                </label>
                <base-icons :icon="iconTrash" class="el-icon el-icon--close" @click="onDelete(file)" v-if="!sets.readonly"></base-icons>
            </template>
        </template>
        <template #tip>
            <div class="el-upload__tip">
                <slot name="tip">
                    <div v-html="sets.tip"></div>
                </slot>
            </div>
        </template>
    </el-upload>
    <base-image-viewer v-model="dialogVisible" :options="dialogImageUrl" :sets="dialogSets" @close="onClose"></base-image-viewer>
</template>

<style scoped>
.base-upload.hiddenUpload :deep(.el-upload) {
    display: none;
}

.base-upload :deep(.el-upload-dragger) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
}

.base-upload :deep(.el-upload-dragger .el-upload__text) {
    line-height: 1em;
    margin-top: 16px;
}

.base-upload :deep(.base-upload-dialog-image) {
    width: 100%;
}
.base-upload .upload-click-icon {
    color: #8c939d;
}
.base-upload :deep(.el-upload--picture-card:hover .upload-click-icon),
.base-upload :deep(.el-upload--picture-card:focus .upload-click-icon) {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
}
.base-upload :deep(.el-upload-dragger) {
    padding: 0;
    font-size: 28px;
}

.base-upload .upload-click {
    width: 100%;
    height: 100%;
    padding: 16px;
    border-radius: var(--base-radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--el-fill-color-blank);
}

.base-upload .upload-click-icon {
    font-size: 32px;
}

.base-upload.empty {
    width: 100%;
}

.base-upload.empty :deep(.el-empty) {
    padding: 0;
}

.base-upload :deep(.el-upload-dragger:hover .el-icon) {
    color: var(--el-color-primary);
}

.base-upload .el-upload-list__item-thumbnail {
    cursor: zoom-in;
}

.base-upload .el-upload-list__item-name {
    cursor: pointer;
}
</style>
