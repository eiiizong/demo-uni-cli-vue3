import config from '@/config'
import { getIsDev } from '@/utils/get/index'
import { showModal } from '@/utils/uni-api/index.js'
/**
 * 获取地址发放接口 getOrgNextLevelList 传递的参数
 */
const getOrgNextLevelListParams = () => {
  // 当前环境是否为开发环境
  const isDev = getIsDev()
  const { areaCode } = config
  let params = {
    methodName: 'getOrgNextLevelList',
    orglevel: '2',
  }
  switch (areaCode) {
    // 成都
    case '510100':
      params = {
        ...params,
        orgid: '1',
        orglevel: '0',
      }
      break
    // 自贡
    case '510300':
      params = {
        ...params,
        orgid: '1',
        orglevel: '0',
      }
      break
    // 攀枝花
    case '510400':
      params = {
        ...params,
        orgid: '510499',
        orglevel: '2',
      }
      break
    // 泸州
    case '510500':
      params = {
        ...params,
        orgid: '1678510',
        orglevel: '1',
      }
      break
    // 遂宁
    case '510900':
      params = {
        ...params,
       orgid: '1',
      }
      break
    // 内江
    case '511000':
      params = {
        ...params,
        orgid: '114064',
      }
      break
    // 南充
    case '511300':
      params = {
        ...params,
        orgid: '1',
      }
      break
    // 宜宾
    case '511500':
      params = {
        ...params,
        orgid: '511500',
      }
      break
    // 广安
    case '511600':
      params = {
        ...params,
        orgid: '1',
        orglevel: '2',
      }
      break
    // 达州
    case '511700':
      params = {
        ...params,
        orgid: '511799',
      }
      break
    // 雅安
    case '511800':
      params = {
        ...params,
        orgid: '1',
        orglevel: '2',
      }
      break
    // 巴中
    case '511900':
      params = {
        ...params,
        orgid: '1',
        orglevel: '2',
      }
      break
    // 资阳
    case '512000':
      params = {
        ...params,
        orgid: '512000',
      }
      break
    // 阿坝
    case '513200':
      params = {
        ...params,
        orgid: '1',
        orglevel: '2',
      }
      break
    // 甘孜
    case '513300':
      params = {
        ...params,
        orgid: '513300',
      }
      break
    default:
      if (isDev) {
        showModal(
          '该地市还未整合' + ' getOrgNextLevelList 接口' + '，请联系管理员！'
        )
      }
      break
  }
  return params
}

export { getOrgNextLevelListParams }
