export default {
	table: (formModel: TsPosition.FormModel) =>
		apiPagination<TsPosition.Table>({
			name: "apiPositionTable",
			url: "/system/post/list",
			params: formModel,
			watchingStates: [formModel, toRef(formModel, "postName"), toRef(formModel, "postCode")],
			debounce: [0, 300, 300],
			data: (response: TsGen.ResponseTable<TsPosition.Table>) => {
				response.rows.forEach((row) => {
					row.status.toString();
				});
				return response.rows;
			},
			hitSource: ["apiPositionAdd", "apiPositionUpdate", "apiPositionDelete"],
		}),
	// 用户岗位数据
	select: (userId?: TsPosition.Id) =>
		apiGet<TsUser.User>({
			url: "/system/user/" + (userId || ""),
			transformData: (rawdata) =>
				evRename({
					data: rawdata.posts,
					keys: {
						label: "postName",
						value: "postId",
					},
				}),
		}),
	add: (formModel: TsPositionAdd.FormModel) =>
		apiPost({
			name: "apiPositionAdd",
			url: "/system/post",
			params: formModel,
		}),
	update: (formModel: TsPositionUpdate.FormModel) =>
		apiPut({
			name: "apiPositionUpdate",
			url: "/system/post",
			params: formModel,
		}),
	delete: (id: Ref<TsPosition.Id>) => apiDelete({
        name: "apiPositionDelete",
        url: "/system/post/",
        urlExtra: id,
    })
};
