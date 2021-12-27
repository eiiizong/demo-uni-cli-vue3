<template>
  <view class="ez-policy-doc-wrapper" @click="handleClick">
    <div class="name">{{ renderData.chi051 }}</div>
    <div class="info">
      <div class="unit">{{ getUnitStr }}</div>
      <div class="time">{{ getTime }}</div>
    </div>
  </view>
</template>

<script>
import config from '@/config'
import {
  previewPDFWeixin,
  previewPDFAlipay,
  previewPDFH5,
} from '@/utils/custom-api/index'
/**
 * 政策文件渲染item
 * @description 政策文件渲染item
 */
export default {
  name: 'ezPolicyDoc',
  props: {
    // 渲染数据
    renderData: {
      type: [Object],
      default: () => {
        return {
          // chi031: '28',
          // chi037: '6',
          // chi037_desc: '卫生健康局',
          // chi050: '10307',
          // chi051:
          //   '计生委关于调整全国农村部分计划生育家庭奖励扶助和计划生育家庭特别扶助标准的通知',
          // chi052: '2019-03-06 15:23:11.0',
          // chi053: '115485',
          // chi054: '',
          // myrownum: '1',
          // yab003: '511011',
          // yab003_desc: '东兴区',
        }
      },
    },
    // 是否请求审批系统
    isRequestYGSP: {
      type: [Boolean],
      default: false,
    },
  },
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      const { isRequestYGFF } = config
      const isRequestYGSP = this.isRequestYGSP
      const { chi050, chi051, chi056 } = this.renderData
      // #ifdef MP-WEIXIN
      previewPDFWeixin(chi050, 'pdf', chi056, isRequestYGSP)
      // #endif
      // #ifdef MP-ALIPAY
      previewPDFAlipay(chi050, 'pdf', chi056, isRequestYGSP)
      // #endif
      // #ifdef H5
      previewPDFH5(
        chi050,
        chi056,
        isRequestYGSP ? 'ygsp' : isRequestYGFF ? 'ygff' : 'ygsp'
      )
      // #endif
    },
  },
  computed: {
    getTime() {
      const data = this.renderData
      let str = ''
      str = data.chi052.substr(0, 10)
      return str
    },
    getUnitStr() {
      const { isRequestYGFF } = config
      const isRequestYGSP = this.isRequestYGSP
      const renderData = this.renderData
      let str = ''
      // 优先拦截 优先考虑传参
      if (isRequestYGSP) {
        if (renderData.chi037desc) {
          str = renderData.chi037desc
          if (renderData.yab003desc) {
            str = str + '(' + renderData.yab003desc + ')'
          }
        }
        return str
      }
      if (!isRequestYGFF) {
        if (renderData.chi037desc) {
          str = renderData.chi037desc
          if (renderData.yab003desc) {
            str = str + '(' + renderData.yab003desc + ')'
          }
        }
      } else {
        str = renderData.chi037_desc
      }
      return str
    },
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
.ez-policy-doc-wrapper {
  width: 100%;
  position: relative;
  padding: 0 $spacing;
  height: 214rpx;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    left: 0;
    height: 80px;
    background-image: linear-gradient(180deg, #f6f7f8 0%, #ffffff 100%);
    z-index: $z-index;
  }
  .name {
    padding-top: 24rpx;
    position: relative;
    z-index: $z-index-position;
    font-size: 28rpx;
    line-height: 42rpx;
    height: 106rpx;
    font-weight: 500;
    color: $color;
    @include textOverflow(2);
  }
  .info {
    position: relative;
    padding-top: 18rpx;
    z-index: $z-index-position;
    display: flex;
    justify-content: space-between;
    color: $color-placeholder;
    font-size: 24rpx;
    .unit {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
