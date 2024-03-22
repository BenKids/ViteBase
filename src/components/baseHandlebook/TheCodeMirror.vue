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
</style>