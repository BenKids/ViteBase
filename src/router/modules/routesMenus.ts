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
					hidden: () => evPermit(["system:user:list"]),
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
					hidden: () => evPermit(["system:role:list"]),
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
					hidden: () => evPermit(["system:dept:list"]),
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
					hidden: () => evPermit(["system:post:list"]),
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
					hidden: () => evPermit(["system:dict:list"]),
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
					hidden: () => evPermit(["system:dict:list"]),
				},
			},{
			    path: "Notice",
			    name: "Notice",
			    component: () => import("@/views/system/notice.vue"),
			    meta: {
			        label: "通知公告",
			        keepAlive: true,
			        icon: IconSolarChatDotsLinear,
			        hidden: () => evPermit(["system:dict:list"]),
			    },
			},
		],
	},{
		path: "/Monitor",
		name: "Monitor",
		redirect: "/Monitor/LogOper",
		meta: {
			label: "系统监控",
			icon: IconSolarMonitorLinear,
			hidden: () => evPermit(["monitor:operlog:list","monitor:logininfor:list"]),
		},
		children: [
			{
				path: "LogOper",
				name: "LogOper",
				component: () => import("@/views/monitor/logOper.vue"),
				meta: {
					label: "操作日志",
					keepAlive: true,
					icon: IconSolarFolderPathConnectLinear,
					hidden: () => evPermit(["monitor:operlog:list"]),
				},
			},{
				path: "LogLogin",
				name: "LogLogin",
				component: () => import("@/views/monitor/logLogin.vue"),
				meta: {
					label: "登录日志",
					keepAlive: true,
					icon: IconSolarFileRightLinear,
					hidden: () => evPermit(["monitor/logininfor/index"]),
				},
			},{
			    path: "Online",
			    name: "Online",
			    component: () => import("@/views/monitor/online.vue"),
			    meta: {
			        label: "在线用户",
			        keepAlive: true,
			        icon: IconSolarUserCheckRoundedLinear,
			        hidden: () => evPermit(["monitor:online:list"]),
			    },
			}, {
			    path: "Serve",
			    name: "Serve",
			    component: () => import("@/views/monitor/serve.vue"),
			    meta: {
			        label: "服务监控",
			        keepAlive: false,
			        icon: IconSolarServer2Linear,
			        hidden: () => evPermit(["monitor:server:list"]),
			    },
			}
		],
	}
];
