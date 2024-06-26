namespace TsUser {
    type Id = TsGen.Id;
    type UserName = string;
    type NickName = string;
    interface FormModel {
        deptId: TsStore.User["Id"],
        userName: UserName;
        phonenumber: number | "";
        status: TsGen.Status;
        dateRange: TsGen.Date[];
    }
    interface TableItem {
        userId: Id;
        userName: UserName;
        nickName: NickName;
        deptName: string;
        dept: {
            deptName: string;
        }
        phonenumber: number;
        status: TsGen.StatusIs;
        createTime: string;
    }
    type Table = TableItem[];
    interface Msg extends TsGen.ResponseData<TsUserEdit.FormModel>{
        roles: {
            roleId: TsRole.RoleId;
            roleName: TsRole.Name;
        }[]
        roleIds: TsRole.RoleId[];
        postIds: TsPosition.Id[];
    }

    interface UpdateStatus {
        userId: Id;
        status: TsGen.StatusIs | "";
    }

    interface PostsItem {
        postId: number;
        postName: string;
        status: TsGen.StatusIs;
    }
    interface RolesItem {
        roleId: number;
        roleName: string;
    }
    interface User {
        posts: PostsItem[];
        roles: RolesItem[];
        data: TsUserEdit.FormModel;
    }
    interface ResetPassword {
        userId: Id;
        password: string;
    }
    interface Export {
        msg: string;
    }
}
namespace TsUserEdit {
    interface FormModel {
        userId: string;
        nickName: string;
        deptId: string;
        phonenumber: number | "";
        email: string;
        sex: "0" | "1" | "2" | "9" | "";
        status: TsGen.Status;
        postIds: string[];
        roleIds: string[];
        remark: string;
        userName: string;
        password: string;
    }
}
namespace TsUserAdd {
    interface FormModel extends TsUserEdit.FormModel {
        userId?: never;
    }
}