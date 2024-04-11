namespace TsComposable {
    type Name = string;
    type Url = string;
    type HitSource = string[];
    type FormModel = Reactive<TsForm.Model>
    interface DialogForm {
        formSets?: TsForm.Sets;
        dialogSets?: TsDialog.Sets;
    }
    interface Basic {
        name: Name;
        url: Url;
    }
    interface PaginationDateRange<T extends TsGen.Object, R extends TsTable.Model> extends Basic {
        formModel: Reactive<T>;
        hitSource?: HitSource;
        watchingStates?: (keyof T)[];
        transformData?: (rawdata: R) => void;
    }
    interface Get extends Basic {
        formModel: FormModel,
    }
    interface GetMsgId<T extends TsGen.Object> extends Basic {
        hitSource?: HitSource;
        transformData?: (rawdata: T) => any;
    }
    interface Put extends Basic {
        formModel: FormModel
    }
    interface Post extends Basic {
        formModel: FormModel
    }
    interface PutSend extends Basic {}
    interface Delete extends Basic {}
}