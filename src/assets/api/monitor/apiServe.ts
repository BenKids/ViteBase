export default {
    data: () =>
        useRequest(
            () => request.Get("/monitor/server", {
                name: "apiServeData",
                transformData(rawdata:TsGen.Response<TsServe.FormData>) {
                    return rawdata.data;
                },
            }),
            {
                immediate: true,
                initialData: {
                    cpu: {
                        cpuNum: 0,
                        used: 0,
                        sys: 0,
                        free: 0,
                    },
                    mem: {
                        total: 0,
                        used: 0,
                        free: 0,
                        usage: 0,
                    },
                    jvm: {
                        total: 0,
                        used: 0,
                        free: 0,
                        usage: 0,
                    },
                    sys: {
                        computerName: "",
                        osName: "",
                        computerIp: "",
                        osArch: "",
                    }
                },
                middleware: actionDelegationMiddleware("apiServeData"),
            }
        ),
}