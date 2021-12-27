import { getIsDevEnv } from "@/utils/get";
import { M_UPDATE_USER_INFO } from "@/store/constants/index.js";

// 当前环境是否为开发环境
const isDev = getIsDevEnv();

const mutations = {
  // 更新用户信息
  [M_UPDATE_USER_INFO](state, data) {
    // 存在数据
    if (data) {
      state.userInfo = { ...state.userInfo, ...data };
    } else {
      // 针对 null 用于清空用户数据
      state.userInfo = {};
    }
    if (isDev) {
      console.log("正在改变全局状态的 userInfo 追加后的值: ", state.userInfo);
    }
  }
};

export default mutations;
