export default {
	// 用户角色数据
	select: (userId?: TsUser.Id) =>
		// useRequest((id?: TsUser.Id)=>request.Get("/system/user/" + (id || ""),{
		// 	transformData(rawdata:TsUser.User) {
		// 		return evRename({
		// 			data: rawdata.roles,
		// 			keys: {
		// 				label: "roleName",
		// 				value: "roleId",
		// 			},
		// 		})
		// 	}
		// }),{})
		apiGet<TsUser.User>({
			url: "/system/user/" + (userId || ""),
			transformData: (rawdata) =>
				evRename({
					data: rawdata.roles,
					keys: {
						label: "roleName",
						value: "roleId",
					},
				}),
		}),
	table: (params: TsRole.FormModel) => apiPagination<TsRole.Table>({
		name: "apiRoleTable",
		url: "/system/role/list",
		params: params,
		paramsExtra: computed(()=>{
			return {
				"params%5BbeginTime%5D": params.dateRange && params.dateRange.length > 1 ? params.dateRange[0] : "",
				"params%5BendTime%5D": params.dateRange && params.dateRange.length > 1 ? params.dateRange[1] : "",
			}
		}),
		hitSource: ["apiRoleAdd", "apiRoleUpdate", "apiRoleUpdatePermi", "apiRoleDelete"],
		watchingStates: [params, toRef(params, "roleName"), toRef(params, "roleKey")],
		debounce: [0, 300, 300],
	}),
	add: (params: TsRoleAdd.FormModel) => apiPost({
		name: "apiRoleAdd",
		url: "/system/role",
		params: params,
	}),
	delete: (roleIds: Ref<TsRole.RoleId>) => apiDelete({
		name: "apiRoleDelete",
		url: "/system/role/",
		urlExtra: roleIds,
	}),
	update: (params: TsRoleUpdate.FormModel) => apiPut({
		name: "apiRoleUpdate",
		url: "/system/role",
		params: params,
	}),
	menuPermi: (roleId: Ref<TsRole.RoleId>) => apiGet<TsRoleUpdate.Rawdata>({
		url: "/system/menu/roleMenuTreeselect/",
		urlExtra: roleId,
		transformData: (rawdata) => rawdata.checkedKeys,
		hitSource: ["apiRoleUpdate"],
		immediate: false,
	}),
	updatePermi: (formModel: TsRoleAuth.FormModel) => apiPut({
		name: "apiRoleUpdatePermi",
		url: "/system/role/dataScope",
		params: formModel,
	}),
	deptPermi: (roleId: Ref<TsRole.RoleId>) => apiGet<TsRoleAuth.Rawdata>({
		name: "apiRoleDeptPermi",
		url: "/system/dept/roleDeptTreeselect/",
		urlExtra: roleId,
		hitSource: ["apiRoleUpdatePermi"],
		transformData: (rawdata) => {
			return {
				checkedKeys: rawdata.checkedKeys,
				depts: evRename({
					data: rawdata.depts,
					keys: {
						label: "label",
						value: "id",
						children: "children",
					}
				})
			}
		},
		immediate: false,
	}),
	auth: () => {
		return [
			{
				value: "1",
				label: "全部数据权限",
			},
			{
				value: "2",
				label: "自定数据权限",
			},
			{
				value: "3",
				label: "本部门数据权限",
			},
			{
				value: "4",
				label: "本部门及以下数据权限",
			},
			{
				value: "5",
				label: "仅本人数据权限",
			},
		];
	},
};
