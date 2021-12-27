/**
 * 将 Base64 字符串转成 ArrayBuffer 对象
 * @param {string} str 要转化成 ArrayBuffer 对象的 Base64 字符串
 * @support 
 * 微信小程序支持情况说明：https://developers.weixin.qq.com/miniprogram/dev/api/base/wx.base64ToArrayBuffer.html
 * 
 * 基础库 1.1.0 开始支持，低版本需做兼容处理。
 *  
 * 本接口支持在小程序插件中使用
 * 
 * 从基础库 2.4.0 开始，本接口停止维护
 * 
 * uniapp支持情况说明：https://uniapp.dcloud.io/api/base64ToArrayBuffer?id=base64toarraybuffer
 * 
 * 支持 wecaht、app
 * @returns {ArrayBuffer}
 *
 * @example
 const base64 = 'test'
 const arrayBuffer = base64ToArrayBuffer(base64)
 */
const base64ToArrayBuffer = (str) => {
  return uni.base64ToArrayBuffer(str)
}
export { base64ToArrayBuffer }
