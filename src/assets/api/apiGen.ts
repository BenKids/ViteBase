export default {
	// 字典获取
	dicts: (params: TsDicts.Params) =>
		useRequest(
			() =>
				request.Get("/system/dict/data/type/" + params, {
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
				initialData: [],
			}
		),
};
