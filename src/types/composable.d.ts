namespace TsComposable {
    type Name = string;
    type Url = string;
    type HitSource = string[];
    type FormModel = Reactive<TsForm.Model>
    type Reset = () => void;
    interface DialogForm {
        setsForm?: TsForm.Sets;
        setsDialog?: TsDialog.Sets;
    }
    interface Dialog {
        setsDialog?: TsDialog.Sets;
    }

    interface Basic {
        name: Name;
        url: Url;
    }
    interface PaginationDateRange<T extends TsGen.Object, R> extends Basic {
        formModel: Reactive<T>;
        hitSource?: HitSource;
        watchingStates?: (keyof T)[];
        transformData?: (rawdata: R) => void;
    }
    interface Get<T extends TsGen.Object> extends Basic {
        formModel?: FormModel;
        transformData?: (rawdata: unknown) => T;
        immediate?: boolean;
    }
    interface GetMsgId extends Basic {
        hitSource?: HitSource;
        transformData?: (rawdata: TsGen.Object<any>) => any | Promise<any>;
        immediate?: boolean;
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