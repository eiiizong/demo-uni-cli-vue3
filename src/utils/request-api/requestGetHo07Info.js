import { request } from '@/utils/uni-api/index.js'

/**
 * 通过身份证号码查询建档立卡信息
 * @param {String} aac002 身份证号
 * @param {String} aac003 姓名
 * @param {String} chi031 补贴项目编码
 * @param {Boolean} isLoading 是否显示加载中 默认 true
 * @param {Boolean} showErrorToast 是否显示错误提示 默认 true
 * @returns 
 */
const requestGetHo07Info = (aac002, aac003, chi031, isLoading = true, showErrorToast = true) => {
    const data = {
        businessName: "查询建档立卡信息",
        methodName: 'getHo07Info',
        aac002,
        aac003,
        chi031
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
export { requestGetHo07Info }
