export default {
	// 字典获取
	dicts: (params: TsDicts.Params) =>
		useRequest(
			() =>
				request.Get("/system/dict/data/type/" + params, {
					name: "apiDicts",
					transformData(rawdata: TsDicts.Rawdata): TsDicts.Res {
						return evRename({
							data: rawdata.data,
							keys: {
								label: "dictLabel",
								value: "dictValue",
								type: "listClass",
							},
						});
					},
				}),
			{
                force: isForce => isForce,
                initialData: [],
                middleware: actionDelegationMiddleware("apiDicts"),
			}
		),
	// 状态选择数据
	status: () => {
		return [
			{
				value: "info",
				label: "默认"
			},
			{
				value: "primary",
				label: "主要"
			},
			{
				value: "success",
				label: "成功"
			},
			{
				value: "warning",
				label: "警告"
			},
			{
				value: "danger",
				label: "危险"
			}
		]
	}
};
