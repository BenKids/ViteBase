export default {
	// 登录验证码
	image: () => {
		const req = request.Get("/captchaImage", {
			transformData(rawdata: TsLogin.RawdataImage) {
				return {
					img: "data:image/jpg;base64," + rawdata.img,
					uuid: rawdata.uuid,
				};
			},
		});
		req.meta = {
			authRole: null,
		};
		return useAutoRequest(() => req, {
			force: true,
			initialData: {
				img: null,
				uuid: "",
			},
		});
	},
	// 登录
	login: (params: TsLogin.FormModel) => {
		const req = request.Post<TsLogin.Login>("/login", params);
		req.meta = {
			authRole: "login",
		};
		return useRequest(() => req, {
			immediate: false,
		});
	},
	// 退出登录
	logout: () => {
		const req = request.Post("/logout",{
			name: "apiLogout"
		});
		req.meta = {
			authRole: "logout",
		};
		return useRequest(() => req, {
			immediate: false,
			middleware: actionDelegationMiddleware("apiLogout"),
		});
	},
	// 用户信息
	user: () =>
		useRequest(() => request.Get<TsStore.UserRes>("/getInfo"), {
			immediate: false,
		}),
};
