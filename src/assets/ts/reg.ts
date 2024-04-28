// 手机号
export const regPhone = new RegExp(/^1[3-9][0-9]\d{8}$/);
// 邮箱
export const regEmail = new RegExp(/^([0-9a-zA-Z_\.\-\])+\@([0-9a-zA-Z_\.\-\])+\.([a-zA-Z]+)$/);
// 身份证号
export const regIdCard = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);