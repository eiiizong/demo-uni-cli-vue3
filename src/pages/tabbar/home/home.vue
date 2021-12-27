<template>
  <view class="page page-home">
    <!-- <scroll-view scroll-x>

      <template>home</template>
      {{ userInfo.userName }}
    </scroll-view> -->
    <view>132</view>
    <view>132</view>
    <view>13</view>
    <view>78</view>
    <view>99</view>
    <view>136</view>
    <view>135</view>
    <view>134</view>
  </view>
</template>
<script>
import ComponentPanel from "@/components/common/ez-panel/ez-panel.vue";

import { to } from "@/utils/tool";
import { navigateTo, showModal } from "@/plugins/uni-api";
import { requestGetBankInfo } from "@/server";

import { USER_INFO } from "@/store/constants"; // 常量
import { mapGetters } from "vuex";

export default {
  name: "pageTabbarHome",
  components: {},
  data() {
    return {};
  },
  setup() {},
  onLoad(e) {},
  onReady() {},
  onShow() {
    // this.requestData();
  },
  onHide() {},
  methods: {
    // 请求数据
    async requestData() {
      const bankInfo = await to(
        requestGetBankInfo("510902199507236534", "曾小明")
      );
      console.log("bankInfo", bankInfo);
    }
  },
  computed: {
    ...mapGetters([USER_INFO])
  },
  watch: {
    "userInfo.user_id": {
      handler(val) {
        if (val) {
        }
      },
      immediate: true
    }
  },
  // 分享给朋友
  onShareAppMessage(e) {
    return {};
  },
  // 分享到朋友圈
  onShareTimeline(e) {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.page-home {
  // background-color: #f0f;
  view {
    height: 600rpx;
  }
}
</style>
