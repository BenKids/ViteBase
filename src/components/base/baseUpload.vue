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
const iconFolder = markRaw(IconSolarFolderWithFilesLinear);
const iconAlbum = markRaw(IconSolarAlbumLinear);
const iconTrash = markRaw(IconSolarTrashBinMinimalisticLinear);
const refUpload = ref(),
    refUploadClick = ref(),
    emits = defineEmits(["beforeSelect", "change", "update:modelValue"]);
let localHandle = ref<boolean>(false),
    loading = ref<boolean>(false),
    dialogVisible = ref(false),
    dialogImageUrl = ref<string[]>([]);
const dialogSets = reactive<TsImageViewer.Sets>({
    initialIndex: 0,
});
let allowUpload = computed(() => {
    if (props.sets.readonly) return false;
    else if (props.sets.limit && props.modelValue.length >= props.sets.limit) return false;
    return true;
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
const demo = getCurrentInstance() as any;

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

let model = ref<TsElement.UploadUserFile[]>(evBase64ToUpload(props.modelValue));
watch(
    () => props.modelValue,
    (val) => {
        if (localHandle.value) return (localHandle.value = false);
        model.value = evBase64ToUpload(val);
    }
);
const onPreview = (file: TsElement.UploadFile) => {
    console.log("[file]", file);
    model.value.forEach((item, num) => {
        if (file.uid && file.uid === item.uid) {
            dialogSets.initialIndex = num;
        } else if (!file.uid && file.name === item.name) {
            dialogSets.initialIndex = num;
        }
    });
    if (file.url) {
        dialogVisible.value = true;
        dialogImageUrl.value = [];
        for (let index = 0; index < model.value.length; index++) {
            const el = model.value[index];
            if (el.url) {
                dialogImageUrl.value.push(el.url);
            }
        }
    }
};
const onExceed = () => {
    ElMessage({
        type: "warning",
        message: "超出文件上传限制，最多上传" + props.sets.limit + "个文件！",
        duration: 2 * 1000,
    });
};
const openSelect = () => {
    refUploadClick.value.nextSibling.nextSibling.nextSibling.click();
};
const onBeforeSelect = () => {
    props.sets.beforeSelect ? props.sets.beforeSelect(openSelect) : openSelect();
};
const onClose = () => {
    dialogVisible.value = false;
    dialogImageUrl.value = [];
};
const onDelete = (file: TsElement.UploadFile) => {
    model.value = model.value.filter((i) => i.uid != file.uid);
    localHandle.value = true;
    updateModelValue();
};
let time: NodeJS.Timeout;

function onChange(uploadFile: TsElement.UploadFile, uploadFiles: TsElement.UploadFiles) {
    loading.value = true;
    if (time) {
        clearTimeout(time);
    }
    time = setTimeout(() => {
        model.value = uploadFiles;
        localHandle.value = true;
        updateModelValue();
        emits("change", uploadFile, uploadFiles);
    }, 300);
}

async function updateModelValue() {
    let res: TsUpload.Model = [];
    for (let index = 0; index < model.value.length; index++) {
        const item = model.value[index];
        if (!item.raw) {
            res.push(item.url ?? "");
        } else {
            await evUploadToBase64(item).then((r) => {
                res.push(r as string);
            });
        }
    }
    emits("update:modelValue", res);
    validate();
    loading.value = false;
}
</script>

<template>
    <div class="base-upload empty" v-if="!allowUpload && model.length == 0">
        <base-empty label="暂无图片" :image-size="100"></base-empty>
    </div>
    <el-upload
        v-else
        v-loading="loading"
        v-bind="$attrs"
        v-model:file-list="model"
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
        <template #file="{ file }" v-if="sets.listType === 'picture-card'">
            <div>
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
        </template>
        <template #tip>
            <div class="el-upload__tip">
                <slot name="tip"><div v-html="sets.tip"></div></slot>
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

.base-upload :deep(.el-upload-dragger) {
    padding: 0;
    font-size: 28px;
    color: #8c939d;
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
</style>
