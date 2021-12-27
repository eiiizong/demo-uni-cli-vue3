/**
 * 获取系统信息
 * @support 
 * 微信小程序支持情况说明：https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfo.html
 * 
 * 本接口从基础库版本 1.9.6 起支持在小程序插件中使用
 * 
 * uniapp支持情况说明：https://uniapp.dcloud.io/api/system/info?id=getsysteminfo
 * 
 * @returns { Promise }
 * @example
  getSystemInfo().then(res => {
    // 接口调用成功
  }).catch(err => {
    // 接口调用失败
  }).finally((res) => {
    // 接口调用完成
  })
 */
const getSystemInfo = () => {
  return new Promise((resolve, reject) => {
    uni.getSystemInfo({
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.log('getSystemInfo 接口调用失败 => ', err)
        reject(err)
      },
    })
  })
}
export { getSystemInfo }
