<template>
  <div class="page page-my">
    <template>my</template>
  </div>
</template>
<script>
import ComponentPanel from "@/components/common/ez-panel/ez-panel.vue";

import { navigateTo, showModal } from "@/plugins/uni-api";

import { USER_INFO } from "@/store/constants"; // 常量
import { mapGetters } from "vuex";

export default {
  name: "pageTabbarMy",
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
