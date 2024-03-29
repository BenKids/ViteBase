namespace TsLogOper {
    type Id = number;
    type Ip = string;
    type Type = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
    interface FormModel {
        operIp: Ip;
        title: string;
        operName: string;
        businessType: Type | "";
        status: TsGen.Status;
        dateRange: TsGen.Date[];
    }
    interface TableItem {
        operId: Id;
        title: string;
        businessType: Type;
        operName: string;
        operIp: Ip;
        operLocation: string;
        status: TsGen.StatusIs;
        operTime: TsGen.Date;
        costTime: string;
        operUrl: string;
        requestMethod: string;
        method: string;
        operParam: string;
        jsonResult: string;
        errorMsg: string;
    }
    type Table = TableItem[];
}
namespace TsLogOperDetail {
    interface FormModel extends TsLogOper.TableItem {
        operId: TsLogOper.Id | "";
        operTime: string;
        businessType: TsLogOper.Type | "";
        status: TsGen.Status;
    }
}
namespace TsLogLogin {
    type Id = number;
    type Name = string;
    type Ip = string;
    interface FormModel {
        ipaddr: Ip;
        userName: Name;
        status: TsGen.Status;
        dateRange: TsGen.Date[];
    }
    interface TableItem {
        infoId: Id;
        userName: Name;
        ipaddr: Ip;
        loginLocation: string;
        browser: string;
        os: string;
        status: TsGen.StatusIs;
        msg: string;
        loginTime: TsGen.Date;
    }
    type Table = TableItem[];
}