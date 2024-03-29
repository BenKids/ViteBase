namespace TsOnline {
    type Id = number;
    type Ip = string;
    type Name = string;
    interface FormModel {
        ipaddr: Ip;
        userName: Name;
    }
    interface TableItem {
        tokenId: string;
        userName: Name;
        deptName: TsDept.DeptName;
        ipaddr: Ip;
        loginLocation: string;
        browser: string;
        os: string;
        loginTime: TsGen.Date;
    }
    type Table = TableItem[];
}