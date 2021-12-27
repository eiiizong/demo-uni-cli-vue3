import { getIsDevEnv } from "@/utils/get";

/**
 * 隐藏 loading 提示框
 * @support
 * 微信小程序支持情况说明：https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideLoading.html
 *
 * uniapp支持情况说明：https://uniapp.dcloud.io/api/ui/prompt?id=hideloading

 * @returns {Promise}
 *
 * @example
  hideLoading()
 */
const hideLoading = () => {
  // 当前环境是否为开发环境
  const isDevEnv = getIsDevEnv();
  // #ifdef MP-ALIPAY
  // #endif

  return new Promise((resolve, reject) => {
    uni.hideLoading({
      success(res) {
        resolve(res);
      },
      fail(err) {
        if (isDevEnv) {
          console.error("hideLoading 接口调用失败 => ", err);
        }
        reject(err);
      }
    });
  });
};
export { hideLoading };
