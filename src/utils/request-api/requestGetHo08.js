import { request } from '@/utils/uni-api/index.js'

/**
 * 通过身份证号码得到残疾信息
 * @param {String} aac002 身份证号
 * @param {Boolean} isLoading 是否显示加载中 默认 true
 * @param {Boolean} showErrorToast 是否显示错误提示 默认 true
 * @returns 
 */
const requestGetHo08 = (aac002, isLoading = true, showErrorToast = true) => {
    const data = {
        businessName: "查询残疾信息",
        methodName: 'getHo08',
        aac002,
    }
    return new Promise((resolve, reject) => {
        request(
            '/frontRestService/frontBcpDataRestService/getWebServiceDataTwo',
            data,
            {},
            isLoading,
            showErrorToast
        ).then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })

}
export { requestGetHo08 }
