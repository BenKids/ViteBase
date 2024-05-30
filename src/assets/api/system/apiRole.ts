export default {
    // 用户角色数据
    select: () => useRequest(
        () =>
            request.Get("/system/user/", {
                name: "apiRoleSelect",
                transformData(rawdata: TsUser.Msg) {
                    return evRename({
                        data: rawdata.roles,
                        keys: {
                            label: "roleName",
                            value: "roleId",
                        },
                    });
                },
            }),
        {
            force: isForce => isForce,
            immediate: true,
            middleware: actionDelegationMiddleware("apiRoleSelect"),
        }
    ),
    // 表格数据
    table: (formModel: TsRole.FormModel) => usePagination(
        (pageNum, pageSize) => request.Get<TsRole.Table>("/system/role/list" + evTransDateRange(formModel.dateRange), {
            name: "apiRoleTable",
            params: {
                ...evRemoveEmpty(formModel, ["dateRange"]),
                pageNum,
                pageSize,
            },
            hitSource: ["apiRoleAdd", "apiRoleUpdate", "apiRoleUpdatePermi", "apiRoleDelete"],
        }),
        {
            append: false,
            watchingStates: [formModel, toRef(formModel, "roleName"), toRef(formModel, "roleKey")],
            debounce: [0, 300, 300],
            middleware: actionDelegationMiddleware("apiRoleTable"),
            data: (res: TsGen.ResponseRowsTotal<TsRole.Table>) => res.rows,
            initialData: {
                rows: [],
                total: 0,
            }
        }
    ),
    add: () => {
        let res = useForm(
            (formModel: TsRoleAdd.FormModel) => request.Post("/system/role", formModel, {
                name: "apiRoleAdd",
            }), {
                resetAfterSubmiting: true,
                initialForm: {
                    roleName: "",
                    roleKey: "",
                    roleSort: 0,
                    status: "0",
                    menuIds: [],
                    remark: "",
                }
            }
        );
        res.onSuccess(()=>{
            ElMessage({
                type: "success",
                message: "角色添加成功",
            });
            accessAction("apiRoleTable", (api) => api.refresh());
            accessAction("apiRoleSelect",(api) => api.send(true));
        })
        return res;
    },
    update: () => {
        let res = useForm(
            (formModel: TsRoleUpdate.FormModel) => request.Put("/system/role", formModel,{
                name: "apiRoleUpdate",
            }),{
                resetAfterSubmiting: true,
                initialForm: {
                    roleId: "",
                    roleName: "",
                    roleKey: "",
                    roleSort: 0,
                    status: "0",
                    menuIds: [],
                    remark: "",
                }
            }
        );
        res.onSuccess(()=>{
            ElMessage({
                type: "success",
                message: "角色修改成功",
            });
            accessAction("apiRoleTable", (api) => api.refresh());
            accessAction("apiRoleSelect",(api) => api.send(true));
        })
        return res;
    },
    delete: () => {
        let res = useRequest(
            (id: TsRole.RoleId | string) =>
                request.Delete(
                    "/system/role/" + id,
                    {},
                    {
                        name: "apiRoleDelete",
                    }
                ),
            {
                immediate: false,
            }
        );
        res.onSuccess(()=>{
            ElMessage({
                type: "success",
                message: "角色删除成功",
            });
            accessAction("apiRoleTable",(api) => api.refresh());
            accessAction("apiRoleSelect",(api) => api.send(true));
        })
        return res;
    },
    menuPermi: () => useRequest(
        (id:TsRole.RoleId) => request.Get("/system/menu/roleMenuTreeselect/" + id, {
            name: "apiRoleMenuPermi",
            hitSource: ["apiRoleUpdate"],
            transformData: (rawdata: TsRoleUpdate.Rawdata) => rawdata.checkedKeys,
        }),
        {
            immediate: false,
        }
    ),
    updatePermit: () => {
        let res = useForm(
            (formModel: TsRoleAuth.FormModel) => request.Put("/system/role/dataScope",formModel,{
                name: "apiRoleUpdatePermi",
            }),{
                resetAfterSubmiting: true,
                initialForm: {
                    roleId: "",
                    roleName: "",
                    roleKey: "",
                    dataScope: "",
                    deptCheckStrictly: false,
                    deptIds: [],
                }
            }
        );
        res.onSuccess(()=>{
            ElMessage({
                type: "success",
                message: "角色数据权限修改成功",
            });
        })
        return res;
    },
    auth: () => {
        return [
            {
                value: "1",
                label: "全部数据权限",
            },
            {
                value: "2",
                label: "自定数据权限",
            },
            {
                value: "3",
                label: "本部门数据权限",
            },
            {
                value: "4",
                label: "本部门及以下数据权限",
            },
            {
                value: "5",
                label: "仅本人数据权限",
            },
        ];
    },
};
