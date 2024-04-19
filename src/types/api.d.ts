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
	interface Form<T extends TsForm.Model> {
		form: T;
		send: any;
		onSuccess?: (data: T) => void;
		onError?: (error: Error) => void;
		onComplete?: (data: T) => void;
		loading?: boolean;
	}
}
