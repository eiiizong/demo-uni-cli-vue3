import { getIsDevEnv } from "@/utils/get";

/**
 * 发起 HTTPS 网络请求
 * @param {string} url 开发者服务器接口地址
 * @param {object|string|ArrayBuffer} data 请求的参数
 * @param {object} header [{}] 设置请求的 header，header 中不能设置 Referer。content-type 默认为 application/json
 * @param {string} method [GET] HTTP 请求方法。可取值 OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT
 * @param {number} timeout [60000] 超时时间，单位为毫秒。2.10.0开始支持
 * @param {string} dataType [json] 返回的数据格式。可取值 josn、其他。如果设为 json，会尝试对返回的数据做一次 JSON.parse
 * @param {string} responseType [text]  响应的数据类型。可取值 text、arraybuffer。支付宝小程序不支持
 * @support
 * 微信小程序支持情况说明：https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
 *
 * uniapp支持情况说明：https://uniapp.dcloud.io/api/request/request?id=request
 *
 * @returns { Promise }
 * @example
  request('test').then(res => {
    // 接口调用成功
  }).catch(err => {
    // 接口调用失败
  }).finally((res) => {
    // 接口调用完成
  })
*/
const request = (
  url,
  data = {},
  header = {},
  method = "GET",
  timeout = 60000,
  dataType = "json",
  responseType = "text"
) => {
  // 当前环境是否为开发环境
  const isDevEnv = getIsDevEnv();
  if (!url) {
    console.error("request 接口调用缺失必要参数 url，请检查！", err);
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      data,
      header,
      method,
      timeout,
      dataType,
      responseType,
      success(res) {
        resolve(res);
      },
      fail(err) {
        if (isDevEnv) {
          console.error("request 接口调用失败 => ", err);
        }
        reject(err);
      }
    });
  });
};

export { request };
