<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {
    IToolbarConfig,
    IEditorConfig,
    // DomEditor
} from '@wangeditor/editor'

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
</style>