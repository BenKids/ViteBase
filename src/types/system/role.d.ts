namespace TsRole {
    type RoleId = TsGen.Id;
    type Name = string;
    interface FormModel {
        roleName: Name;
        roleKey: string;
        status: string;
        dateRange: TsGen.Date[];
    }
    interface TableItem {
        roleId: RoleId;
        roleName: Name;
        roleKey: string;
        roleSort: number;
        status: TsGen.Status;
        createTime: string;
    }
    type Table = TableItem[];
}
namespace TsRoleAdd {
    interface FormModel {
        roleName: Name;
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
        roleName: Name;
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