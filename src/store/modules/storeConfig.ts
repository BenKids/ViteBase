import { defineStore } from "pinia";

export default defineStore("storeConfig", {
    state: ():TsStore.Config => ({
        language: "zh-cn",
        size: "default",
        autoInsertSpace: false,
        themeMode: "light",
    }),
    getters: {},
    actions: {},
    persist: true, // 设置持久化
});
