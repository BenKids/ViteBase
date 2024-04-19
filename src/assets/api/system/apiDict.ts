export default {
    // 字典管理表格数据
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
                    hitSource: ["apiDictAdd", "apiDictUpdate", "apiDictDelete"],
                }),
            {
                watchingStates: [formModel, toRef(formModel, "dictName"), toRef(formModel, "dictType")],
                debounce: [0, 300, 300],
                middleware: actionDelegationMiddleware("apiDictTable"),
            }
        ),
    // 根据id查询字典信息
    msg: () =>
        useRequest(
            (id: TsDict.Id) =>
                request.Get("/system/dict/type/" + id, {
                    name: "apiDictMsg",
                    transformData(rawdata: TsGen.Response<TsDict.Msg>) {
                        return rawdata.data;
                    },
                    hitSource: ["apiDictUpdate", "apiDictDelete"]
                }),
            {
                immediate: false,
            }
        ),
    // 添加字典
    add: () => {
        let res = useForm(
            (formModel: TsDictAdd.FormModel) => request.Post("/system/dict/type", formModel, {
                name: "apiDictAdd",
            }), {
                resetAfterSubmiting: true,
                initialForm: {
                    dictName: "",
                    dictType: "",
                    status: "0",
                    remark: "",
                }
            }
        );
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "新增字典类型成功",
            });
            accessAction("apiDictTable", (api) => api.refresh());
        })
        return res;
    },
    // 修改字典
    update: () => {
        let res = useForm(
            (formModel: TsDictUpdate.FormModel) => request.Put("system/dict/type", formModel, {
                name: "apiDictUpdate",
            }), {
                resetAfterSubmiting: true,
                initialForm: {
                    dictId: "",
                    dictName: "",
                    dictType: "",
                    status: "0",
                    remark: ""
                }
            }
        );
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "修改成功",
            });
            accessAction("apiDictTable", (api) => api.refresh());
        })
        return res;
    },
    // 删除字典
    delete: () => {
        let res = useRequest(
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
        );
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "字典删除成功",
            });
            accessAction("apiDictTable", (api) => api.refresh());
        })
        return res;
    },
    // 字典下拉数据
    options: () =>
        useRequest(
            () => request.Get("/system/dict/type/optionselect", {
                name: "apiDictOptions",
                transformData(rawdata: TsGen.Response<TsDicts.Options>) {
                    return evRename({
                        data: rawdata.data,
                        keys: {
                            label: "dictName",
                            value: "dictType",
                        }
                    })
                },
                hitSource: ["apiDictAdd", "apiDictUpdate", "apiDictDelete"],
            }),
            {
                immediate: true,
                middleware: actionDelegationMiddleware("apiDictOptions"),
            }
        ),
    // 字典数据表格数据
    data: (formModel: TsDictData.FormModel) =>
        usePagination(
            (page, pageSize) =>
                request.Get<TsGen.TableRes<TsDictData.Table>>("/system/dict/data/list", {
                    name: "apiDictData",
                    params: {
                        ...formModel,
                        pageNum: page,
                        pageSize: pageSize,
                    },
                    hitSource: [],
                }),
            {
                watchingStates: [formModel, toRef(formModel, "dictType"), toRef(formModel, "dictLabel")],
                debounce: [0, 300, 300],
                data: (res: TsGen.TableRes<TsDictData.Table>) => res.rows,
                initialPage: 1,
                initialPageSize: 10,
                initialData: {
                    total: 0,
                    rows: [],
                },
                immediate: false,
                middleware: actionDelegationMiddleware("apiDictData"),
            }
        ),
    // 根据id查询字典数据信息
    dataMsg: () =>
        useRequest(
            (id: TsDict.Id) => request.Get("/system/dict/data/" + id, {
                name: "apiDictDataMsg",
                transformData(rawdata: TsGen.Response<TsDictDataUpdate.FormModel>) {
                    return rawdata.data;
                },
                hitSource: ["apiDictDataUpdate"],
            }),
            {
                immediate: false,
            }
        ),
    // 添加字典数据
    dataAdd: () => {
        let res = useForm(
            (formModel: TsDictDataAdd.FormModel) => request.Post("/system/dict/data", formModel, {
                name: "apiDictDataAdd",
            }), {
                resetAfterSubmiting: true,
                initialForm: {
                    dictType: "",
                    dictLabel: "",
                    dictValue: "",
                    listClass: "info",
                    dictSort: 0,
                    status: "0",
                    remark: "",
                }
            }
        );
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "字典数据添加成功",
            })
            accessAction("apiDictData", (api) => api.refresh());
            accessAction("apiDicts", (api) => api.send(true));
        })
        return res;
    },
    // 修改字典数据
    dataUpdate: () => {
        let res = useForm(
            (formModel: TsDictDataUpdate.FormModel) => request.Put("/system/dict/data", formModel, {
                name: "apiDictDataUpdate",
            }), {
                resetAfterSubmiting: true,
                initialForm: {
                    dictCode: "",
                    dictType: "",
                    dictLabel: "",
                    dictValue: "",
                    listClass: "info",
                    dictSort: 0,
                    status: "",
                    remark: "",
                }
            }
        )
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "字典数据修改成功",
            })
            accessAction("apiDictData", (api) => api.refresh());
            accessAction("apiDicts", (api) => api.send(true));
        })
        return res;
    },
    // 删除字典数据
    dataDelete: () => {
        let res = useRequest(
            (id: TsDict.Id) =>
                request.Delete(
                    "/system/dict/data/" + id,
                    {},
                    {
                        name: "apiDictDataDelete",
                    }
                ),
            {
                immediate: false,
            }
        )
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "字典数据删除成功！",
            })
            accessAction("apiDictData", (api) => api.refresh());
            accessAction("apiDicts", (api) => api.send(true));
        })
        return res;
    },
}
