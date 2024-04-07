namespace TsGen {
	interface LvItem {
		label: string;
		value: string | number;
	}
	type Lv = LvItem[];
	interface LvcItem {
		label: string;
		value: string | number;
		children?: LvItem[];
	}
	type Lvc = LvcItem[];
	// 对象
	interface Object {
		[propName: string | number]: any;
	}
	// 日期格式
	type Fmt = "YYYY-MM-DD hh:mm:ss" | "YYYY-MM-DD hh:mm" | "YYYY-MM-DD" | "YYYY-MM" | "MM-DD" | "hh:mm:ss" | "mm:ss" | "YYYY";
	type Date = `${number}-${number}-${number}`;
	type Time = `${number}-${number}-${number} ${number}:${number}:${number}`;
	type CreateTime = Date | string;
	// 组件尺寸
	type Size = "default" | "large" | "small";
	// 组件样式
	type Types = "primary" | "success" | "warning" | "danger" | "info";
	// 对齐方式
	type Align = "left" | "center" | "right";
	// 图片填充方式
	type Fit = "fill" | "contain" | "cover" | "none" | "scale-down";
	// 请求返回参数
	interface Response<T> {
		code: number;
		msg: string;
		data: T;
	}
	// 表格请求返回参数
	interface ResponseTable<T> {
		code: number;
		msg: string;
		rows: T;
		total: number;
	}
	// 角色
	type Roles = string[];
	// 权限
	type Permissions = string[];
	// 分页
	interface FormPage {
		pageNum: TsPagination.Current;
		pageSize: TsPagination.Size;
	}
	// 时间筛选
	interface FormDate {
		"params%5BbeginTime%5D": string;
		"params%5BendTime%5D": string;
	}
	// 表格数据
	interface TableRes<T> {
		rows: T;
		total: TsPagination.Total;
	}
	// 正常/停用状态
	type StatusIs = "0" | "1";
	type Status = StatusIs | "";
	// 手机号码
	type Phonenumber = number;
	// 邮箱
	type Email = string;
	// 性别
	type Sex = "0" | "1" | "2" | "9";
	// 身份证号
	type CardId = string;
	type Double = Match<number>;
	// Id
	type Id = number | string;
	// 备注
	type Remark = string;
	// 图标
	type Icon = string;
}