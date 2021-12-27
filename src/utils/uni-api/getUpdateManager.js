/**
 * 本API返回全局唯一的版本更新管理器对象： updateManager，用于管理小程序更新。
 * @support 
 * uniapp支持情况说明：https://uniapp.dcloud.io/api/other/update?id=getupdatemanager
 * 不支持 APP 、H5
 * @returns {Promise}
 *
 * @example
  getUpdateManager()
 */
const getUpdateManager = () => {
  return uni.getUpdateManager();
}
export { getUpdateManager }
