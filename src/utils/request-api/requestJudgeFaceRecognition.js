import { request } from '@/utils/uni-api/index.js'

/**
 * 查询是否跳过人脸识别
 * @param {String} aac002 身份证号
 * @param {String} aac003 姓名
 * @param {Boolean} isLoading 是否显示加载中 默认 true
 * @param {Boolean} showErrorToast 是否显示错误提示 默认 true
 * @returns 
 */
const requestJudgeFaceRecognition = (aac002, aac003, isLoading = true, showErrorToast = true) => {
    const data = {
        businessName: "查询是否跳过人脸识别",
        methodName: 'judgeFaceRecognition',
        aac002,
        aac003,
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
export { requestJudgeFaceRecognition }
