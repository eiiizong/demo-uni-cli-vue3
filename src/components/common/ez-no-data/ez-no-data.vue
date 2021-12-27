<template>
  <div class="ez-no-data-wrapper">
    <img src="../../../static/images/components/no-data/search-result.png" alt="" />
    <span class="tip">{{ tip }}</span>
  </div>
</template>

<script>
/**
 * 没有数据默认提示
 */

export default {
  name: 'ezNoData',
  components: {},
  props: {
    // 头像url路径
    tip: {
      type: [String],
      default: '暂无数据',
    },
  },
  data() {
    return {}
  },

  created() {},
  methods: {},
  computed: {},
  watch: {},
}
</script>
<style lang="scss" scoped>
.ez-no-data-wrapper {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  img {
    width: 320rpx;
    height: 320rpx;
    margin: auto;
  }
  .tip {
    font-size: 26rpx;
    line-height: 1.5;
    color: $color-placeholder;
    padding-bottom: 30rpx;
  }
}

</style>
