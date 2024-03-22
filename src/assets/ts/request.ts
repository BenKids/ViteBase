
export function apiPagination<T extends TsTable.Model>(params: TsApi.Pagination<T>) {
	return usePagination(
		(page, pageSize) =>
			request.Get(params.url, {
				name: params.name,
				params: {
					...params.params,
					...(params.paramsExtra ? params.paramsExtra.value : {}),
					pageNum: page,
					pageSize: pageSize,
				},
				transformData(rawdata: TsApi.PaginationRawdata<T>) {
					return params.transformData
						? params.transformData(rawdata)
						: rawdata;
				},
				hitSource: params.hitSource,
			}),
		{
			watchingStates: params.watchingStates,
			debounce: params.debounce,
			data: (res:TsGen.ResponseTable<T>) => {
				return params.data
					? params.data(res)
					: res.rows
			},
			initialPage: params.initialPage ?? 1,
			initialPageSize: params.initialPageSize ?? 10,
			immediate: params.immediate ?? true,
			append: params.append ?? false,
			preloadPreviousPage: params.preloadPreviousPage,
			preloadNextPage: params.preloadNextPage,
			initialData: params.initialData ?? {
				total: 0,
				rows: [],
			},
			middleware: params.name ? actionDelegationMiddleware(params.name) : undefined,
		}
	);
}
export function apiGet<R extends TsGen.Object>(params: TsApi.Get<R>) {
	return useRequest(
		(id?:TsGen.Id) => {
			let url = params.url;
			if(params.urlExtra) url = url + params.urlExtra.value;
			else if(id !== undefined) url = url + id;
			return request.Get(url, {
				name: params.name,
				params: params.params,
				transformData(rawdata: TsApi.GetRawdata<R> & Omit<R,"data">) {
					return params.transformData
						? params.transformData({
								...rawdata,
								code: rawdata.code,
								msg: rawdata.msg,
						  })
						: rawdata;
				},
				hitSource: params.hitSource,
			})
		},
		{
			force: params.force,
			immediate: params.immediate ?? true,
			initialData: params.initialData ?? [],
			middleware: params.name ? actionDelegationMiddleware(params.name) : undefined,
		}
	);
}
export function apiSQGet<R extends TsGen.Object>(params: TsApi.Get<R>) {
	return useSQRequest(
		(id?:TsGen.Id) => {
			let url = params.url;
			if(params.urlExtra) url = url + params.urlExtra.value;
			else if(id !== undefined) url = url + id;
			return request.Get(url, {
				name: params.name,
				params: params.params,
				transformData(rawdata: TsApi.GetRawdata<R> & Omit<R,"data">) {
					return params.transformData
						? params.transformData({
								...rawdata,
								code: rawdata.code,
								msg: rawdata.msg,
						  })
						: rawdata;
				},
				hitSource: params.hitSource,
			})
		},
		{
			force: params.force,
			immediate: params.immediate ?? true,
			initialData: params.initialData ?? [],
			middleware: params.name ? actionDelegationMiddleware(params.name) : undefined,
		}
	);
}
export function apiWatcher<R extends TsGen.Object>(params: TsApi.Wathcer<R>) {
	return useWatcher(
		() =>
			request.Get(params.urlExtra ? params.url + params.urlExtra.value : params.url, {
				name: params.name,
				params: {
					...params.params,
					...(params.paramsExtra ? params.paramsExtra.value : {}),
				},
				transformData(rawdata: TsApi.WathcerRawdata<R>) {
					return params.transformData ? params.transformData(rawdata) : rawdata.data;
				},
				hitSource: params.hitSource,
			}),
		params.watcher,
		{
			force: params.force,
			debounce: params.debounce,
			immediate: params.immediate ?? true,
			initialData: params.initialData ?? {},
			middleware: params.name ? actionDelegationMiddleware(params.name) : undefined,
		}
	);
}
export function apiPost(params: TsApi.Post) {
	return useRequest(
		() =>
			request.Post(params.url, params.params, {
				name: params.name,
			}),
		{
			immediate: false,
		}
	);
}
export function apiPut(params: TsApi.Put) {
	return useRequest(
		() =>
			request.Put(params.url, params.params, {
				name: params.name,
			}),
		{
			immediate: false,
		}
	);
}
export function apiDelete(params: TsApi.Delete) {
	return useRequest(
		() =>
			request.Delete(params.urlExtra ? params.url + params.urlExtra.value : params.url, params.params ?? {}, {
				name: params.name,
			}),
		{
			immediate: false,
		}
	);
}
