<template>
  <div class="page page-home">
    <template>home</template>
    {{userInfo.userName}}
  </div>
</template>
<script>
import ComponentPanel from "@/components/common/ez-panel/ez-panel.vue";

import { navigateTo, showModal, request } from "@/utils/uni-api"; // 封装过后的api，推荐使用。方便以后统一修改，便于维护。

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
  onShow() {},
  onHide() {},
  methods: {},
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
  background-color: #f0f;
}
</style>
