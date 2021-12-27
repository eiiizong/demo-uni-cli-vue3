import {
  request,
  login,
  setStorage,
  removeStorage,
  showModal,
  navigateTo,
} from '~/plugins/uni-api/index.js'
import config from '@/config/index'
/**
 * 自定义登录 业务逻辑请自行更改
 * @param {Boolean} showTip [true] 用户未登录时 是否进行提示
 * @returns {Promise}
 *
 * @example
  customLogin().then(res => {
    // 登录成功
  }).catch(err => {
    // 登录失败
  }).finally((res) => {
    // 接口调用完成
  })
 */
const customLogin = (showTip = true) => {
  const { constants } = config
  return new Promise((resolve, reject) => {
    login()
      .then((res) => {
        const { code } = res
        if (code) {
          const data = {
            code,
            userType: '1',
            appIndex: constants.PROGRAM_TYPE || '0',
          }
          request('/frontRestService/frontLoginRestService/getOpenId', data)
            .then((res) => {
              const { openid, session_key, sessionId, wxUserInfo } = res.data
              if (sessionId) {
                setStorage(config.constants.SESSION_ID, sessionId)
              } else {
                removeStorage(config.constants.SESSION_ID)
              }
              if (wxUserInfo) {
                resolve({
                  ...wxUserInfo,
                  session_key,
                  sessionId,
                  openid,
                  user_id: openid,
                })
              } else {
                let routes = getCurrentPages()
                let curRoute = routes[routes.length - 1].route
                // 没有绑定信息 未登录 并也不为扫码后进入的家庭成员加入页面
                if (
                  showTip &&
                  curRoute !== 'pages/packageHome/home-add/home-add'
                ) {
                  if (!openid) {
                    showModal('openid 数据解析失败，请联系管理员！')
                  } else {
                    showModal(
                      '检测到您还未进行登录验证，点击确定按钮进行登录验证！',
                      '提示',
                      true
                    )
                      .then((res) => {
                        if (res) {
                          navigateTo('login', 'packageCommon')
                        }
                      })
                      .finally(() => {
                        resolve({
                          openid,
                          session_key: encodeURIComponent(session_key),
                        })
                      })
                  }
                } else {
                  resolve({
                    openid,
                    session_key: encodeURIComponent(session_key),
                  })
                }
              }
            })
            .catch((err) => {
              reject(err)
            })
        }
      })
      .catch((err) => {})
  })
}
export { customLogin }
