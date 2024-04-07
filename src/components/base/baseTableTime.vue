<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        label: string;
        prop: string;
        fmt?: TsGen.Fmt;
    }>(),
    {
        fmt: () => "YYYY-MM-DD hh:mm:ss"
    }
)

function format(val: string): string {
    if (!val) return "--";
    let res = useDateFormat(val, props.fmt);
    return res.value;
}
</script>
<template>
    <base-table-column :label="label" :prop="prop" width="160">
        <template #default="{ row }">
            {{ format(row[prop]) }}
        </template>
    </base-table-column>
</template>
<style scoped></style>
