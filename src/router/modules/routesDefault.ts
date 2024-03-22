export const routesDefault: TsRouter.RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/Login",
    },{
        path: "/Login",
        name: "Login",
		component: () => import("@/views/app/login.vue"),
		meta: {
			label: "登录",
		}
    },{
        path: "/Error",
        name: "Error",
        component: () => import("@/views/app/error.vue"),
        meta: {
            label: "错误",
        }
    },{
        path: "/TheLock",
        name: "TheLock",
        component: () => import("@/views/app/lock.vue"),
        meta: {
            label: "锁屏",
        }
    }
]