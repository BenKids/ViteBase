export function comDialogForm({submit,successText}: {
    submit: () => void;
    successText: string;
}) {
    // 表单实例
    const formRef = ref();
    //sets 弹框设置
    const dialogSets: TsDialog.Sets = {
        width: 750,
        beforeClose: close
    };
    //sets 表单设置
    const formSets: TsForm.Sets = {
        labelWidth: "7em",
    };
    //sets 必填项
    const setsRequired: TsFormItem.Sets = {
        required: true,
    };
    //ref 弹框开关
    let visible = ref<TsDialog.Model>(false);

    //todo 打开
    function open() {
        return new Promise((resolve) => {
            visible.value = true;
            resolve(true);
        })
    }

    //todo 确定
    function confirm() {
        return formRef.value.validate().then(() => submit()).then(() => {
            ElMessage({
                type: "success",
                message: successText,
            });
            close();
        })
    }

    //todo 取消
    function close() {
        formRef.value.clearValidate();
        visible.value = false;
    }

    return {
        dialogSets,
        formRef,
        formSets,
        setsRequired,
        visible,
        open,
        confirm,
        close,
    }
}