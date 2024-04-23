import { defineStore } from "pinia";

export default defineStore("storeUser", {
	state: ():TsStore.User => ({
        userName: '',
        nickName: '',
        avatar: '',
        roles: [],
        permissions: [],
        deptId: "",
        deptName: "",
        dwdm: '',
        phonenumber: null,
	}),
	getters: {},
    actions: {
        // 获取用户信息
        async getUserInfo(res:TsStore.UserRes) {
            this.roles = res.roles && res.roles.length > 0 ? res.roles : ['ROLE_DEFAULT'];
            this.permissions = res.permissions;
            this.userName = res.user.userName;
            this.nickName = res.user.nickName;
            this.avatar = res.user.avatar || evAssets("image/avatar.jpg");
            this.deptId = res.user.dept.deptId;
            this.deptName = res.user.dept.deptName;
            this.dwdm = res.user.dept.dwdm;
            this.phonenumber = res.user.phonenumber;
        },
    },
	persist: true, // 设置持久化
});
