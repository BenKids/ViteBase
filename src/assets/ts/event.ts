// 数据类型判断
export function evTypeOf(obj: unknown): TsEv.TypeOf {
	return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() as TsEv.TypeOf;
}
// 删除字符串中的空格并保留换行
export function evClearEmpty(value: string): string {
	return value.replace(/[^\S\n]/g, "");
}
// 日期格式化
export function evDateFormat({ date, fmt }: TsEv.DateFormat): string {
	let ret;
	const opt: any = {
		"Y+": date.getFullYear().toString(),
		"M+": (date.getMonth() + 1).toString(),
		"D+": date.getDate().toString(),
		"h+": date.getHours().toString(),
		"m+": date.getMinutes().toString(),
		"s+": date.getSeconds().toString(),
	};
	let param: string = fmt.toString();
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(param);
		if (ret) {
			param = param.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
		}
	}
	return param;
}
// 数据深拷贝
export function evCopyData<T>(data: T): T {
	return JSON.parse(JSON.stringify(data));
}
// 数字格式化
export function evThousands(num: number): string {
	const point = 2; // 小数位置
	let nums = num.toString().split(".");
	let numLeft = nums[0].split("").reverse();
	let numRight = nums[1];
	let resLeft = "";
	for (let index = 0; index < numLeft.length; index++) {
		if (index !== 0 && index % 3 === 0 && index < numLeft.length - 1) {
			resLeft = "," + resLeft;
		}
		resLeft = numLeft[index] + resLeft;
	}
	let resRight: string;
	if (numRight) {
		resRight = ".";
		let right = numRight.split("");
		for (let index = 0; index < point; index++) {
			if (right[index]) {
				resRight = resRight + right[index];
			} else {
				resRight = resRight + "0";
			}
		}
	} else {
		resRight = ".";
		for (let index = 0; index < point; index++) {
			resRight += "0";
		}
	}
	return resLeft + resRight;
}
// 终端判断
export function evClient(): "ios" | "android" | "pc" {
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		return "ios";
	} else if (/(Android)/i.test(navigator.userAgent)) {
		return "android";
	} else {
		return "pc";
	}
}
// 防抖函数
export function evDebounce({ func, wait = 500, immediate = false }: TsEv.Debounce) {
	let timeout: NodeJS.Timeout;
	return function (this: any) {
		if (timeout) clearTimeout(timeout);
		if (immediate) {
			var callNow = !timeout;
			timeout = setTimeout(() => {
				clearTimeout(timeout);
			}, wait);
			if (callNow) func.apply(this, arguments as any);
		} else {
			timeout = setTimeout(function (this: any) {
				func.apply(this, arguments as any);
			}, wait);
		}
	};
}
// 获取本地文件
export function evAssets(url: string): string {
	return new URL(`../${url}`, import.meta.url).href;
}
// 数组对象数值映射
export function evArrReObj<D extends any, T extends TsGen.Object, O extends [T[keyof T], D]>({ data, key, cover }: { data: T[]; key: keyof T; cover: O[] }): T[] {
	let res: T[] = [];
	for (let index = 0; index < data.length; index++) {
		const item = data[index];
		let obj: T = {} as T;
		for (const keyI in item) {
			obj[keyI] = item[keyI];
			if (keyI == key) {
				const index = cover.findIndex((co) => co[0] == item[keyI]);
				(obj[keyI] as D) = cover[index][1];
			}
		}
		res.push(obj);
	}
	return res;
}
// 从嵌套数组中获取指定参数，并更改该参数的键名
export function evRename<
	T extends TsGen.Object,
	K extends {
		[pn: string]: keyof T;
	},
	R extends {
		[r in keyof K]: T[K[r]];
	} & {
		children?: R[];
	}
