<script setup lang="ts">
const tableSets: TsTable.Sets = {
    height: "100%",
    showOverflowTooltip: false,
}
const setsTableColumn:TsTableColumn.Sets = {
    align: "left",
    headerAlign: "left",
}
let tableData = reactive<TsTheBaseTable.Model>([]);
</script>
<template>
    <base-table v-bind="$attrs" v-model="tableData" :sets="tableSets">
        <base-table-column label="插槽name" prop="key" width="250"></base-table-column>
        <base-table-column label="说明" prop="explain" :sets="setsTableColumn"></base-table-column>
    </base-table>
</template>
<style scoped></style>
