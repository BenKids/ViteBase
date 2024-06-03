namespace TsConfig {
    type Id = TsGen.Id;
    type Name = string;

    interface FormModel {
        configName: string;
        configKey: string;
        configType: TsGen.Whether;
        dateRange: TsGen.Date[];
    }

    interface TableItem {
        configId: Id;
        configName: Name;
        configKey: string;
        configValue: string;
        configType: TsGen.WhetherIs;
        remark: TsGen.Remark;
        createTime: TsGen.Time;
    }

    type TableData = TableItem[];
}
namespace TsConfigAdd {
    interface FormModel {
        configName: TsConfig.Name;
        configKey: string;
        configValue: string;
        configType: TsGen.WhetherIs;
        remark: TsGen.Remark;
    }
}
namespace TsConfigUpdate {
    interface FormModel extends TsConfigAdd.FormModel {
        configId: TsConfig.Id;
    }
}