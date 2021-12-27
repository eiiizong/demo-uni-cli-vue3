/**
 * copy
 * @param {string} str 要转化成 ArrayBuffer 对象的 Base64 字符串
 * @support 
 * 微信小程序支持情况说明：https://developers.weixin.qq.com
 * 
 * uniapp支持情况说明：https://uniapp.dcloud.io

 * @returns {Promise}
 *
 * @example
  copy().then(res => {
    // 接口调用成功
  }).catch(err => {
    // 接口调用失败
  }).finally((res) => {
    // 接口调用完成
  })
 */
const copy = (str) => {
  // 当前环境是否为开发环境
  const isDev = process.env.NODE_ENV === 'development'
  // #ifdef MP-ALIPAY
  // #endif
  return new Promise((resolve, reject) => {
    uni.copy({
      success(res) {
        resolve(res)
      },
      fail(err) {
        if (isDev) {
          console.log('copy 接口调用失败 => ', err)
        }
        reject(err)
      },
    })
  })
}
export { copy }
