/**
 * 判断应用的 API，回调，参数，组件等是否在当前版本可用。
 * @param {string} str 使用 ${API}.${method}.${param}.${options} 或者 ${component}.${attribute}.${option} 方式来调用
 *
 * ${API} 代表 API 名字
 *
 * ${method} 代表调用方式，有效值为return, success, object, callback
 *
 * ${param} 代表参数或者返回值
 *
 * ${options} 代表参数的可选值
 *
 * ${component} 代表组件名字
 *
 * ${attribute} 代表组件属性
 *
 * ${option} 代表组件属性的可选值
 * @support 
 * 微信小程序支持情况说明：https://developers.weixin.qq.com/miniprogram/dev/api/base/wx.canIUse.html
 * 
 * 基础库 1.1.1 开始支持，低版本需做兼容处理。https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html
 * 
 * uniapp支持情况说明：https://uniapp.dcloud.io/api/system/info?id=caniuse
 * 
 * 不支持 h5
 * @returns {boolean} 当前版本是否可用
 *
 * @example
 canIUse('request.object.method.GET');
 canIUse('button.open-type.contact');
 */
const canIUse = (str) => {
  return uni.canIUse(str)
}
export { canIUse }
