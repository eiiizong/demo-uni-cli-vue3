import { request } from '@/utils/uni-api/index.js'

/**
 * 获取个人相关的村庄信息
 * @param {String} aac002 身份证号
 * @param {Boolean} isLoading 是否显示加载中 默认 true
 * @param {Boolean} showErrorToast 是否显示错误提示 默认 true
 * @returns 
 */
const requestGetPersonalInfo = (aac002, isLoading = true, showErrorToast = true) => {
    const data = {
        businessName: '获取个人相关的村庄信息',
        methodName: 'getPersonalInfo',
        aac002,
    }
    return new Promise((resolve, reject) => {
        request(
            '/frontRestService/frontBcpDataRestService/getWebServiceData',
            data,
            {},
            isLoading,
            showErrorToast
        ).then((res) => {
            const { fieldData } = res
            if (fieldData) {
                resolve(fieldData)
            } else {
                reject(res)
            }
        }).catch(err => {
            reject(err)
        })
    })
}
export { requestGetPersonalInfo }
