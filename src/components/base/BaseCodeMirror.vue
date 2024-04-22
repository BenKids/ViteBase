<script lang="ts" setup>
import Codemirror from "codemirror-editor-vue3"

const props = withDefaults(
    defineProps<{
      code: string;
    }>(),
    {}
)
const codeValue = computed({
  get: () => props.code,
  set: () => {
  },
});
const cmRef = ref()
const cmOptions = {
  mode: "text",
  readOnly: true,
}
onUnmounted(() => {
  cmRef.value?.destroy()
})
</script>
<template>
  <div class="the-code-mirror">
    <Codemirror
        v-model:value="codeValue"
        :options="cmOptions"
        border
        ref="cmRef"
        height="100%"
        width="100%"
    >
    </Codemirror>
  </div>
</template>
<style scoped>
.the-code-mirror :deep(.CodeMirror) {
    background-color: var(--base-bgc-white);
    color: var(--base-text-color-primary);
}
.the-code-mirror :deep(.CodeMirror-gutters) {
    background-color: var(--base-bgc-gray);
    color: var(--base-text-color-primary);
    border-color: var(--base-border-color);
}
.the-code-mirror :deep(.codemirror-container.bordered) {
    border-color: var(--base-border-color);
}
</style>