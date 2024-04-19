export function cpaDialogForm() {
    // 表单实例
    const formRef = ref();
    //ref 弹框开关
    let visible = ref<TsDialog.Model>(false);
    //handle 打开弹框
    function open() {
        return new Promise((resolve) => {
            visible.value = true;
            formRef.value && formRef.value.clearValidate();
            resolve(true)
        })
    }
    //handle 提交
    function confirm() {
        return formRef.value && formRef.value.validate()
    }
    //handle 取消
    function close() {
        return new Promise((resolve) => {
            visible.value = false;
            formRef.value && formRef.value.clearValidate();
            resolve(true)
        });
    }
    return {
        formRef,
        visible,
        open,
        confirm,
        close,
    }
}
export function cpaSets() {
    //sets 必填项
    const setsRequired: TsFormItem.Sets = {
        required: true,
    }
    //sets 手机号码设置
    const setsPhonenumber: TsFormInput.Sets = {
        type: 'phone',
    }
    //sets 邮箱设置
    const setsEmail: TsFormInput.Sets = {
        type: 'email',
    }
    //sets 备注设置
    const setsRemark: TsFormInput.Sets = {
        autosize: {
            minRows: 3,
        }
    };
    //sets 密码设置
    const setsPassword: TsFormInput.Sets = {
        required: true,
        type: "password",
        showPassword: true,
    };
    return {
        setsRemark,
        setsRequired,
        setsPhonenumber,
        setsEmail,
        setsPassword,
    }
}