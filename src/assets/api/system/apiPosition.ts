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
            data: (response: TsGen.ResponseRowsTotal<TsPosition.Table>) => response.rows,
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
    select: (userId?: TsPosition.Id) => useRequest(
        () =>
            request.Get("/system/user/" + (userId ?? ""), {
                name: "apiPositionSelect",
                transformData: (rawdata: TsUser.User) => {
                    let res:TsSelect.Options = [];
                    rawdata.posts.forEach(item => {
                        res.push({
                            label: item.postName,
                            value: item.postId,
                            disabled: item.status === "1",
                        })
                    })
                    return res;
                }
            }),
        {
            force: isForce => isForce,
            immediate: true,
            middleware: actionDelegationMiddleware("apiPositionSelect"),
        }),
    add: () => {
        let res = useForm(
            (formModel: TsPositionAdd.FormModel) => request.Post("/system/post",formModel,{
                name: "apiPositionAdd",
            }),{
                resetAfterSubmiting: true,
                initialForm: {
                    postName: "",
                    postCode: "",
                    postSort: 0,
                    status: "0",
                }
            }
        );
        res.onSuccess(()=>{
            ElMessage({
                type: "success",
                message: "添加岗位成功！",
            });
            accessAction("apiPositionTable", (api) => api.refresh());
            accessAction("apiPositionSelect",(api) => api.send(true));
        })
        return res;
    },
    update: () => {
        let res = useForm(
            (formModel: TsPositionUpdate.FormModel) => request.Put("/system/post",formModel,{
                name: "apiPositionUpdate",
            }),{
                resetAfterSubmiting: true,
                initialForm: {
                    postId: "",
                    postCode: "",
                    postName: "",
                    postSort: 0,
                    status: "",
                }
            }
        );
        res.onSuccess(()=>{
            ElMessage({
                type: "success",
                message: "岗位修改成功！",
            });
            accessAction("apiPositionTable",(api) => api.refresh());
            accessAction("apiPositionSelect",(api) => api.send(true));
        })
        return res;
    },
    delete: () => {
        let res = useRequest(
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
        );
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "岗位删除成功！",
            });
            accessAction("apiPositionTable",(api) => api.refresh());
        })
        return res;
    },
}
