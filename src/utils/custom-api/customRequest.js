import config from "@/config";
import {
  showModal,
  showLoading,
  hideLoading,
  request
} from "@/plugins/uni-api";
import { getIsDevEnv } from "@/utils/get";

/**
 * 自定义发起 HTTPS 网络请求
 * @param {string} url 开发者服务器接口地址，已默认加上前缀
 * @param {object} data 请求的参数
 * @param {object} header [{}] 设置请求的 header，header 中不能设置 Referer。content-type 默认为 application/json
 * @param {boolean} isShowLoading [true] 请求数据时显示加载中
 * @param {boolean} showErrorToast [true] 是否显示错误提示
 * @param {string} method [POST] HTTP 请求方法。可取值 OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT
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
const customRequest = (
  url,
  data = {},
  header = {},
  isShowLoading = true,
  showErrorToast = true,
  method = "POST",
  timeout = 60000
) => {
  // 当前环境是否为开发环境
  const isDevEnv = getIsDevEnv();

  return new Promise((resolve, reject) => {
    // 没有请求地址时 终止程序
    if (!url) {
      showModal("uni request接参数url必须传入，请检查！");
      reject(false);
    }

    // 是否显示数据加载中
    if (isShowLoading) {
      showLoading();
    }

    // 字符串中是否含有“http”或者“https”的正则验证表达式
    const httpExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    // 路径是否带有“http”或者“https”
    const isHttpUrl = httpExp.test(url);

    // 不是以http/https开头的路径
    if (!isHttpUrl) {
      url = config.requestUrl + url;
    }
    // 合并 header
    header = {
      ...config.requestHeader,
      ...header
    };
    // 合并 data
    data = {
      ...config.requestData,
      ...data
    };
    request(url, data, header, method, timeout)
      .then(res => {
        let resData = res.data; // 服务器返回的数据

        // 请求成功 状态码为 200
        if (res.statusCode === 200 && resData) {
          const { resultData } = resData.data;
          if (resultData.code === "-1") {
            if (isDevEnv) {
              console.log(
                `
                服务器返回错误！
                请求地址：${url},
                请求的 data 数据:
                `,
                data,
                `
                服务器的返回的 resultData 数据:
                `,
                resultData
              );
            }
            if (showErrorToast) {
              showModal(resultData.message);
              reject(resultData);
            } else {
              reject(resultData);
            }
          } else {
            if (isDevEnv) {
              console.log(
                `
                请求成功！
                请求地址：${url},
                请求的 data 数据:
                `,
                data,
                `
                服务器的返回的 resultData 数据:
                `,
                resultData
              );
            }
            resolve(resultData);
          }
        } else {
          if (isDevEnv) {
            console.log(
              `
              接口调用成功，数据格式错误！
              请求地址：${url},
              请求的 data 数据:
              `,
              data,
              `
              调用失败返回的 res 数据:
              `,
              res
            );
          }
          reject(res);
        }
      })
      .catch(err => {
        if (isDevEnv) {
          console.log(
            `
            接口调用失败！
            请求地址：${url},
            请求的 data 数据:
            `,
            data,
            `
            调用失败返回的 err 数据:
            `,
            err
          );
        }
        reject(err);
      })
      .finally(() => {
        if (isShowLoading) {
          hideLoading();
        }
      });
  });
};

export { customRequest };
