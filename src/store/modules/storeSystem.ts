import { defineStore } from "pinia";

export default defineStore("storeSystem", {
	state: ():TsStore.System => ({
        token: "",
        collapse: false,
        lock: false,
        include: [],
        tabs: [],
        whitelist: ["Login", "Error"],
        exclude: [],
	}),
	getters: {},
    actions: {
        // 设置token
        setToken(params: string) {
            this.token = params;
        },
        // 删除token
        removeToken() {
            this.token = "";
        },
        // 添加缓存页面
        addInclude(path: string) {
            let v = path.split("?")[0];
            const index = this.include.findIndex(item => item === v)
            if (index === -1) {
                this.include.push(v)
            }
        },
        // 移除缓存页面
        removeInclude(name: string) {
            const res = evKeyChild({
                data: routesMenus,
                param: name,
                key: "name"
            })
            if(res) this.include = this.include.filter(item => item.indexOf(res!.path) < 0);
            // 移除localStorage中页面缓存的参数
            if (localStorage.hasOwnProperty(name)) localStorage.removeItem(name);
        },
        // 添加tabs栏项
        addTabs(to: TsRouter.RouteLocationNormalized) {
            // if (!to.name || !to.meta.label) return;
            let exits = this.tabs.findIndex((item) => item.value == to.name);
            if (exits == -1) {
                this.tabs.push({
                    value: to.name!.toString(),
                    label: to.meta.label!.toString(),
                    query: to.query,
                    icon: shallowRef(to.meta.icon!) as unknown as string,
                })
            }
        },
        // 移除tabs栏项
        removeTabs(targetName: string, name?: TsRouter.RouteRecordName | null) {
            if (this.tabs.length <= 1) {
                return;
            }
            let index = this.tabs.findIndex(item => item.value == targetName);
            this.tabs = this.tabs.filter((tab) => tab.value !== targetName);
            if (targetName === name) {
                router.push({
                    name: (this.tabs[index] || this.tabs[index - 1]).value
                })
            }
            this.removeInclude(targetName);
        },
        // 添加权限name
        addExclude(data:string[]) {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                this.exclude.push(element);
            }
        }
    },
	persist: true, // 设置持久化
});
