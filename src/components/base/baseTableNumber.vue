<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		label: TsTableNumber.Label;
		prop: TsTableNumber.Prop;
		sets?: TsTableNumber.Sets;
	}>(),
	{
		sets() {
			return {};
		},
	}
);
const className = computed((): TsTableSpecial.Sets["className"] => {
	let r = "base-table-number ";
	r += props.sets.className ?? "";
	return r;
});
function fnSets(row: TsTable.Row): TsNumber.Sets {
	let r = JSON.parse(JSON.stringify(props.sets));
	if (typeof(r.max) == "string") {
		r.max = row[r.max];
	}
	return r;
}
</script>
<template>
	<base-table-column :label="label" :prop="prop" :sets="sets" :class-name="className">
		<template #default="scope">
			<base-number v-bind="$attrs" v-model="scope.row[prop]" :sets="fnSets(scope.row)"></base-number>
		</template>
	</base-table-column>
</template>
