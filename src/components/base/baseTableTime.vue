<script setup lang="ts">
defineProps<{
	label: string;
	prop: string;
	fmt?: TsGen.Fmt;
}>();
const format = evDateFormat;
</script>
<template>
	<base-table-column :label="label" :prop="prop" width="160">
		<template #default="{ row }">
			{{ row[prop] ? format({ date: new Date(row[prop]), fmt: fmt ?? "YYYY-MM-DD hh:mm:ss" }) : "--" }}
		</template>
	</base-table-column>
</template>
<style scoped></style>
