// 字典
namespace TsDicts {
	type Params = string;
	interface Data {
		dictLabel: string;
		dictValue: string | number;
		listClass?: TsTag.Sets["type"];
	}
	interface Rawdata {
		data: Data[];
	}
	interface ResItem extends TsGen.LvItem {
		type: TsTag.Sets["type"];
	}
	type Res = ResItem[];
}
namespace TsDict {
    type Id = TsGen.Id;
    type Name = string;
    type Type = string;
    interface FormModel {
        dictName: Name;
        dictType: Type;
        status: TsGen.Status;
        dateRange: TsGen.Date[];
    }
    interface TableItem {
        dictId: TsDict.Id;
        dictName: Name;
        dictType: Type;
        status: TsGen.StatusIs;
        remark: TsGen.Remark;
        createTime: TsGen.CreateTime;
    }
    type Table = TableItem[];
    interface Msg {
        dictId: Id;
        dictName: TsDict.Name,
        dictType: TsDict.Type;
        status: TsGen.StatusIs;
        remark: TsGen.Remark;
        createBy: string;
        createTime: TsGen.CreateTime;
    }
}
namespace TsDictAdd {
    interface FormModel {
        dictName: TsDict.Name,
        dictType: TsDict.Type;
        status: TsGen.StatusIs;
        remark: TsGen.Remark;
    }
}
namespace TsDictUpdate {
    interface FormModel extends TsDictAdd.FormModel {
        dictId: TsDict.Id;
    }
}