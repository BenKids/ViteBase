export default {
    table: (formModel: TsConfig.FormModel) =>
        usePagination(
            (page, pageSize) =>
                request.Get<TsConfig.TableData>("/system/config/list" + evTransDateRange(formModel.dateRange), {
                    name: "apiConfigTable",
                    params: {
                        ...evRemoveEmpty(formModel, ["dateRange"]),
                        pageNum: page,
                        pageSize: pageSize,
                    },
                    hitSource: ["apiConfigAdd", "apiConfigDelete", "apiCOnfigUpdate", "apiConfigRefreshCache"],
                }),
            {
                watchingStates: [formModel, toRef(formModel, "configKey"), toRef(formModel, "configName")],
                debounce: [0, 300, 300],
                data: (response: TsGen.ResponseRowsTotal<TsConfig.TableData>) => response.rows,
                initialPage: 1,
                initialPageSize: 10,
                initialData: {
                    total: 0,
                    rows: [],
                },
                middleware: actionDelegationMiddleware("apiConfigTable"),
            }
        ),
    add: () => {
        const res = useForm(
            (formModel: TsConfigAdd.FormModel) => request.Post("/system/config", formModel, {
                name: "apiConfigAdd",
            }), {
                resetAfterSubmiting: true,
                initialForm: {
                    configName: "",
                    configKey: "",
                    configValue: "",
                    configType: "Y",
                    remark: "",
                }
            }
        );
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "参数添加成功！",
            });
            accessAction("apiConfigTable", api => api.refresh());
        })
        return res;
    },
    update: () => {
        const res = useForm(
            (formModel: TsConfigUpdate.FormModel) => request.Put("/system/config", formModel, {
                name: "apiConfigUpdate",
            }), {
                resetAfterSubmiting: true,
                initialForm: {
                    configId: "",
                    configName: "",
                    configKey: "",
                    configValue: "",
                    configType: "Y",
                    remark: "",
                }
            }
        );
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "修改参数成功",
            });
            accessAction("apiConfigTable", api => api.refresh());
        })
        return res;
    },
    msg: () =>
        useRequest(
            (id: TsConfig.Id) => request.Get(
                "/system/config/" + id,
                {
                    name: "apiConfigMsg",
                    hitSource: ["apiConfigUpdate", "apiConfigAdd", "apiConfigDelete", "apiConfigRefreshCache"],
                    transformData(rawdata: TsGen.ResponseData<TsConfigUpdate.FormModel>) {
                        return rawdata.data;
                    }
                }
            ), {
                immediate: false,
                middleware: actionDelegationMiddleware("apiConfigMsg"),
            }
        ),
    delete: () => {
        let res = useRequest(
            (id: TsConfig.Id | TsConfig.Id[]) =>
                request.Delete(
                    "/system/config/" + id,
                    {},
                    {
                        name: "apiConfigDelete",
                    }
                ),
            {
                immediate: false,
            }
        )
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "参数删除成功"
            });
            accessAction("apiConfigTable", api => api.refresh());
        });
        return res;
    },
    refreshCache: () => {
        let res = useRequest(
            () =>
                request.Delete(
                    "/system/config/refreshCache",
                    {},
                    {
                        name: "apiConfigRefreshCache",
                    }
                ),
            {
                immediate: false,
            }
        );
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "刷新缓存成功",
            });
            accessAction("apiConfigTable", api => api.refresh());
        });
        return res;
    },
}