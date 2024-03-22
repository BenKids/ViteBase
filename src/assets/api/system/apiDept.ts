export default {
	// 部门树数据
	tree: () =>
		apiGet<TsDept.TreeData>({
			name: "apiDeptTree",
			url: "/system/user/deptTree",
			hitSource: ["apiDeptAdd","apiDeptUpdate","apiDeptDelete"],
			initialData: [],
			transformData: (rawdata) => {
				return evRename({
					data: rawdata.data,
					keys: {
						label: "label",
						value: "id",
						children: "children",
					}
				})
			},
		}),
	// 根据deptId查询相关部门信息
	msg: () => 
		apiGet({
			name: "apiDeptMsg",
			url: "/system/dept/",
			hitSource: ["apiDeptAdd", "apiDeptDelete", "apiDeptUpdate"],
			immediate: false,
		}),
	// 部门表格数据
	table: (params: TsDept.FormModel) =>
		apiWatcher<TsDept.Table>({
			name: "apiDeptTable",
			url: "/system/dept/list",
			params: params,
			transformData: (rawdata) => {
				return evIntTree({
					data: rawdata.data,
					id: "deptId"
				});
			},
			watcher: [params, toRef(params, "deptName")],
			debounce: [0, 300],
			initialData: [],
			force: (isForce) => isForce,
			hitSource: ["apiDeptAdd", "apiDeptDelete", "apiDeptUpdate"],
		}),
	// 新增部门
	deptAdd: (formModel: TsDeptAdd.FormModel) =>
		apiPost({
			name: "apiDeptAdd",
			url: "/system/dept",
			params: formModel,
		}),
	// 删除部门
	deptDel: (deptId: Ref<TsDept.DeptId>) =>
		apiDelete({
			name: "apiDeptDelete",
			url: "/system/dept/",
			urlExtra: deptId,
		}),
	// 修改部门
	deptUpdate: (formModel: TsDeptUpdate.FormModel) =>
		apiPut({
			name: "apiDeptUpdate",
			url: "/system/dept",
			params: formModel,
		}),
};
