<script setup lang="ts">
    withDefaults(defineProps<{
        sets?: TsSwitch.Sets
    }>(),{
        sets: ()=>{
            return {}
        }
    })
</script>
<template>
    <el-switch
        :size="sets.size"
        :width="sets.width"
        :active-text="sets.activeText"
        :inactive-text="sets.inactiveText"
        :active-icon="sets.activeIcon"
        :inactive-icon="sets.inactiveIcon"
        :active-value="sets.activeValue"
        :inactive-value="sets.inactiveValue"
        :inline-prompt="sets.inlinePrompt"
        :style="
            (sets.colorOn ? '--el-switch-on-color: '+sets.colorOn+';':'') + 
            (sets.colorOff ? '--el-switch-off-color: '+sets.colorOff+';':'')
        "
    />
</template>
<style scoped>
    
</style>