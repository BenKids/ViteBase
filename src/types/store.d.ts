// 全局变量
namespace TsStore {
	type Avatar = string;
	interface Tab extends TsTabs.Option{
		query: TsGen.Object,
	}
	interface System {
		token: string;
		collapse: boolean;
		lock: boolean;
		include: string[];
		tabs: Tab[];
		whitelist: string[];
		exclude: string[];
	}
	interface User {
		userName: TsUser.UserName;
		nickName: TsUser.NickName;
		avatar: Avatar;
		deptId: TsDept.DeptId;
		deptName: TsDept.DeptName;
		dwdm: TsDept.Dwdm;
		phonenumber: TsGen.Phonenumber | null;
		roles: Roles;
		permissions: TsGen.Permissions;
	}
	interface UserRes {
		roles: Roles;
		permissions: TsGen.Permissions;
		user: {
			userName: TsUser.UserName;
			nickName: TsUser.NickName;
			avatar: Avatar;
			phonenumber: TsGen.Phonenumber;
			dept: {
				deptId: TsDept.DeptId;
				deptName: TsDept.DeptName;
				dwdm: TsDept.Dwdm;
			} 
		};
	}
	interface Config {
		size: TsGen.Size;
		language: "zh-cn" | "en";
		autoInsertSpace: boolean;
	}
}