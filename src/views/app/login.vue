<script setup lang="ts">
// 移除主题样式
document.documentElement.classList.remove("dark");
const storeUs = storeUser();
// 表单实例
const formRef = ref();
//* 按钮设置
const setsLogin = computed((): TsButton.Sets => {
    return {
        size: "large",
        loading: loadingLogin.value || loadingUser.value,
    };
});
//sets 表单设置
const formSets = reactive<TsForm.Sets>({
    size: "large",
    inline: true,
});
//sets 账号框设置
const setsUser: TsFormInput.Sets = {
    required: true,
    prefixIcon: IconSolarShieldUserLinear,
    placeholder: "请输入账号",
};
//sets 密码框设置
const setsPsw: TsFormInput.Sets = {
    required: true,
    type: "password",
    showPassword: true,
    clearable: false,
    placeholder: "请输入密码",
    prefixIcon: IconSolarPasswordMinimalisticInputLinear,
};
//sets 验证码框设置
const setsCode: TsFormInput.Sets = {
    required: true,
    prefixIcon: IconSolarProgrammingLinear,
    placeholder: "请输入验证码",
};
//ref LOGO
const logo = evAssets("image/vite.svg");
//ref 项目名称
const proName = import.meta.env.VITE_BASE_TITLE;
//ref 表单数据
let formModel = reactive<TsLogin.FormModel>({
    username: "admin",
    password: "admin123",
    code: "",
    uuid: "",
});
//api 验证码图片
const {data: codeImage, onSuccess: getImage, send: sendImage} = apiLogin.image();
getImage(({data}) => {
    formModel.uuid = data.uuid;
});
//api 登录
const {loading: loadingLogin, send: sendLogin} = apiLogin.login(formModel);
//api 退出登录
// accessAction("apiLogout",(api) => api.send());
//api 用户信息
const {loading: loadingUser, send: sendUser} = apiLogin.user();
//handle 登录方法
const onLogin = () => {
    formRef.value
        .validate()
        .then(() => sendLogin())
        .then(() => sendUser())
        .then((res: TsStore.UserRes) => {
            storeUs.getUserInfo(res);
            router.push({name: "Home"});
        })
        .catch(() => {
            sendImage();
        });
};
</script>

<template>
    <div class="login-main">
        <div class="logo-name">
            <base-image v-model="logo"></base-image>
            <div class="logo-title">{{ proName }}</div>
        </div>
        <div class="login-box">
            <div class="login-title">欢迎登录</div>
            <base-form v-model="formModel" :sets="formSets" ref="formRef" @keyup.enter="onLogin">
                <base-form-input v-model="formModel.username" prop="username" :sets="setsUser"></base-form-input>
                <base-form-input v-model="formModel.password" prop="password" :sets="setsPsw"></base-form-input>
                <base-form-input v-model="formModel.code" prop="code" :sets="setsCode" class="input-code"></base-form-input>
                <base-image v-model="codeImage.img" @click="sendImage"></base-image>
                <template #handle>
                    <base-button label="登录" :sets="setsLogin" @click="onLogin"></base-button>
                </template>
            </base-form>
        </div>
    </div>
</template>

<style scoped>
.login-main {
    width: 100%;
    height: 100%;
    background: url("@/assets/image/bg-login.jpg") no-repeat center;
    background-size: cover;
    position: relative;
}

.logo-name {
    display: flex;
    align-items: center;
    position: absolute;
    left: 50px;
    top: 40px;
    gap: var(--base-gap);
    font-size: x-large;
    font-weight: bolder;
}

.login-box {
    width: 400px;
    height: 420px;
    box-shadow: var(--base-shadow-box);
    background-color: #ffffff;
    border-radius: 24px;
    padding: 32px 32px 16px;
    position: absolute;
    right: 16%;
    top: calc(50% - 230px);
}

.login-box .base-image {
    width: 120px;
    height: 40px;
    cursor: pointer;
    position: relative;
    top: 2px;
}

.login-title {
    text-align: center;
    font-size: 24px;
    font-weight: bolder;
    margin-bottom: 50px;
    letter-spacing: 5px;
}

.login-box :deep(.el-form-item) {
    width: 100%;
    margin-bottom: 28px;
}

.login-box :deep(.base-input) {
    width: 100%;
}

.login-box .input-code {
    width: 184px;
}
</style>
