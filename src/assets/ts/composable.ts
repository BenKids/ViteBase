export function comDialogForm(params?: TsComposable.DialogForm) {
    // 表单实例
    const formRef = ref();
    //sets 弹框设置
    const dialogSets: TsDialog.Sets = {
        width: 750,
        beforeClose: close,
        ...params?.dialogSets,
    };
    //sets 表单设置
    const formSets: TsForm.Sets = {
        labelWidth: "7em",
        ...params?.formSets,
    };
    //sets 必填项
    const setsRequired: TsFormItem.Sets = {
        required: true,
    };
    //ref 弹框开关
    let visible = ref<TsDialog.Model>(false);

    //handle 打开
    function open() {
        return new Promise((resolve) => {
            visible.value = true;
            resolve(true);
        })
    }

    //handle 确定
    function confirm() {
        return formRef.value.validate()
    }

    //handle 取消
    function close() {
        formRef.value.clearValidate();
        visible.value = false;
    }

    return {
        dialogSets,
        formRef,
        formSets,
        setsRequired,
        visible,
        open,
        confirm,
        close,
    }
}
export function comDialog(params?: TsComposable.Dialog) {
    //sets 弹框设置
    const dialogSets: TsDialog.Sets = {
        width: 750,
        beforeClose: close,
        ...params?.dialogSets,
    };
    //ref 弹框开关
    let visible = ref<TsDialog.Model>(false);
    //handle 打开
    function open() {
        return new Promise((resolve) => {
            visible.value = true;
            resolve(true);
        })
    }
    //handle 确定
    function confirm() {
        return new Promise((resolve) => {
            close();
            resolve(true);
        })
    }
    //handle 取消
    function close() {
        visible.value = false;
    }
    return {
        dialogSets,
        visible,
        open,
        confirm,
        close,
    }
}
export function comPagination<T extends TsGen.Object, R extends TsTable.Model>(params: TsComposable.PaginationDateRange<T, R>) {
    return usePagination(
        (pageNum, pageSize) => request.Get<R>(params.url, {
            name: params.name,
            params: {
                ...params.formModel,
                pageNum,
                pageSize,
            },
            hitSource: params.hitSource,
        }),
        {
            append: false,
            watchingStates: (() => {
                let res = [params.formModel];
                if (!params.watchingStates) return res;
                for (let i = 0; i < params.watchingStates.length; i++) {
                    res.push(toRef(params.formModel, params.watchingStates[i]))
                }
                return res;
            })(),
            debounce: (() => {
                let res = [0];
                if (!params.watchingStates) return res;
                for (let i = 0; i < params.watchingStates.length; i++) {
                    res.push(300)
                }
                return res;
            })(),
            middleware: actionDelegationMiddleware(params.name),
            data: (res: TsGen.ResponseTable<R>) => params.transformData ? params.transformData(res.rows) : res.rows,
        }
    )
}

export function comPaginationDateRange<T extends TsGen.Object, R>(params: TsComposable.PaginationDateRange<T, R>) {
    return usePagination(
        (pageNum, pageSize) => request.Get<R>(params.url + evTransDateRange(params.formModel.dateRange), {
            name: params.name,
            params: {
                ...evRemoveEmpty(params.formModel, ["dateRange"]),
                pageNum,
                pageSize,
            },
            hitSource: params.hitSource,
        }),
        {
            append: false,
            watchingStates: (() => {
                let res = [params.formModel];
                if (!params.watchingStates) return res;
                for (let i = 0; i < params.watchingStates.length; i++) {
                    res.push(toRef(params.formModel, params.watchingStates[i]))
                }
                return res;
            })(),
            debounce: (() => {
                let res = [0];
                if (!params.watchingStates) return res;
                for (let i = 0; i < params.watchingStates.length; i++) {
                    res.push(300)
                }
                return res;
            })(),
            middleware: actionDelegationMiddleware(params.name),
            data: (res: TsGen.ResponseTable<R>) => params.transformData ? params.transformData(res.rows) : res.rows,
            // initialData: {
            //     data: [],
            //     total: 0,
            // }
        }
    )
}

export function comGet<T extends TsGen.Object>(params: TsComposable.Get<T>) {
    return useRequest(
        () =>
            request.Get<T>(params.url,
                {
                    name: params.name,
                    params: params.formModel,
                    transformData: params.transformData,
                }
            ),
        {
            immediate: params.immediate ?? false,
        }
    )
}

export function comGetMsgId(a:any,params?: TsComposable.GetMsgId) {
    return useRequest(a,{
            immediate: (params && params.immediate) ?? false,
        }
    )
}

export function comPut(params: TsComposable.Put) {
    return useRequest(
        () => request.Put(params.url, params.formModel, {
            name: params.name
        }),
        {
            force: true,
            immediate: false,
        }
    )
}

export function comPost(params: TsComposable.Post) {
    return useRequest(
        () => request.Post(params.url, params.formModel, {
            name: params.name
        }),
        {
            force: true,
            immediate: false,
        }
    )
}

export function comPutSend(params: TsComposable.PutSend) {
    return useRequest(
        (formModel: any) => request.Put(params.url, formModel, {
            name: params.name
        }),
        {
            force: true,
            immediate: false,
        }
    )
}

export function comDelete(params: TsComposable.Delete) {
    return useRequest(
        (id: TsGen.Id) => request.Delete(params.url + id, {}, {
            name: params.name,
        }),
        {
            force: true,
            immediate: false,
        }
    )
}