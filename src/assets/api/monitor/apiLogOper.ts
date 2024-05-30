export default {
    // 表格数据
    table: (formModel: TsLogOper.FormModel) =>
        usePagination(
            (pageNum, pageSize) =>
                request.Get<TsLogOper.Table>("/monitor/operlog/list" + evTransDateRange(formModel.dateRange), {
                    name: "apiLogOperTable",
                    params: {
                        ...evRemoveEmpty(formModel, ["dateRange"]),
                        pageNum,
                        pageSize,
                    },
                    hitSource: ["apiUserAdd", "apiUserUpdate", "apiUserDelete", "apiUserUpdateStatus"],
                }),
            {
                watchingStates: [formModel, toRef(formModel, "operIp"), toRef(formModel, "title"), toRef(formModel, "operName")],
                debounce: [0, 300, 300, 300],
                data: (response: TsGen.ResponseRowsTotal<TsLogOper.Table>) => response.rows,
                initialData: {
                    rows: [],
                    total: 0,
                },
                middleware: actionDelegationMiddleware("apiLogOperTable"),
            }
        ),
}