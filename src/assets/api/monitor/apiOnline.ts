export default {
    // 表格数据
    table: (formModel: TsOnline.FormModel) =>
        usePagination(
            (page, pageSize) =>
                request.Get<TsOnline.Table>("/monitor/online/list", {
                    name: "apiOnlineTable",
                    params: {
                        ...formModel,
                        pageNum: page,
                        pageSize: pageSize,
                    },
                    hitSource: [],
                }),
            {
                watchingStates: [formModel, toRef(formModel, "ipaddr"), toRef(formModel, "userName")],
                debounce: [0, 300, 300],
                data: (response: TsGen.ResponseRowsTotal<TsOnline.Table>) => response.rows,
                initialPage: 1,
                initialPageSize: 10,
                initialData: {
                    total: 0,
                    rows: [],
                },
                middleware: actionDelegationMiddleware("apiOnlineTable"),
            }
        ),
}