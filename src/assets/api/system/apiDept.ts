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
                immediate: true,
                middleware: actionDelegationMiddleware("apiDeptTree"),
            }
        ),
    // 根据deptId查询相关部门信息
    msg: () =>
        useRequest(
            (deptId: TsDept.DeptId) =>
                request.Get<TsGen.Response<TsDept.Msg>>("/system/dept/" + deptId, {
                    name: "apiDeptMsg",
                    hitSource: ["apiDeptAdd", "apiDeptDelete", "apiDeptUpdate"],
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
    deptAdd: (formModel: TsDeptAdd.FormModel) => useRequest(
        () =>
            request.Post("/system/dept", formModel, {
                name: "apiDeptAdd",
            }),
        {
            immediate: false,
        }
    ),
    // 删除部门
    deptDel: () => useRequest(
        (id: TsDept.DeptId) =>
            request.Delete("/system/dept/" + id, {}, {
                name: "apiDeptDelete",
            }),
        {
            immediate: false,
        }
    ),
    // 修改部门
    deptUpdate: (formModel: TsDeptUpdate.FormModel) => useRequest(
        () =>
            request.Put("/system/dept", formModel, {
                name: "apiDeptUpdate",
            }),
        {
            immediate: false,
        }
    ),
};
