import { createRouter, createWebHashHistory } from "vue-router";
import { storeToRefs } from "pinia";
const r = createRouter({
	history: createWebHashHistory(),
	routes: [
		...routesDefault,
		{
			path: "",
			name: "",
			component: () => import("@/views/app/appLayout.vue"),
			children: routesMenus as unknown as TsRouter.RouteRecordRaw[]
		},{
			path: "",
			name: "",
			component: () => import("@/views/app/appLayout.vue"),
			children: routesBase as unknown as TsRouter.RouteRecordRaw[]
		},
	],
});
r.beforeEach((to, _from, next) => {
	const stores = system();
	let { whitelist, token, exclude, lock } = storeToRefs(stores);
	if(to.name && to.meta) {
		const meta = to.meta as unknown as TsRoutes.Meta;
		if(meta.hidden && !meta.hidden()) stores.addExclude([to.name as string]);
	}
	if (whitelist.value.findIndex((item) => item === to.name) >= 0) {
		next();
	} else if(lock.value && to.name != "TheLock") {
		next({ name: "TheLock" });
	} else if (!token.value) {
		next({ name: "Login" });
	} else if (exclude.value.findIndex((item) => item === to.name) >= 0) {
		next({ name: "Error" });
	} else if(to.name != "TheLock") {
		stores.addTabs(to);
		next();
	} else {
		next();
	}
});
r.afterEach((to) => {
	const storeSystem = system();
	const storeUser = user();
	if (to.name === "Login") {
		storeSystem.$reset();
		storeUser.$reset();
	} else if (to.meta.keepAlive) {
		storeSystem.addInclude(to.fullPath);
	}
});
export default r;