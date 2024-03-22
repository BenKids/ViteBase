namespace TsMenus {
    interface PermiRawdataItem {
        id: number;
        label: string;
        children: PermiRawdataItem[];
    }
    interface PermiRawdata {
        data: PermiRawdataItem[];
    }
}