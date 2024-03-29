export default {
    // 表格数据
    table: (formModel: TsLogOper.FormModel) =>
        usePagination(
            (pageNum, pageSize) =>
                request.Get("/monitor/operlog/list" + evTransDateRange(formModel.dateRange), {
                    name: "apiLogOperTable",
                    params: {
                        ...evRemoveEmpty(formModel, ["dateRange"]),
                        pageNum,
                        pageSize,
                    },
                    transformData(rawdata: TsGen.ResponseTable<TsLogOper.Table>) {
                        return {
                            data: rawdata.rows,
                            total: rawdata.total,
                        };
                    },
                    hitSource: ["apiUserAdd", "apiUserUpdate", "apiUserDelete", "apiUserUpdateStatus"],
                }),
            {
                watchingStates: [formModel, toRef(formModel, "operIp"), toRef(formModel, "title"), toRef(formModel, "operName")],
                debounce: [0, 300, 300, 300],
                middleware: actionDelegationMiddleware("apiLogOperTable"),
            }
        ),
}