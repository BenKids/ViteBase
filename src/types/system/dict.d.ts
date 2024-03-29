// 字典
namespace TsDicts {
    type Params = string;

    interface Data {
        dictLabel: TsDict.Label;
        dictValue: TsDict.Value;
        listClass?: TsTag.Sets["type"];
    }

    interface Rawdata {
        data: Data[];
    }

    interface ResItem extends TsGen.LvItem {
        type: TsTag.Sets["type"];
    }

    type Res = ResItem[];

    interface Option {
        dictType: TsDict.Type;
        dictName: TsDict.Name;
    }

    type Options = Option[];
}
namespace TsDict {
    type Id = TsGen.Id;
    type Name = string;
    type Type = string;
    type Label = string;
    type Value = string | number;

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
namespace TsDictData {
    interface FormModel {
        dictType: TsDict.Type;
        dictLabel: TsDict.Label;
        status: TsGen.Status;
    }

    interface TableItem {
        dictCode: TsDict.Id;
        dictLabel: TsDict.Label;
        dictValue: TsDict.Value;
        dictSort: number;
        status: TsGen.Status;
        remark: TsGen.Remark;
        createTime: TsGen.CreateTime;
    }

    type Table = TableItem[];
}
namespace TsDictDataAdd {
    interface FormModel {
        dictType: TsDict.Type;
        dictLabel: TsDict.Label;
        dictValue: TsDict.Value;
        listClass: TsGen.Types;
        dictSort: number;
        status: TsGen.Status;
        remark: TsGen.Remark;
    }
}
namespace TsDictDataUpdate {
    interface FormModel extends TsDictDataAdd.FormModel {
        dictCode: TsDict.Id;
    }
}