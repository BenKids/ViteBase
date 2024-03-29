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
    // 修改字典
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
    // 删除字典
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
                transformData(rawdata:TsGen.Response<TsDictDataUpdate.FormModel>) {
                  return rawdata.data;
                },
                hitSource: ["apiDictDataUpdate"],
            }),
            {
                immediate: false,
                middleware: actionDelegationMiddleware(""),
            }
        ),
    // 添加字典数据
    dataAdd: (formModel: TsDictDataAdd.FormModel) =>
        useRequest(
            () =>
                request.Post("/system/dict/data", formModel, {
                    name: "apiDictDataAdd",
                }),
            {
                immediate: false,
            }
        ),
    // 修改字典数据
    dataUpdate: (formModel: TsDictDataUpdate.FormModel) =>
        useRequest(
            () =>
                request.Put("/system/dict/data", formModel, {
                    name: "apiDictDataUpdate",
                }),
            {
                immediate: false,
            }
        ),
    // 删除字典数据
    dataDelete: () =>
        useRequest(
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
        ),
};
