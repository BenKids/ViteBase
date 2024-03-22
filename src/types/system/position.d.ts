namespace TsPosition {
    type Id = string;
    interface FormModel {
        postCode: string;
        postName: string;
        status: TsGen.Status;
    }
    interface TableItem {
        postId: Id;
        postCode: string;
        postName: string;
        postSort: number;
        status: TsGen.StatusIs;
    }
    type Table = TableItem[];
}
namespace TsPositionAdd {
    interface FormModel {
        postName: string;
        postCode: string;
        postSort: number;
        status: TsGen.Status;
    }
}
namespace TsPositionUpdate {
    interface FormModel extends TsPositionAdd.FormModel {
        postId: Id | "";
    }
}