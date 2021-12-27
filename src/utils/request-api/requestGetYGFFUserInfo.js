import { request } from '@/utils/uni-api/index.js'

/**
 * 获取用户发放系统岗位信息
 * @param {String} aac002 身份证号
 * @param {Boolean} isLoading 是否显示加载中 默认 true
 * @param {Boolean} showErrorToast 是否显示错误提示 默认 true
 * @returns
 */
const requestGetYGFFUserInfo = (
  aac002,
  isLoading = true,
  showErrorToast = true
) => {
  const data = {
    methodName: 'getYGFFUserInfo',
    aac002,
  }
  return new Promise((resolve, reject) => {
    request(
      '/frontRestService/frontBcpDataRestService/getWebServiceData',
      data,
      {},
      isLoading,
      showErrorToast
    )
      .then((res) => {
        const { fieldData } = res
        if (fieldData) {
          let { orgnamepath, position } = fieldData
          if (orgnamepath) {
            orgnamepath = orgnamepath.split('/').join('')
          }

          let positionName = ''
          position = JSON.parse(position)
          const len = position.length

          if (position && len > 0) {
            let arr = []
            position.map((item) => {
              arr.push(item.positionname)
            })
            positionName = arr.join(',')
          }
          resolve({
            positionName,
            orgnamepath,
          })
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export { requestGetYGFFUserInfo }
