export default {
    // 根据id获取公告信息
    msg: () =>
    	useRequest(
    	    (id:TsNotice.Id) => request.Get("/system/notice/"+id,{
    	        name: "apiNoticeMsg",
                transformData(rawdata:TsGen.Response<TsNoticeUpdate.FormModel>) {
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
                request.Get<TsGen.TableRes<TsNotice.Table>>("/system/notice/list", {
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
                data: (response: TsGen.TableRes<TsNotice.Table>) => response.rows,
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
    add: (formModel: TsNoticeAdd.FormModel) =>
        useRequest(
            () =>
                request.Post("/system/notice", formModel, {
                    name: "apiNoticeAdd",
                }),
            {
                immediate: false,
            }
        ),
    // 修改公告
    update: (formModel:TsNoticeUpdate.FormModel) => 
        useRequest(
            () => 
                request.Put("/system/notice",formModel,{
                    name: "apiNoticeUpdate",
    		    }),
            {
    			immediate: false,
            }
        ),
    // 删除公告
    delete: () =>
        useRequest(
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
        ),
}