namespace TsNotice {
    type Id = number;
    type Title = string;
    type Type = "0" | "1";
    interface FormModel {
        noticeTitle: Title;
        createBy: string;
        noticeType: Type | "";
    }
    interface TableItem {
        noticeId: Id;
        noticeTitle: Title;
        noticeType: Type;
        status: TsGen.StatusIs;
        createBy: string;
        createTime: TsGen.CreateTime;
    }
    type Table = TableItem[];
}
namespace TsNoticeAdd {
    interface FormModel {
        noticeTitle: TsNotice.Title;
        noticeType: TsNotice.Type | "";
        status: TsGen.StatusIs;
        noticeContent: string;
    }
}
namespace TsNoticeUpdate {
    interface FormModel extends TsNoticeAdd.FormModel {
        noticeId: TsNotice.Id | "";
        status: TsGen.Status;
    }
}