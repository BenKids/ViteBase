export default {
    // 用户列表
    table: (formModel: TsUser.FormModel) => usePagination(
        (pageNum, pageSize) =>
            request.Get("/system/user/list" + evTransDateRange(formModel.dateRange), {
                name: "apiUserTable",
                params: {
                    ...evRemoveEmpty(formModel, ["dateRange"]),
                    pageNum,
                    pageSize,
                },
                hitSource: ["apiUserAdd", "apiUserUpdate", "apiUserDelete", "apiUserUpdateStatus"],
                transformData(rawdata: TsGen.ResponseTable<TsUser.Table>) {
                    for (let index = 0; index < rawdata.rows.length; index++) {
                        const item = rawdata.rows[index];
                        item.deptName = item.dept.deptName;
                    }
                    return {
                        data: rawdata.rows,
                        total: rawdata.total,
                    };
                }
            }),
        {
            watchingStates: [formModel, toRef(formModel, "userName"), toRef(formModel, "phonenumber")],
            debounce: [0, 300, 300],
            middleware: actionDelegationMiddleware("apiUserTable"),
            initialData: {
                data: [],
                total: 0,
            }
        },
    ),
    // 用户详细信息
    msg: () => useRequest(
        (id: TsUser.Id) => request.Get("/system/user/" + (id ?? ""), {
            name: "apiUserMsg",
            hitSource: ["apiUserUpdateStatus", "apiUserUpdate"],
            transformData: (rawdata: TsUser.Msg) => {
                return {
                    ...rawdata.data,
                    roleIds: rawdata.roleIds,
                    postIds: rawdata.postIds,
                };
            },
        }),
        {
            immediate: false,
        }
    ),
    // 修改用户状态
    updateStatus: (formModel: TsUser.UpdateStatus) => useRequest(
        () => request.Put("/system/user/changeStatus", formModel, {
            name: "apiUserUpdateStatus"
        }),
        {
            force: true,
            immediate: false,
        }
    ),
    // 添加用户
    add: (formModel: TsUserAdd.FormModel) => useRequest(
        () => request.Post("/system/user", formModel, {
            name: "apiUserAdd"
        }),
        {
            force: true,
            immediate: false,
        }
    ),
    // 修改用户
    update: (formModel: TsUserEdit.FormModel) => useRequest(
        () => request.Put("/system/user", formModel, {
            name: "apiUsserUpdate"
        }),
        {
            force: true,
            immediate: false,
        }
    ),
    // 删除用户
    delete: () => useRequest(
        (id: TsGen.Id) => request.Delete("/system/user/" + id, {}, {
            name: "apiUserDelete",
        }),
        {
            force: true,
            immediate: false,
        }
    ),
    // 重置密码
    resetPassword: () => useRequest(
        (formModel: any) => request.Put("/system/user/resetPwd", formModel, {
            name: "apiUserResetPassword"
        }),
        {
            force: true,
            immediate: false,
        }
    ),
    // 导出
    export: (formModel: TsUser.FormModel) => useRequest(
        () => request.Post("/system/user/export", formModel, {
            name: "apiUserExport"
        }),
        {
            force: true,
            immediate: false,
        }
    ),
};
