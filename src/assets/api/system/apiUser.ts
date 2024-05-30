export default {
    // 用户详细信息
    msg: () => useRequest(
        (id: TsUser.Id) => request.Get(
            "/system/user/" + (id ?? ""),
            {
                name: "apiUserMsg",
                hitSource: ["apiUserUpdateStatus", "apiUserUpdate"],
                transformData: (rawdata: TsUser.Msg) => {
                    return {
                        ...rawdata.data,
                        roleIds: rawdata.roleIds,
                        postIds: rawdata.postIds,
                    };
                },
            }
        ),
        {
            immediate: false,
        }
    ),
    // 用户列表
    table: (formModel: TsUser.FormModel) => usePagination(
        (pageNum, pageSize) => request.Get<TsUser.Table>(
            "/system/user/list" + evTransDateRange(formModel.dateRange),
            {
                name: "apiUserTable",
                params: {
                    ...evRemoveEmpty(formModel, ["dateRange"]),
                    pageNum,
                    pageSize,
                },
                hitSource: ["apiUserAdd", "apiUserUpdate", "apiUserDelete", "apiUserUpdateStatus"],
            }
        ),
        {
            watchingStates: [formModel, toRef(formModel, "userName"), toRef(formModel, "phonenumber")],
            debounce: [0, 300, 300],
            middleware: actionDelegationMiddleware("apiUserTable"),
            data: (rawdata: TsGen.ResponseRowsTotal<TsUser.Table>) => {
                const data = rawdata.rows;
                for (let index = 0; index < data.length; index++) {
                    const item = data[index];
                    item.deptName = item.dept.deptName;
                }
                return data;
            },
            initialData: {
                rows: [],
                total: 0,
            }
        }
    ),
    // 添加用户
    add: () => {
        let res = useForm(
            (formModel: TsUserAdd.FormModel) => request.Post(
                "/system/user/",
                {...formModel},
                {
                    name: "apiUserAdd",
                }
            ),
            {
                resetAfterSubmiting: true,
                initialForm: {
                    nickName: "",
                    deptId: "",
                    phonenumber: "",
                    email: "",
                    userName: "",
                    password: "123456",
                    sex: "",
                    status: "0",
                    postIds: [],
                    roleIds: [],
                    remark: "",
                },
                middleware: actionDelegationMiddleware("apiUserTable"),
            }
        )
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "用户新增成功",
            });
            accessAction("apiUserTable", (api) => api.refresh());
        });
        return res;
    },
    // 修改用户
    update: () => {
        let res = useForm(
            (formModel: TsUserEdit.FormModel) => request.Put(
                "/system/user",
                {...formModel},
                {
                    name: "apiUserUpdate",
                }
            ),
            {
                resetAfterSubmiting: true,
                initialForm: {
                    userId: "",
                    nickName: "",
                    deptId: "",
                    phonenumber: "",
                    email: "",
                    sex: "",
                    status: "",
                    postIds: [],
                    roleIds: [],
                    remark: "",
                    userName: "",
                    password: "",
                },
            }
        )
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "用户修改成功！",
            });
            accessAction("apiUserTable", (api) => api.refresh());
        })
        return res;
    },
    // 修改用户状态
    updateStatus: (formModel: TsUser.UpdateStatus) => {
        let res = useRequest(
            () => request.Put(
                "/system/user/changeStatus",
                {...formModel},
                {
                    name: "apiUserUpdateStatus"
                }
            ),
            {
                force: true,
                immediate: false,
            });
        res.onSuccess(() => {
            const text = formModel.status === "1" ? "停用" : "启用";
            ElMessage({
                type: "success",
                message: text + "成功！",
            });
            accessAction("apiUserTable", (api) => api.refresh());
        })
        return res;
    },
    // 删除用户
    remove: () => {
        let res = useRequest(
            (id: TsGen.Id) => request.Delete(
                "/system/user/" + id,
                {},
                {
                    name: "apiUserDelete",
                }
            ),
            {
                force: true,
                immediate: false,
            }
        )
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "用户删除成功",
            });
            accessAction("apiUserTable", (api) => api.refresh());
        })
        return res;
    },
    // 重置密码
    resetPassword: () => {
        let res = useRequest(
            (formModel: TsUser.ResetPassword) => request.Put(
                "/system/user/resetPwd",
                {...formModel},
                {
                    name: "apiUserResetPassword"
                }
            ),
            {
                force: true,
                immediate: false,
            }
        );
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "用户密码修改成功",
            });
        });
        return res;
    },
    // 导出
    down: (formModel: TsUser.FormModel) => useRequest(
        () => request.Post(
            "/system/user/export",
            {...formModel},
            {
                name: "apiUserExport"
            }
        ),
        {
            force: true,
            immediate: false,
        }
    ),
}