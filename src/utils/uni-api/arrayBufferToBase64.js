/**
 * 将 ArrayBuffer 对象转成 Base64 字符串
 * @param {ArrayBuffer} arrayBuffer 要转换成 Base64 字符串的 ArrayBuffer 对象
 * @support 
 * 微信小程序支持情况说明：https://developers.weixin.qq.com/miniprogram/dev/api/base/wx.arrayBufferToBase64.html
 * 
 * 基础库 1.1.0 开始支持，低版本需做兼容处理。
 *  
 * 本接口支持在小程序插件中使用
 * 
 * 从基础库 2.4.0 开始，本接口停止维护
 * 
 * uniapp支持情况说明：https://uniapp.dcloud.io/api/arrayBufferToBase64?id=arraybuffertobase64
 * 
 * 支持 wecaht、app
 * @returns {string}
 *
 * @example
 const arrayBuffer = new Uint8Array([55, 55, 55])
 const base64 = arrayBufferToBase64(arrayBuffer)
 */
const arrayBufferToBase64 = (arrayBuffer) => {
  return uni.arrayBufferToBase64(arrayBuffer)
}
export { arrayBufferToBase64 }
