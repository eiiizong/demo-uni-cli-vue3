import config from '@/config/index.js'
// import { Decrypt } from '@/utils/AES.js'
import { showModal, showLoading, hideLoading, getStorageSync } from './index'
import { getIsDevEnv } from '~/plugins/big/utils/get'
/**
 * 发起 HTTPS 网络请求
 * @param {string} url 开发者服务器接口地址，已默认加上前缀
 * @param {object|string|ArrayBuffer} data 请求的参数
 * @param {object} header [{}] 设置请求的 header，header 中不能设置 Referer。content-type 默认为 application/json
 * @param {boolean} loading [true] 请求数据时显示加载中
 * @param {boolean} showErrorToast [true] 是否显示错误提示
 * @param {string} method [POST] HTTP 请求方法。可取值 OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT
 * @param {number} timeout [10000] 超时时间，单位为毫秒。2.10.0开始支持
 * @param {string} dataType [json] 返回的数据格式。可取值 josn、其他。如果设为 json，会尝试对返回的数据做一次 JSON.parse
 * @param {string} responseType [text]  响应的数据类型。可取值 text、arraybuffer。1.7.0开始支持
 * @param {boolean} enableHttp2 [false] 开启 http2。2.10.0开始支持。
 * @param {boolean} enableQuic [false] 开启 quic。2.10.0开始支持。
 * @param {boolean} enableCache [false] 开启 cache。2.10.0开始支持。
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
  loading = true,
  showErrorToast = true,
  method = 'POST',
  timeout = 60000,
  dataType = 'json',
  responseType = 'text',
  enableHttp2 = false,
  enableQuic = false,
  enableCache = false
) => {
  // 当前环境是否为开发环境
  const isDev = getIsDevEnv()

  // return new Promise((resolve, reject) => {
  //   if (loading) {
  //     showLoading()
  //   }
  //   // 字符串中是否含有“http”或者“https”的正则验证表达式
  //   const httpExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
  //   // 路径是否带有“http”或者“https”
  //   const isHttpUrl = httpExp.test(url)

  //   // 没有请求地址时 默认添加
  //   if (!url) {
  //     url = '/frontRestService/frontBcpDataRestService/getWebServiceData'
  //   }

  //   // 不是以http/https开头的路径
  //   if (!isHttpUrl) {
  //     url = config.requestUrl + url
  //   }
  //   header = {
  //     ...config.requestHeader,
  //     ...header,
  //   }
  //   data = {
  //     ...config.requestData,
  //     sessionId: encodeURIComponent(
  //       getStorageSync(config.constants.SESSION_ID)
  //     ),
  //     businessCode: data.methodName,
  //     businessType: '2',
  //     // #ifdef H5
  //     chm301: '02', // 02 网厅申报 03 微信申报 04 线下批量申报 07 支付宝
  //     chw017: '02',
  //     // #endif
  //     // #ifdef MP-ALIPAY
  //     chm301: '07', // 02 网厅申报  03 微信申报 04 线下批量申报 07 支付宝
  //     chw017: '05',
  //     // #endif
  //     // #ifdef MP-WEIXIN
  //     chm301: '03', // 02 网厅申报 03 微信申报 04 线下批量申报 07 支付宝
  //     chw017: '01',
  //     // #endif
  //     ...data,
  //   }
  //   uni.request({
  //     url,
  //     data,
  //     header,
  //     method,
  //     timeout,
  //     dataType,
  //     responseType,
  //     enableHttp2,
  //     enableQuic,
  //     enableCache,
  //     success(res) {
  //       const { isOpenDataEncrypt } = config
  //       let resData = res.data // 服务器返回的数据
  //       // 开启数据加密
  //       if (isOpenDataEncrypt) {
  //         resData = Decrypt(resData)
  //         resData = JSON.parse(resData)
  //       }
  //       // 请求成功 状态码为 200
  //       if (res.statusCode === 200 && resData) {
  //         const { resultData } = resData.data
  //         if (resultData.code === '-1') {
  //           if (isDev) {
  //             console.log(
  //               `
  //               请求成功，服务器返回错误！
  //               请求地址：${url},
  //               请求的 data 数据:
  //               `,
  //               data,
  //               `
  //               服务器的返回的 resultData 数据:
  //               `,
  //               resultData
  //             )
  //           }
  //           if (showErrorToast) {
  //             reject(resultData)
  //             showModal(resultData.message)
  //           } else {
  //             reject(resultData)
  //           }
  //         } else {
  //           if (isDev) {
  //             console.log(
  //               `
  //               请求成功！
  //               请求地址：${url},
  //               请求的 data 数据:
  //               `,
  //               data,
  //               `
  //               服务器的返回的 resultData 数据:
  //               `,
  //               resultData
  //             )
  //           }
  //           resolve(resultData)
  //         }
  //       } else {
  //         if (isDev) {
  //           console.log(
  //             `
  //             request 接口调用成功，数据格式错误！
  //             请求地址：${url},
  //             请求的 data 数据:
  //             `,
  //             data,
  //             `
  //             调用失败返回的 res 数据:
  //             `,
  //             res
  //           )
  //         }
  //         reject(res)
  //       }
  //     },
  //     fail(err) {
  //       if (isDev) {
  //         console.log(
  //           `
  //           request 接口调用失败！
  //           请求地址：${url},
  //           请求的 data 数据:
  //           `,
  //           data,
  //           `
  //           调用失败返回的 err 数据:
  //           `,
  //           err
  //         )
  //       }
  //       reject(err)
  //     },
  //     complete() {
  //       if (loading) {
  //         hideLoading()
  //       }
  //     },
  //   })
  // })
}

export { request }