>({ data, keys }: { data: T[]; keys: K }): R[] {
	if (!data) return [];
	let res: R[] = [];
	data.map((item) => {
		let el = {} as R;
		const itemArr = Object.entries(item);
		for (const key in keys) {
			let ex = itemArr.find((item) => item[0] == keys[key]);
			el[key] = ex ? ex[1] : "";
		}
		if (item.children && item.children.length > 0) {
			el.children = evRename({ data: item.children, keys: keys as { [pn: string]: keyof TsGen.Object } });
		}
		res.push(el);
	});
	return res;
}
// 从嵌套数组中获取指定参数值的对象
export function evKeyChild<T extends TsGen.Object>({ data, param, key }: { data: T[]; param: any; key?: keyof T }): T | undefined {
	let res;
	for (let index = 0; index < data.length; index++) {
		const item = data[index];
		if (item[key || "value"] == param) {
			return (res = item);
		}
		if (item.children) {
			res = evKeyChild({ data: item.children, param: param, key: key });
			if (res) return res;
		}
	}
	return res;
}
export function evKeyObj<T extends TsGen.Object, P extends string | number, R extends T[keyof T]>({ obj, param, key = "label" }: { obj: T; param: P; key: keyof R }): R {
	let res = {} as R;
	for (const item in obj) {
		if (obj[item] && obj[item][key] == param) res = obj[item];
	}
	return res;
}
// 从嵌套数组中获取指定参数值组的对象
export function evMatchChild<T extends TsGen.Object, P extends TsGen.Object>({ data, params, dataKey = "id", paramsKey = "id" }: { data: T[]; params: T[keyof T][] | P[]; dataKey?: keyof T; paramsKey?: keyof P }) {
	let getData = data;
	let res: TsGen.Object[] = [];
	for (let index = 0; index < params.length; index++) {
		const a = getData.filter((item) => {
			return item[dataKey] == (params[index][paramsKey] || params[index]);
		});
		res = [...res, ...a];
		if (!a[0] || !a[0].children) break;
		getData = a[0].children;
	}
	return res;
}
// 从嵌套数组中获取指定参数的值
export function evArrGetKey<T extends TsGen.Object, K extends keyof T>({ data, key }: { data: T[]; key: K }): T[K][] {
	let res: T[K][] = [];
	for (let index = 0; index < data.length; index++) {
		const el = data[index];
		if (el.children) {
			res = [...res, ...evArrGetKey({ data: el.children, key: key as keyof TsGen.Object })];
			continue;
		}
		if (el[key]) res.push(el[key]);
	}
	return res;
}
// 从嵌套对象数组中获取指定参数的路径
export function evGetPath<T extends TsGen.Object, K extends keyof T, G extends keyof T>({ data, key, value, get }: { data: T[]; key: K; value: T[K]; get: G[] }): { [pn in G]: T[pn] }[] {
	let path: { [pn in G]: T[pn] }[] = [];
	for (let index = 0; index < data.length; index++) {
		const item = data[index];
		path = [];
		if (item[key] == value) {
			let o: { [pn in G]: T[pn] } = {} as { [pn in G]: T[pn] };
			for (let num = 0; num < get.length; num++) {
				const el = get[num];
				o[el] = item[el];
			}
			path.push(o);
			break;
		}
		if (!item.children || item.children == 0) continue;

		let c = evGetPath({
			data: item.children,
			key: key,
			value: value,
			get: get,
		});
		if (c.length > 0) {
			let o: { [pn in G]: T[pn] } = {} as { [pn in G]: T[pn] };
			for (let num = 0; num < get.length; num++) {
				const el = get[num];
				o[el] = item[el];
			}
			path.push(o);
			path.push(...c);
			break;
		}
	}
	return path;
}
// 从嵌套对象数组中获取指定参数的对象
export function evMatchObjs<T extends TsGen.Object>({data, dataKey, params}:{data:T[]; dataKey: keyof T; params: (string | number)[]}):T[] {
	let res:T[] = [];
	params.map(item => {
		for (let index = 0; index < data.length; index++) {
			const obj = data[index];
			if(obj[dataKey] == item) {
				res.push(obj);
				break;
			} else if(obj.children && obj.children.length > 0) {
				const objChild = evMatchObjs({data:obj.children,dataKey,params: [item]});
				if(objChild.length > 0) {
					res = [...res, ...objChild]
					break;
				}
			}
		}
	})
	return res;
}
// （非嵌套）对象数组增加参数
export function evArrAddKey({ data, key }: TsEv.ArrAddKey): TsGen.Object[] {
	const res = [];
	for (let index = 0; index < data.length; index++) {
		res[index] = { ...data[index], ...key };
	}
	return res;
}
// 将一个对象的key及其值赋值给另一个对象
export function evReObj<T extends TsGen.Object, C extends TsGen.Object>({ obj, cover }: { obj: T; cover: C }): T {
	for (const key in cover) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			obj[key] = cover[key] ?? obj[key];
		}
	}
	return obj;
}
// 复制文本到剪贴板
export function evCopyText(text: string): void {
	const el = document.createElement("input");
	el.setAttribute("value", text);
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
}
// 复制标签内容到剪贴板
export function evCopyBox(id: string) {
	const fn_text = document.getElementById(id)!.innerHTML;
	const fn_input = document.createElement("input");
	fn_input.setAttribute("style", "position: fixed; left:-100%; top: -100%; opacity:0;");
	document.body.appendChild(fn_input);
	fn_input.value = fn_text;
	fn_input.select();
	document.execCommand("copy");
	fn_input.parentNode!.removeChild(fn_input);
}
// 数组去重
export function evUnique(arr: string[]) {
	return [...new Set(arr)];
}
// 数组对象去重
export function evUniqueObj<T extends TsGen.Object>(arr: T[], label: string = "id"): T[] {
	const res = new Map();
	return arr.filter((a) => !res.has(a[label]) && res.set(a[label], 1));
}
// 数组排序
export function evSort({ data, key = "value", reverse = false }: TsEv.Sort): TsGen.Object[] {
	function func(a: TsGen.Object, b: TsGen.Object) {
		if (reverse) return b[key] - a[key];
		else return a[key] - b[key];
	}
	return data.sort(func);
}
// 计算时间间隔
export function evSeconds(time1: Date, time2: Date) {
	const difference = Math.abs(time1.getTime() - time2.getTime());
	return Math.floor(difference / 1000);
}
// 数字保留小数位
export function evToFixed(n: number, decimals: number = 2) {
	return Number(`${Math.round(Number(`${n}e${decimals}`))}e-${decimals}`).toFixed(decimals);
}
// 移除地址栏参数
export function evRemoveUrl() {
	const href = window.location.href;
	const exist = href.indexOf("?") > 0;
	if (exist) {
		window.history.replaceState(history.state, "", href.split("?")[0]);
	}
}
// 将数据变更为树结构1
export function evCasTree({ data, value, label, parentId, children }: TsEv.CasTree): TsEv.CasTreeRes[] {
	let config = {
		id: value || "id",
		name: label || "name",
		parentId: parentId || "parentId",
		childrenList: children || "children",
	};
	let childrenListMap: TsGen.Object = {};
	let nodeIds: TsGen.Object = {};
	let tree: TsEv.CasTreeRes[] = [];
	for (let d of data) {
		let m: TsEv.CasTreeRes = {
			value: "",
			label: "",
			children: [],
			parentId: "",
		};
		m.value = d[config.id];
		m.label = d[config.name];
		m.children = d[config.childrenList];
		m.parentId = d[config.parentId];
		let parentId = d[config.parentId];
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = [];
		}
		nodeIds[d[config.id]] = m;
		childrenListMap[parentId].push(m);
	}
	for (let d of data) {
		let parentId = d[config.parentId];
		if (nodeIds[parentId] == null) {
			let m: TsEv.CasTreeRes = {
				value: "",
				label: "",
				children: [],
				parentId: "",
			};
			m.value = d[config.id];
			m.label = d[config.name];
			m.children = d[config.childrenList];
			m.parentId = d[config.parentId];
			tree.push(m);
		}
	}
	for (let t of tree) {
		adaptToChildrenList(t);
	}
	function adaptToChildrenList(o: TsGen.Object) {
		if (childrenListMap[o.value] !== null) {
			o[config.childrenList] = childrenListMap[o.value];
		}
		if (o[config.childrenList]) {
			for (let c of o[config.childrenList]) {
				adaptToChildrenList(c);
			}
		}
	}
	return tree;
}
// 将数据变更为树结构2
export function evIntTree<D extends TsGen.Object>({ data, id, parentId, children }: { data: D[]; id?: keyof D; parentId?: keyof D; children?: keyof D }): D[] {
	let config = {
		id: id || "id",
		parentId: parentId || "parentId",
		childrenList: children || "children",
	};
	let childrenListMap: TsGen.Object = {};
	let nodeIds: TsGen.Object = {};
	let tree: D[] = [];
	for (let d of data) {
		let parentId = d[config.parentId];
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = [];
		}
		nodeIds[d[config.id]] = d;
		childrenListMap[parentId].push(d);
	}
	for (let d of data) {
		let parentId = d[config.parentId];
		if (nodeIds[parentId] == null) {
			tree.push(d);
		}
	}
	for (let t of tree) {
		adaptToChildrenList(t);
	}
	function adaptToChildrenList(o: D) {
		if (childrenListMap[o[config.id]] !== null) {
			o[config.childrenList] = childrenListMap[o[config.id]];
		}
		if (o[config.childrenList]) {
			o[config.childrenList].map((item: D) => adaptToChildrenList(item));
		}
	}
	return tree;
}
// 权限判断
export function evPermit(value: TsGen.Permissions): boolean {
	if (value && value.length > 0) {
		const { permissions } = pinia.storeToRefs(storeUser());
		const permissionDatas = value;
		const all_permission = "*:*:*";

		return permissions.value.some((permission: string) => {
			return all_permission === permission || permissionDatas.includes(permission);
		});

	} else {
		console.error(`need roles! Like checkPermi="['system:user:add','system:user:edit']"`);
		return false;
	}
}
// 判断文本溢出
export function evTextOver(el: HTMLDivElement) {
	const targetType = getComputedStyle(el);
	const targetW = parseFloat(targetType.width) - parseFloat(targetType.paddingLeft) - parseFloat(targetType.paddingRight);
	const range = document.createRange();
	range.setStart(el, 0);
	range.setEnd(el, el.childNodes.length);
	const rangeWidth = range.getBoundingClientRect().width;
	return rangeWidth > targetW;
}
// 将base64图片信息转name url格式
export function evBase64ToUpload(params: string[]): TsElement.UploadUserFile[] {
	let res: TsElement.UploadUserFile[] = [];
	for (let index = 0; index < params.length; index++) {
		const item = params[index];
		if (!item) continue;
		const itemArr = item.split("base64,");
		res.push({
			name: "upload" + index,
			url: itemArr.length > 1 ? itemArr[0] + "base64," + itemArr[1] : "data:image/png;base64," + itemArr[0],
		});
	}
	return res;
}
// upload图片转base64
export function evUploadToBase64(file: TsElement.UploadUserFile) {
	return new Promise(function (resolve, reject) {
		const reader = new FileReader();
		let imgResult: string | ArrayBuffer | null = "";
		reader.readAsDataURL(file.raw!);
		reader.onload = function () {
			imgResult = reader.result;
		};
		reader.onerror = function (error) {
			reject(error);
		};
		reader.onloadend = function () {
			resolve(imgResult);
		};
	});
}
// 传参路由跳转
export function evRouter(obj: TsEv.Router) {
	const data = window.btoa(window.encodeURIComponent(JSON.stringify(obj.params)));
	localStorage.setItem(obj.name, data);
	router.push({
		name: obj.name,
	});
}
// 获取传递参数
export function evRouterParams(): TsGen.Object {
	const route = useRoute();
	const query = localStorage[route.name as string];
	if (!query) return {};
	return JSON.parse(decodeURIComponent(window.atob(query)));
}
// 通用下载
export function evDownload(fileName: string) {
	window.location.href = import.meta.env.VITE_BASE_API + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
}
// 请求参数dateRange参数处理
export function evTransDateRange(dateRange: TsGen.Date[]) {
	return dateRange.length > 1 ? "?params%5BbeginTime%5D=" + dateRange[0] + "&params%5BendTime%5D=" + dateRange[1] : ""
}
// 移除对象中值为空的键值对
export function evRemoveEmpty<T = TsGen.Object>(obj: T, keys?: (keyof T)[]) {
	let res = JSON.parse(JSON.stringify(obj));
	for (const key in res) {
		if (!res[key]) delete res[key];
	}
	keys &&
		keys.map((item) => {
			if (res[item]) delete res[item];
		});
	return res;
}
