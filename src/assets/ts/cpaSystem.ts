export function cpaUserDialog() {
    //sets 弹框设置
    const setsDialog: TsDialog.Sets = {
        width: 750,
    };
    //sets 表单设置
    const setsForm: TsForm.Sets = {
        labelWidth: "7em",
    }
    //sets 岗位设置
    const setsPostIds: TsFormSelect.Sets = {
        multiple: true,
    };
    //sets 角色设置
    const setsRoleIds: TsFormSelect.Sets = {
        multiple: true,
    };
    //sets 归属部门设置
    const setsDeptId: TsFormTreeSelect.Sets = {
        required: true,
        expandOnClickNode: false,
        checkStrictly: true,
    }
    return {
        setsDialog,
        setsForm,
        setsDeptId,
        setsPostIds,
        setsRoleIds
    }
}
export function cpaRoleDialog() {
    //sets 弹框设置
    const setsDialog: TsDialog.Sets = {
        width: 1100,
    };
    //sets 表单设置
    const setsForm = {
        labelWidth: "7em",
        inline: false,
    }
    //sets 角色顺序设置
    const setsRoleSort: TsFormNumber.Sets = {
        min: 0,
        required: true,
    };
    //sets 菜单权限设置
    const setsMenuIds: TsTree.Sets = {
        showCheckbox: true,
        handleBtn: true,
        checkStrictly: false,
        checkOnClickNode: true,
        expandOnClickNode: true,
    };
    return {
        setsDialog,
        setsRoleSort,
        setsMenuIds,
        setsForm,
    }
}
export function cpaDeptDialog() {
    const setsDialog: TsDialog.Sets = {
        width: 450,
    }
    const setsForm: TsForm.Sets = {
        labelWidth: "7em",
        inline: false,
    }
    //sets 上级部门设置
    const setsDeptId: TsFormTreeSelect.Sets = {
        required: true,
        checkStrictly: true,
        expandOnClickNode: false,
    }
    //sets 显示顺序设置
    const setsOrderNum: TsFormNumber.Sets = {
        min: 0,
        required: true,
    };
    return {
        setsDialog,
        setsForm,
        setsDeptId,
        setsOrderNum,
    }
}
export function cpaPositionDialog() {
    const setsDialog: TsDialog.Sets = {
        width: 450,
    }
    const setsForm: TsForm.Sets = {
        labelWidth: "7em",
        inline: false,
    }
    return {
        setsDialog,
        setsForm,
    }
}
export function cpaDictDialog() {
    const setsDialog: TsDialog.Sets = {
        width: 450,
    }
    const setsForm: TsForm.Sets = {
        labelWidth: "7em",
        inline: false,
    }
    return {
        setsDialog,
        setsForm,
    }
}
export function cpaDictDataDialog() {
    const setsDialog: TsDialog.Sets = {
        width: 450,
    }
    const setsForm: TsForm.Sets = {
        labelWidth: "7em",
        inline: false,
    }
    //sets 字典类型设置
    const setsType: TsFormInput.Sets = {
        required: true,
        readonly: true,
    }
    //sets 回显样式设置
    const setsClass:TsFormSelect.Sets = {
        multiple: false,
        multipleLimit: 1,
    }
    return {
        setsDialog,
        setsForm,
        setsType,
        setsClass,
    }
}
export function cpaNoticeDialog() {
    const setsDialog: TsDialog.Sets = {
        width: 1100,
    }
    const setsForm: TsForm.Sets = {
        labelWidth: "7em",
    }
    return {
        setsDialog,
        setsForm,
    }
}