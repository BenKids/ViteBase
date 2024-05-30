export default {
    // 部门树数据
    tree: () =>
        useRequest(
            request.Get("/system/user/deptTree", {
                name: "apiDeptTree",
                hitSource: ["apiDeptAdd", "apiDeptUpdate", "apiDeptDelete"],
                transformData: (rawdata: TsApi.GetRawdata<TsDept.TreeData>) => {
                    return evRename({
                        data: rawdata.data,
                        keys: {
                            label: "label",
                            value: "id",
                            children: "children",
                        },
                    });
                },
            }), {
                force: (isForce: boolean) => isForce,
                immediate: true,
                middleware: actionDelegationMiddleware("apiDeptTree"),
            }
        ),
    // 根据deptId查询相关部门信息
    msg: () =>
        useRequest(
            (deptId: TsDept.DeptId) =>
                request.Get("/system/dept/" + deptId, {
                    name: "apiDeptMsg",
                    hitSource: ["apiDeptAdd", "apiDeptDelete", "apiDeptUpdate"],
                    transformData: (rawdata: TsGen.ResponseData<TsDept.Msg>) => {
                        return rawdata.data;
                    }
                }),
            {
                force: true,
                immediate: false,
                middleware: actionDelegationMiddleware("apiDeptMsg"),
            }
        ),
    // 根据角色id查询部门树结构
    roleId: () =>
        useRequest(
            (id: TsRole.RoleId) =>
                request.Get("/system/role/deptTree/" + id, {
                    name: "apiDeptRoleId",
                    hitSource: ["apiDeptAdd", "apiDeptUpdate", "apiDeptDelete"],
                    transformData(rawdata: TsDept.TreeRoleIdResponse) {
                        return {
                            checkedKeys: rawdata.checkedKeys,
                            depts: evRename({
                                data: rawdata.depts,
                                keys: {
                                    label: "label",
                                    value: "id",
                                    children: "children",
                                },
                            }),
                        };
                    },
                }),
            {
                force: true,
                immediate: false,
            }
        ),
    // 部门表格数据
    table: (formModel: TsDept.FormModel) => useWatcher(() => request.Get("/system/dept/list", {
            name: "apiDeptTable",
            params: formModel,
            transformData: (rawdata: TsApi.WathcerRawdata<TsDept.Table>) => {
                return evIntTree({
                    data: rawdata.data,
                    id: "deptId",
                });
            },
            hitSource: ["apiDeptAdd", "apiDeptDelete", "apiDeptUpdate"],
        }),
        [formModel, toRef(formModel, "deptName")],
        {
            force: (args) => args,
            debounce: [0, 300],
            immediate: true,
            initialData: [],
            middleware: actionDelegationMiddleware("apiDeptTable"),
        },
    ),
    // 新增部门
    deptAdd: () => {
        let res = useForm(
            (formModel: TsDeptAdd.FormModel) => request.Post("/system/dept", formModel, {
                name: "apiDeptAdd",
            }), {
                resetAfterSubmiting: true,
                initialForm: {
                    parentId: "",
                    deptName: "",
                    orderNum: 0,
                    leader: "",
                    phone: "",
                    email: "",
                    status: "0",
                }
            }
        );
        res.onSuccess(()=>{
            ElMessage({
                type: "success",
                message: "部门添加成功",
            })
            accessAction("apiDeptTable", (api) => api.send(true));
            accessAction("apiDeptTree",(api) => api.send(true));
        })
        return res;
    },
    // 修改部门
    deptUpdate: () => {
        let res = useForm(
            (formModel: TsDeptUpdate.FormModel) => request.Put("/system/dept", formModel, {
                name: "apiDeptUpdate",
            }), {
                resetAfterSubmiting: true,
                initialForm: {
                    deptId: "",
                    parentId: "",
                    deptName: "",
                    orderNum: 0,
                    leader: "",
                    phone: "",
                    email: "",
                    status: "0",
                }
            }
        )
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "部门修改成功",
            });
            accessAction("apiDeptTable", (api) => api.send(true));
            accessAction("apiDeptTree",(api) => api.send(true));
        })
        return res;
    },
    // 删除部门
    deptDel: () => {
        let res = useRequest(
            (id: TsDept.DeptId) =>
                request.Delete("/system/dept/" + id, {}, {
                    name: "apiDeptDelete",
                }),
            {
                immediate: false,
            }
        )
        res.onSuccess(() => {
            ElMessage({
                type: "success",
                message: "部门删除成功",
            });
            accessAction("apiDeptTable", (api) => api.send(true));
            accessAction("apiDeptTree",(api) => api.send(true));
        })
        return res;
    },
};
