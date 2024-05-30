import {evRemoveEmpty, evTransDateRange} from "@/assets/ts/event.ts";

export default {
    // 表格数据
    table: (formModel: TsLogLogin.FormModel) =>
        usePagination(
            (page, pageSize) =>
                request.Get<TsLogLogin.Table>("/monitor/logininfor/list" + evTransDateRange(formModel.dateRange), {
                    name: "apiLogLoginTable",
    			    params: {
    			        ...evRemoveEmpty(formModel,["dateRange"]),
    			        pageNum: page,
    			        pageSize: pageSize,
    			    },
    			}),
    		{
                watchingStates: [formModel,toRef(formModel,"ipaddr"), toRef(formModel,"userName")],
                debounce: [0,300,300],
    			data: (response:TsGen.ResponseRowsTotal<TsLogLogin.Table>) => response.rows,
    			initialPage: 1,
    			initialPageSize: 10,
    			initialData: {
    			    total: 0,
    			    rows: [],
    			},
    			middleware: actionDelegationMiddleware(""),
    		}
    	),
}