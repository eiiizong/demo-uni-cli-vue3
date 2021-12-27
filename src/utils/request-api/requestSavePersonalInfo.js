import { request } from '@/utils/uni-api/index.js'

/**
 * 保存个人地址信息
 * @param {String} params 参数
 * @param {Boolean} isLoading 是否显示加载中 默认 true
 * @param {Boolean} showErrorToast 是否显示错误提示 默认 true
 * @returns 
 */
const requestSavePersonalInfo = (params, isLoading = true, showErrorToast = true) => {
    // const params_mock = {
    //     aac003, // 姓名
    //     aac002, // 身份证号
    //     aae005, // 电话号码
    //     chb015, // 区县编码
    //     chb017, // 乡镇编码
    //     chb018, // 村编码
    //     aac021, // 户籍地址
    // }
    const data = {
        methodName: 'savePersonalInfo',
        operationType: 2,
        ...params
    }
    return new Promise((resolve, reject) => {
        request(
            '/frontRestService/frontBcpDataRestService/getWebServiceData',
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
export { requestSavePersonalInfo }
