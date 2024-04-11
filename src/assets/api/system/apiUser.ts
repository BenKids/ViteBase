
export default {
    // 用户列表
    table: (formModel: TsUser.FormModel) => comPaginationDateRange<TsUser.FormModel, TsUser.Table>({
        name: "apiUserTable",
        url: "/system/user/list",
        formModel,
        watchingStates: ["userName", "phonenumber"],
        hitSource: ["apiUserAdd", "apiUserUpdate", "apiUserDelete", "apiUserUpdateStatus"],
        transformData: (rawdata) => {
            for (let index = 0; index < rawdata.length; index++) {
                const item = rawdata[index];
                item.deptName = item.dept.deptName;
            }
            return rawdata;
        },
    }),

    // 用户详细信息
    msg: () => comGetMsgId<TsUser.Msg>({
        name: "apiUserMsg",
        url: "/system/user/",
        hitSource: ["apiUserUpdateStatus", "apiUserUpdate"],
        transformData(rawdata) {
            return {
                ...rawdata.data,
                roleIds: rawdata.roleIds,
                postIds: rawdata.postIds,
            };
        }
    }),
    // 修改用户状态
    updateStatus: (formModel: TsUser.UpdateStatus) => comPut({
        name: "apiUserUpdateStatus",
        url: "/system/user/changeStatus",
        formModel,
    }),
    // 添加用户
    add: (formModel: TsUserAdd.FormModel) => comPost({
       name: "apiUserAdd",
       url: "/system/user",
       formModel,
    }),
    // 修改用户
    update: (formModel: TsUserEdit.FormModel) => comPut({
        name: "apiUsserUpdate",
        url: "/system/user",
        formModel,
    }),
    // 删除用户
    delete: () => comDelete({
        name: "apiUserDelete",
        url: "/system/user/",
    }),
    // 重置密码
    resetPassword: () => comPutSend({
       name: "apiUserResetPassword",
       url: "/system/user/resetPwd",
    }),
    // 导出
    export: (formModel: TsUser.FormModel) => comPost({
        name: "apiUserExport",
        url: "/system/user/export",
        formModel
    })
        // useRequest(
        //     () =>
        //         request.Get<TsUser.Export>("/system/user/export",
        //             {
        //                 name: "apiUser.Export",
        //                 params: formModel,
        //             }
        //         ),
        //     {
        //         immediate: false,
        //     }
        // ),
};
