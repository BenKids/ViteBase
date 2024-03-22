<script setup lang="ts">
withDefaults(defineProps<{
    options: TsCheckbox.Options,
    sets?: TsCheckbox.Sets
}>(),{
    sets: () => {
        return {}
    }
})
</script>

<template>
    <el-checkbox-group
        :size="sets.size"
        :disabled="sets.disabled"
        :text-color="sets.textColor"
        class="base-checkbox"
    >
        <template v-if="sets.type == 'button'">
            <el-checkbox-button
                v-for="(item, index) in options"
                :key="index"
                :value="item.value"
                :disabled="item.disabled"
                :border="item.border"
            >{{item.label}}</el-checkbox-button>
        </template>
        <template v-else>
            <el-checkbox
                v-for="(item, index) in options"
                :key="index"
                :value="item.value"
                :disabled="item.disabled"
            >{{item.label}}</el-checkbox>
        </template>
    </el-checkbox-group>
</template>