<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import { IToolbarConfig, IEditorConfig } from '@wangeditor/editor'

const props = withDefaults(
    defineProps<{
        sets?: TsEdit.Sets,
    }>(),
    {
        sets: () => {
            return {}
        }
    }
)
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {}
// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
    placeholder: props.sets.placeholder ?? "请输入内容...",
    readOnly: props.sets.readOnly ?? false,
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    // nextTick(()=>{
    //     const toolbar = DomEditor.getToolbar(editor)
    //     const curToolbarConfig = toolbar.getConfig()
    //     console.log( curToolbarConfig.toolbarKeys ) // 当前菜单排序和分组
    // })
}
</script>
<template>
    <div class="base-edit">
        <Toolbar
            class="base-edit-toolbar"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="sets.mode ?? 'default'"
        />
        <Editor
            class="base-edit-editor"
            v-bind="$attrs"
            :defaultConfig="editorConfig"
            :mode="sets.mode ?? 'default'"
            @onCreated="handleCreated"
        />
    </div>
</template>
<style scoped>
.base-edit {
    border: var(--base-border);
    height: 500px;
    display: flex;
    flex-direction: column;
    z-index: 20;
}

.base-edit-toolbar {
    border-bottom: var(--base-border);
}

.base-edit-editor {
    flex: 1;
    overflow-y: hidden;
}
.base-edit :deep(.w-e-text-container) {
    background-color: var(--base-bgc-gray);
    color: var(--base-text-color-primary);
}
.base-edit :deep(.w-e-bar){
    background-color: var(--base-bgc-gray);
}
.base-edit :deep(.w-e-bar-item-group .w-e-bar-item-menus-container) {
    background-color: var(--base-bgc-gray);
    border: var(--base-border);
}
.base-edit-toolbar :deep(.w-e-bar-item button),
.base-edit-toolbar :deep(.w-e-bar-item svg) {
    color: var(--base-text-color-primary);
    fill: var(--base-text-color-primary);
}
.base-edit-toolbar :deep(.w-e-bar-item .disabled),
.base-edit-toolbar :deep(.w-e-bar-item .disabled svg) {
    color: var(--base-text-color-disabled);
    fill: var(--base-text-color-disabled);
}
.base-edit :deep(.w-e-bar-divider) {
    background-color: var(--base-border-color);
}
</style>
<style>
html.light .base-edit-toolbar .w-e-bar-item button:hover,
html.light .base-edit-toolbar .w-e-bar-item button:hover svg,
html.light .base-edit-toolbar .w-e-bar-item .disabled:hover,
html.light .base-edit-toolbar .w-e-bar-item .disabled:hover svg {
    color: var(--base-text-color-primary);
    fill: var(--base-text-color-primary);
}
html.dark .base-edit-toolbar .w-e-bar-item button:hover,
html.dark .base-edit-toolbar .w-e-bar-item button:hover svg,
html.dark .base-edit-toolbar .w-e-bar-item .disabled:hover,
html.dark .base-edit-toolbar .w-e-bar-item .disabled:hover svg {
    color: var(--base-bgc-gray);
    fill: var(--base-bgc-gray);
}
</style>