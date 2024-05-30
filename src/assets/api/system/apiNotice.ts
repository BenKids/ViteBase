export default {
    // 根据id获取公告信息
    msg: () =>
    	useRequest(
    	    (id:TsNotice.Id) => request.Get("/system/notice/"+id,{
    	        name: "apiNoticeMsg",
                transformData(rawdata:TsGen.ResponseData<TsNoticeUpdate.FormModel>) {
                    return rawdata.data;
                },
                hitSource: ["apiNoticeUpdate"],
            }),
            {
                immediate: false,
    			middleware: actionDelegationMiddleware("apiNoticeMsg"),
            }
        ),
    // 公告表格数据
    table: (formModel: TsNotice.FormModel) =>
        usePagination(
            (page, pageSize) =>
                request.Get<TsNotice.Table>("/system/notice/list", {
                    name: "apiNoticeTable",
                    params: {
                        ...formModel,
                        pageNum: page,
                        pageSize: pageSize,
                    },
                    hitSource: ["apiNoticeAdd", "apiNoticeUpdate", "apiNoticeDelete"],
                }),
            {
                watchingStates: [formModel, toRef(formModel, "noticeTitle"), toRef(formModel, "createBy")],
                debounce: [0, 300, 300],
                data: (response: TsGen.ResponseRowsTotal<TsNotice.Table>) => response.rows,
                initialPage: 1,
                initialPageSize: 10,
                initialData: {
                    total: 0,
                    rows: [],
                },
                middleware: actionDelegationMiddleware("apiNoticeTable"),
            }
        ),
    // 新增公告
    add: () => {
        let res = useForm(
            (formModel: TsNoticeAdd.FormModel) => request.Post("/system/notice",formModel,{
                name: "apiNoticeAdd",
            }),{
                resetAfterSubmiting: true,
                initialForm: {
                    noticeTitle: "",
                    noticeType: "",
                    status: "0",
                    noticeContent: "",
                }
            }
        );
        res.onSuccess(()=>{
            ElMessage({
                type: "success",
                message: "新增通知公告成功！",
            });
            accessAction("apiNoticeTable",(api) => api.refresh());
        });
        return res;
    },
    // 修改公告
    update: () => {
        let res = useForm(
            (formModel: TsNoticeUpdate.FormModel) => request.Put("/system/notice",formModel,{
                name: "apiNoticeUpdate",
            }),{
                resetAfterSubmiting: true,
                initialForm: {
                    noticeId: "",
                    noticeTitle: "",
                    noticeType: "",
                    status: "",
                    noticeContent: "",
                }
            }
        );
        res.onSuccess(()=>{
            ElMessage({
                type: "success",
                message: "通知公告修改成功！",
            });
            accessAction("apiNoticeTable", (api) => api.refresh());
        })
        return res;
    },
    // 删除公告
    delete: () => {
        let res = useRequest(
            (id: TsNotice.Id) =>
                request.Delete(
                    "/system/notice/" + id,
                    {},
                    {
                        name: "apiNoticeDelete",
                    }
                ),
            {
                immediate: false,
            }
        )
        res.onSuccess(()=>{
            ElMessage({
                type: "success",
                message: "通知公告删除成功",
            });
            accessAction("apiNoticeTable",(api) => api.refresh());
        })
        return res;
    },
}