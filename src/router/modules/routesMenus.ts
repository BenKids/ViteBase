export const routesMenus: TsRoutes.RoutesMenus = [
	{
		path: "/Home",
		name: "Home",
		component: () => import("@/views/main/home.vue"),
		meta: {
			label: "首页",
			icon: IconSolarHomeSmileAngleLinear,
		},
	},
	{
		path: "/System",
		name: "System",
		redirect: "/System/User",
		meta: {
			label: "系统设置",
			icon: IconSolarShieldWarningLinear,
		},
		children: [
			{
				path: "User",
				name: "User",
				component: () => import("@/views/system/user.vue"),
				meta: {
					label: "用户管理",
					keepAlive: true,
					icon: IconSolarUserHandsLinear,
					hidden: () => evPermi(["system:user:list"]),
				},
			},
			{
				path: "Role",
				name: "Role",
				component: () => import("@/views/system/role.vue"),
				meta: {
					label: "角色管理",
					keepAlive: true,
					icon: IconSolarUsersGroupTwoRoundedLinear,
					hidden: () => evPermi(["system:role:list"]),
				},
			},
			{
				path: "Dept",
				name: "Dept",
				component: () => import("@/views/system/dept.vue"),
				meta: {
					label: "部门管理",
					keepAlive: true,
					icon: IconSolarBuildingsLinear,
					hidden: () => evPermi(["system:dept:list"]),
				},
			},
			{
				path: "Position",
				name: "Position",
				component: () => import("@/views/system/position.vue"),
				meta: {
					label: "岗位管理",
					keepAlive: true,
					icon: IconSolarCupLinear,
					hidden: () => evPermi(["system:post:list"]),
				},
			},
			{
				path: "Dict",
				name: "Dict",
				component: () => import("@/views/system/dict.vue"),
				meta: {
					label: "字典管理",
					keepAlive: true,
					icon: IconSolarBook2Linear,
					hidden: () => evPermi(["system:dict:list"]),
				},
			},
			{
				path: "Dict/DictData",
				name: "DictData",
				component: () => import("@/views/system/dictData.vue"),
				meta: {
					menu: "Dict",
					label: "字典数据",
					keepAlive: true,
					icon: IconSolarBook2Linear,
					hidden: () => evPermi(["system:dict:list"]),
				},
			},
		],
	},
];
