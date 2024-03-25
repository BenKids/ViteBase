import {createServerTokenAuthentication, bootSilentFactory} from "@alova/scene-vue";
import {createAlova} from "alova";
import {axiosRequestAdapter} from "@alova/adapter-axios";
// import GlobalFetch from "alova/GlobalFetch";
import VueHook from "alova/vue";
//* 提示内容设置
const messageSets = {
    showClose: true,
    grouping: true,
    duration: 5000,
};
//ref 登录状态过期时用于防止重复弹框提示
let isExpired = false;
// Token认证拦截器
const {onAuthRequired, onResponseRefreshToken} = createServerTokenAuthentication<typeof axiosRequestAdapter>({
    // 附加 token
    assignToken(method) {
        const {token} = pinia.storeToRefs(system());
        method.config.headers.Authorization = "Bearer " + token.value;
    },
    // 登录拦截
    login(response) {
        const storeSystem = system();
        storeSystem.setToken(response.data.token);
    },
    // 登出拦截
    logout() {
        localStorage.clear();
        invalidateCache();
        router.push({name: "Login"});
    },
});
const alovaInstance = createAlova({
    baseURL: import.meta.env.VITE_BASE_API, // baseURL
    statesHook: VueHook, // statesHook
    cacheLogger: false, // 打印缓存命中日志
    requestAdapter: axiosRequestAdapter(), // 请求适配器
    // 请求拦截器
    beforeRequest: onAuthRequired((method) => {
        method.config.headers["Content-Type"] = "application/json; charset=utf-8";
        if (isExpired) method.abort();
    }),
    // 响应拦截器
    responded: onResponseRefreshToken({
        // 响应成功拦截器
        onSuccess: async (response) => {
            if (isExpired) return;
            const {send: sendLogout} = apiLogin.logout();
            const res = response.data;
            if (res.code == 401) {
                isExpired = true;
                ElMessageBox.confirm("登录状态已过期，是否重新登录？", "系统提示", {
                    confirmButtonText: "重新登录",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        isExpired = false;
                        sendLogout();
                    })
                    .catch(() => {
                        isExpired = false;
                    });
            } else if (res.code !== 200) {
                const msg = "[Alova Code " + res.code + "]" + res.msg
                ElMessage({
                    type: "error",
                    message: msg,
                    ...messageSets,
                });
                throw new Error(msg);
            } else {
                return res;
            }
        },
        // 响应错误拦截器
        onError: (err: Error) => {
            let msg: string = "[Alova Error] ";
            if (err.message.indexOf("network timeout")) msg += "请求超时";
            else msg += err.message;
            ElMessage({
                type: "error",
                message: msg,
                ...messageSets,
            });
            throw err;
        },
    }),
    timeout: 20000,
});
// 启动静默工厂
bootSilentFactory({
    alova: alovaInstance,
});
export default alovaInstance;
