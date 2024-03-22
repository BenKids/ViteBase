namespace TsRole {
    type RoleId = string;
    interface FormModel {
        roleName: string;
        roleKey: string;
        status: string;
        dateRange: TsGen.Date[];
        "params%5BbeginTime%5D"?: TsGen.Date | "",
        "params%5BendTime%5D"?: TsGen.Date | "",
    }
    interface TableItem {
        roleId: RoleId;
        roleName: string;
        roleKey: string;
        roleSort: number;
        status: TsGen.Status;
        createTime: string;
    }
    type Table = TableItem[];
}
namespace TsRoleAdd {
    interface FormModel {
        roleName: string;
        roleKey: string;
        roleSort: number;
        status: TsGen.Status;
        menuIds: number[];
        remark: string;
    }
}
namespace TsRoleUpdate {
    interface FormModel extends TsRoleAdd.FormModel {
        roleId: TsRole.RoleId;
    }
    interface Rawdata {
        checkedKeys: number[];
        menus: TsDept.TreeData;
    }
}
namespace TsRoleAuth {
    interface FormModel {
        roleId: TsRole.RoleId;
        roleName: string;
        roleKey: string;
        dataScope: "1" | "2" | "3" | "4" | "5" | "";
        deptCheckStrictly: boolean;
        deptIds: number[];
    }
    interface Rawdata {
        checkedKeys: number[];
        depts: TsDept.TreeData;
    }
}