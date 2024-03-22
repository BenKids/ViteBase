export default {
	// 表格数据
	table: (formModel: TsDict.FormModel) =>
		usePagination(
			(page, pageSize) =>
				request.Get("/system/dict/type/list" + evTransDateRange(formModel.dateRange), {
					name: "apiDictTable",
					params: {
						...evRemoveEmpty(formModel, ["dateRange"]),
						pageNum: page,
						pageSize: pageSize,
					},
					transformData(rawdata: TsGen.TableRes<TsDict.Table>) {
						return {
							data: rawdata.rows,
							total: rawdata.total,
						};
					},
					hitSource: ["apiDictAdd","apiDictUpdate","apiDictDelete"],
				}),
			{
				watchingStates: [formModel, toRef(formModel, "dictName"), toRef(formModel, "dictType")],
				debounce: [0, 300, 300],
				middleware: actionDelegationMiddleware("apiDictTable"),
			}
		),
	msg: () =>
		useRequest(
			(id: TsDict.Id) =>
				request.Get("/system/dict/type/" + id, {
					name: "apiDictMsg",
					transformData(rawdata: TsGen.Response<TsDict.Msg>) {
						return rawdata.data;
					},
					hitSource: ["apiDictUpdate","apiDictDelete"]
				}),
			{
				immediate: false,
			}
		),
	add: (formModel: TsDictAdd.FormModel) =>
		useRequest(
			() =>
				request.Post("/system/dict/type", formModel, {
					name: "apiDictAdd",
				}),
			{
				force: false,
				immediate: false,
			}
		),
	update: (formModel: TsDictUpdate.FormModel) => {
		return useRequest(
			() =>
				request.Put("/system/dict/type", formModel, {
					name: "apiDictUpdate",
				}),
			{
				immediate: false,
			}
		);
	},
	delete: () =>
		useRequest(
			(id: TsDict.Id) =>
				request.Delete(
					"/system/dict/type/" + id,
					{},
					{
						name: "apiDictDelete",
					}
				),
			{
				immediate: false,
			}
		),
};
