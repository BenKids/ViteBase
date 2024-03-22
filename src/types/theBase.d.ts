namespace TsTheBaseTable {
    interface ModelItem {
        key: string;
        explain: string;
        dataType: string;
        required: boolean;
        default: string;
        optional: string;
    }
    type Model = ModelItem[];
}
namespace TsTheBaseLayout {
    interface Sets {
        view?: boolean;
        attr?: boolean;
        options?: boolean;
        sets?: boolean;
        slot?: boolean;
        tips?: boolean;
    }
}
namespace TsTheBaseTableSlot {
    interface ModelItem {
        key: string;
        explain: string;
    }
    type Model = ModelItem[];
}
namespace TsTheBaseForm {
    interface Model {
        userName: string;
        phone: string;
    }
}