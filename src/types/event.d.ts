namespace TsEv {
	type TypeOf = 'array' | 'object' | 'string' | 'number' | 'boolean' | 'function';
	interface GetPath {
		data: TsGen.Object[];
		key: string;
		value: string | number;
		get: string[];
	}
	interface ArrAddKey {
		data: TsGen.Object[];
		key: TsGen.Object;
	}
	interface Sort {
		data: TsGen.Object[];
		key?: string;
		reverse?: boolean;
	}
	interface MatchChild {
		data: TsGen.Object[];
		params: string[] | TsGen.Object[];
		dataKey?: string;
		paramsKey?: string;
	}
	interface Debounce {
		func: () => void;
		wait?: number;
		immediate?: boolean;
	}
	interface DateFormat {
		date: Date;
		fmt: TsGen.Fmt;
	}
	interface CasTree {
		data: TsGen.Object[];
		value?: string;
		label?: string;
		parentId?: string;
		children?: string;
	}
	interface CasTreeRes {
		label: string;
		value: string | number;
		parentId: string | number;
		children: CasTreeRes[];
	}
	interface Router {
		name: string;
		params: TsGen.Object;
	}
}
