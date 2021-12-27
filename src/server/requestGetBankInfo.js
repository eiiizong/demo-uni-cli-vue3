import { customRequest } from "@/utils/custom-api";

/**
 * 获取个人社保卡信息
 * @param {String} aac002 身份证号
 * @param {String} aac003 姓名
 * @param {Boolean} isLoading 是否显示加载中 默认 true
 * @param {Boolean} showErrorToast 是否显示错误提示 默认 true
 * @returns
 */
const requestGetBankInfo = (
  aac002,
  aac003,
  isLoading = true,
  showErrorToast = true
) => {
  const data = {
    methodName: "getBankInfo",
    aac002,
    aac003,
    chw017: "01"
  };
  return new Promise((resolve, reject) => {
    customRequest(
      "/frontRestService/frontBcpDataRestService/getWebServiceDataTwo",
      data,
      {},
      isLoading,
      showErrorToast
    )
      .then(res => {
        const { list } = res.lists.bankInfoList;
        if (list) {
          const SSCInfo = list[0];
          resolve(SSCInfo);
        } else {
          reject(res);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
export { requestGetBankInfo };
