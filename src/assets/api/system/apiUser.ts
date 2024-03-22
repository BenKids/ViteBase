export default {
    // 用户列表
    table: (formModel: TsUser.FormModel) =>
        usePagination(
            (pageNum, pageSize) =>
                request.Get("/system/user/list" + evTransDateRange(formModel.dateRange), {
                    name: "apiUserTable",
                    params: {
                        ...evRemoveEmpty(formModel, ["dateRange"]),
                        pageNum,
                        pageSize,
                    },
                    transformData(rawdata: TsGen.ResponseTable<TsUser.Table>) {
                        let res = rawdata.rows;
                        for (let index = 0; index < rawdata.rows.length; index++) {
                            const item = rawdata.rows[index];
                            item.deptName = item.dept.deptName;
                        }
                        return {
                            data: res,
                            total: rawdata.total,
                        };
                    },
                    hitSource: ["apiUserAdd", "apiUserUpdate", "apiUserDelete", "apiUserUpdateStatus"],
                }),
            {
                watchingStates: [formModel, toRef(formModel, "userName"), toRef(formModel, "phonenumber")],
                debounce: [0, 300, 300],
                middleware: actionDelegationMiddleware("apiUserTable"),
            }
        ),

    // 用户详细信息
    msg: () =>
        useRequest(
            (id: TsUser.Id) =>
                request.Get("/system/user/" + id, {
                    transformData(rawdata: TsUser.Msg) {
                        return {
                            ...rawdata.data,
                            roleIds: rawdata.roleIds,
                            postIds: rawdata.postIds,
                        };
                    },
                    hitSource: ["apiUserUpdateStatus", "apiUserUpdate"],
                }),
            {
                immediate: false,
            }
        ),
    // 修改用户状态
    updateStatus: (formModel: TsUser.UpdateStatus) =>
        useRequest(
            () =>
                request.Put("/system/user/changeStatus", formModel, {
                    name: "apiUserUpdateStatus",
                }),
            {
                immediate: false,
            }
        ),
    // 添加用户
    add: (formModel: TsUserAdd.FormModel) =>
        useRequest(
            () =>
                request.Post("/system/user", formModel, {
                    name: "apiUserAdd",
                }),
            {
                immediate: false,
            }
        ),
    // 修改用户
    update: (formModel: TsUserEdit.FormModel) =>
        useRequest(
            () =>
                request.Put("/system/user", formModel, {
                    name: "apiUserUpdate",
                }),
            {
                immediate: false,
            }
        ),
    // 删除用户
    delete: () =>
        useRequest(
            (id: TsUser.Id) =>
                request.Delete(
                    "/system/user/" + id,
                    {},
                    {
                        name: "apiUserDelete",
                    }
                ),
            {
                immediate: false,
            }
        ),
    // 重置密码
    resetPassword: () =>
        useRequest(
            (formModel: TsUser.ResetPassword) =>
                request.Put("/system/user/resetPwd", formModel, {
                    name: "apiUserResetPassword",
                }),
            {
                immediate: false,
            }
        ),
    // 导出
    export: (formModel: TsUser.FormModel) =>
        useRequest(
            () =>
                request.Get<TsUser.Export>("/system/user/export",
                    {
                        name: "apiUser.Export",
                        params: formModel,
                    }
                ),
            {
                immediate: false,
            }
        ),
};
