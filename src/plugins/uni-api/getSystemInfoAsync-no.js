/**
 * 异步获取系统信息。需要一定的微信客户端版本支持，在不支持的客户端上，会使用同步实现来返回。只有微信小程序支持。uniapp暂无该接口介绍
 * @support 
 * 微信小程序支持情况说明：https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfoAsync.html
 * 
 * 基础库 2.14.1 开始支持，低版本需做兼容处理。
 * 
 * uniapp支持情况说明：暂不支持该接口
 * 
 * @returns { Promise }
 * @example
  getSystemInfoAsync().then(res => {
    // 接口调用成功
  }).catch(err => {
    // 接口调用失败
  }).finally((res) => {
    // 接口调用完成
  })
 */
const getSystemInfoAsync = () => {
  return new Promise((resolve, reject) => {
    uni.getSystemInfoAsync({
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.log('getSystemInfoAsync 接口调用失败 => ', err)
        reject(err)
      },
    })
  })
}
export { getSystemInfoAsync }
