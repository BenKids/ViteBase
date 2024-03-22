namespace TsApi {
	interface Rawdata {
		rows: any;
	}
	type Url = string;
	type Name = string;
	type Immediate = boolean;
	type FormModel = TsGen.Object;
	type UrlExtra = Ref<number | string>;
	type Force = boolean | ((a: boolean) => boolean);
	type HitSource = string[];
	interface PaginationRawdata<T> extends TsGen.Response {
		rows: T;
		total: TsPagination.Total;
	}
	interface GetRawdata<T> extends TsGen.Response {
		data: T;
	}
	interface WathcerRawdata<T> extends TsGen.Response {
		data: T;
	}
	interface Pagination<T> {
		name?: Name;
		url: Url;
		params: FormModel;
		paramsExtra?: globalThis.ComputedRef<TsGen.Object>;
		watchingStates?: (object | WatchSource)[];
		debounce?: number | number[];
		hitSource?: HitSource;
		initialPage?: TsPagination.Current;
		initialPageSize?: TsPagination.Size;
		immediate?: Immediate;
		append?: boolean;
		preloadPreviousPage?: boolean;
		preloadNextPage?: boolean;
		initialData?: PaginationRawdata<T> & {
			code?: never;
			msg?: never;
		};
		transformData?: (data: PaginationRawdata<T>, headers?: Headers) => any;
		data?: (T:TsGen.ResponseTable<T>) => T;
	}
	interface Get<R> {
		name?: Name;
		url: Url;
		urlExtra?: UrlExtra;
		params?: FormModel;
		transformData?: (data: GetRawdata<R> & Omit<R, "data">, headers?: Headers) => any;
		hitSource?: HitSource;
		immediate?: Immediate;
		force?: Force;
		initialData?: R;
	}
	interface Wathcer<R> {
		name?: Name;
		url: Url;
		urlExtra?: UrlExtra;
		watcher: (object | WatchSource<any>)[];
		params?: FormModel;
		paramsExtra?: globalThis.ComputedRef<FormModel>;
		debounce?: number | number[];
		force?: Force;
		immediate?: Immediate;
		transformData?: (data: WathcerRawdata<R>, headers?: Headers) => R;
		initialData?: R;
		hitSource?: HitSource;
	}
	interface Post {
		url: Url;
		name?: Name;
		params: FormModel;
	}
	interface Put {
		url: Url;
		name?: Name;
		params: FormModel;
	}
	interface Delete {
		url: Url;
		name?: Name;
		urlExtra?: Ref<string | number>;
		params?: FormModel;
	}
}
