export default {
    table: (formModel: TsPosition.FormModel) => usePagination(
        (page, pageSize) =>
            request.Get<TsPosition.Table>("/system/post/list", {
                name: "apiPositionTable",
                params: {
                    ...formModel,
                    pageNum: page,
                    pageSize: pageSize,
                },
                hitSource: ["apiPositionAdd", "apiPositionUpdate", "apiPositionDelete"],
            }),
        {
            watchingStates: [formModel, toRef(formModel, "postName"), toRef(formModel, "postCode")],
            debounce: [0, 300, 300],
            data: (response: TsGen.TableRes<TsPosition.Table>) => response.rows,
            initialPage: 1,
            initialPageSize: 10,
            initialData: {
                rows: [],
                total: 0,
            },
            middleware: actionDelegationMiddleware("apiPositionTable"),
        }
    ),
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
    add: (formModel: TsPositionAdd.FormModel) => useRequest(
        () =>
            request.Post("/system/post", formModel, {
                name: "apiPositionAdd",
            }),
        {
            immediate: false,
        }
    ),
    update: (formModel: TsPositionUpdate.FormModel) => useRequest(
        () =>
            request.Put("/system/post", formModel, {
                name: "apiPositionUpdate",
            }),
        {
            immediate: false,
        }
    ),
    delete: () => useRequest(
        (id: TsPosition.Id) =>
            request.Delete(
                "/system/post/" + id,
                {},
                {
                    name: "apiPositionDelete",
                }
            ),
        {
            immediate: false,
        }
    ),
};
