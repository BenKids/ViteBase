<script setup lang="ts">
const optionsRequired: TsTableTag.Options = [
  {
    label: "是",
    value: "true",
    type: "success",
  },
  {
    label: "否",
    value: "false",
    type: "warning",
  },
];
const tableSets: TsTable.Sets<TsGen.Object> = {
    maxHeight: 500,
    showOverflowTooltip: false,
}
let tableData = reactive<TsTheBaseTable.Model>([]);
</script>
<template>
  <base-table v-bind="$attrs" v-model="tableData" :sets="tableSets">
    <base-table-column label="参数" prop="key"></base-table-column>
    <base-table-column label="说明" prop="explain"></base-table-column>
    <base-table-column label="数据类型" prop="dataType"></base-table-column>
    <base-table-tag label="是否必传参数" prop="required" :options="optionsRequired" width="110"></base-table-tag>
    <base-table-column label="默认值" prop="default"></base-table-column>
    <base-table-column label="可选值" prop="optional">
      <template #default="scope">
        <base-link href="https://icones.js.org" target="_blank" v-if="scope.row.optional == 'Icons'">Icons</base-link>
        <span v-else>{{ scope.row.optional }}</span>
      </template>
    </base-table-column>
  </base-table>
</template>
<style scoped></style>
