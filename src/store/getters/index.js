import { USER_INFO } from "@/store/constants/index.js";

const getters = {
  // 获取用户信息
  [USER_INFO](state) {
    return state.userInfo;
  },
};

export default getters;
