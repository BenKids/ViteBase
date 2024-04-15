export default {
    // 用户角色数据
    select: () => useRequest(
        () =>
            request.Get("/system/user/", {
                name: "apiRoleMsg",
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
            immediate: true,
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
            data: (res: TsGen.ResponseTable<TsRole.Table>) => res.rows,
            initialData: {
                rows: [],
                total: 0,
            }
        }
    ),
    add: (formModel: TsRoleAdd.FormModel) => useRequest(
        () => request.Post("/system/role", formModel, {
            name: "apiRoleAdd"
        }),
        {
            immediate: false,
        }
    ),
    delete: () => useRequest(
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
    ),
    update: (formModel: TsRoleUpdate.FormModel) => useRequest(
        () =>
            request.Put("/system/role", formModel, {
                name: "apiRoleUpdate",
            }),
        {
            immediate: false,
        }
    ),
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
    updatePermit: (formModel: TsRoleAuth.FormModel) => useRequest(
        () =>
            request.Put("/system/role/dataScope", formModel, {
                name: "apiRoleUpdatePermi",
            }),
        {
            immediate: false,
        }
    ),
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
