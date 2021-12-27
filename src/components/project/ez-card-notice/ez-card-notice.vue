<template>
  <view
    class="yh-card-intro-wrapper"
    v-if="renderData"
    :class="[noMargin ? 'no-margin' : '']"
  >
    <div class="yh-card-intro-img-box">
      <img :src="renderData.src" alt="" />
    </div>
    <div class="yh-card-intro-content" v-if="type !== 'policy'">
      <div class="yh-card-intro-title" v-if="renderData.title">
        {{ renderData.title }}
      </div>
      <div
        class="yh-card-intro-items"
        v-if="renderData.list && renderData.list.length > 0"
      >
        <block v-for="(item, index) in renderData.list" :key="index">
          <div class="yh-card-intro-item">
            <div class="yh-card-intro-item-title" v-if="item.title">
              {{ item.title }}
            </div>
            <div class="yh-card-intro-item-list">
              <block v-for="(item2, index2) in item.list" :key="index">
                <div class="yh-card-intro-item-list-item" v-if="item2.value">
                  <!--                  <span v-if="item2.symbol">{{
                    item2.symbol === 'point'
                      ? index2 + 1 + '、'
                      : '(' + index2 + ')'
                  }}</span> -->
                  <span v-html="showChange(item2, index2)"></span>
                </div>
              </block>
            </div>
          </div>
        </block>
      </div>
    </div>
    <div class="yh-card-intro-content" v-else>
      <div class="yh-card-intro-title" v-if="renderData.title">
        {{ renderData.title }}
      </div>
      <div
        class="yh-card-intro-items policy"
        v-if="renderData.list && renderData.list.length > 0"
      >
        <block v-for="(item, index) in renderData.list" :key="index">
          <ComponentPolicyDoc
            :renderData="item"
            isRequestYGSP
            v-if="index < showNum"
          ></ComponentPolicyDoc>
        </block>
        <div
          class="see-more d-f ai-c jc-c"
          v-if="renderData.list.length > 2"
          @click="handleViewMore"
        >
          <span>{{ showNum == 2 ? '查看更多' : '收起' }}</span>
          <div class="iconimg" :class="[showNum == 2 ? '' : 'active']"></div>
        </div>
      </div>
      <div class="yh-card-intro-items policy" v-else>
        <div class="text">暂无相关政策文件</div>
      </div>
    </div>
  </view>
</template>

<script>
import ComponentPolicyDoc from '@/components/project/ez-policy-doc/ez-policy-doc.vue'
/**
 * 申报须知卡片 组件
 * @description 申报须知卡片
 */
export default {
  name: 'ezCardNotice',
  props: {
    renderData: {
      type: [Object],
      default: () => {
        return null
      },
    },
    type: {
      type: [String],
      default: '',
    },
    noMargin: {
      type: [Boolean],
      default: false,
    },
  },
  components: {
    ComponentPolicyDoc,
  },
  data() {
    return {
      showNum: 2,
    }
  },
  created() {},
  mounted() {},
  methods: {
    showChange(value, index2) {
      if (value && value.value) {
        let arr = value.value.split('\n')
        if (arr.length > 1) {
          let html = ''
          arr.forEach((item, index) => {
            if (index === 0) {
              html = `<p>1、${item}</p>`
            } else {
              html += `<p>${item}</p>`
            }
          })
          return html
        } else {
          if (value.symbol) {
            if (value.symbol === 'point') {
              return index2 + 1 + '、' + value.value
            } else {
              return '(' + index2 + ')' + value.value
            }
          }
          return ''
        }
      } else {
        return ''
      }
    },
    // 相关政策 查看更多
    handleViewMore() {
      const showNum = this.showNum
      const renderData = this.renderData
      const data = [...renderData.list]
      const len = data.length
      if (showNum === 2) {
        this.showNum = len
      } else {
        this.showNum = 2
      }
    },
  },
  computed: {},
  watch: {},
}
</script>

<style lang="scss" scoped>
$space: 30rpx;
$border-radius: 16rpx;
.yh-card-intro-wrapper {
  width: 100%;
  margin-bottom: 32rpx;
  &.no-margin {
    margin: 0;
  }
}

.yh-card-intro-img-box {
  width: 100%;
  img {
    display: block;
    width: 100%;
    height: 272rpx;
  }
}
.yh-card-intro-content {
  width: 100%;
  color: #3d424d;
  background-color: #fff;
  border-bottom-right-radius: $border-radius;
  border-bottom-left-radius: $border-radius;
  overflow: hidden;
}
.yh-card-intro-title {
  font-size: 32rpx;
  line-height: 44rpx;
  font-weight: 700;
  text-align: center;
  // 28
  padding-top: $space;
  padding-bottom: 46rpx;
}
.yh-card-intro-items {
  padding-left: 52rpx;
  padding-right: 52rpx;
  font-size: 28rpx;
  line-height: 40rpx;
  &.policy {
    padding-left: 20rpx;
    padding-right: 20rpx;
    padding-bottom: 66rpx;
    color: $color;
    .text {
      padding-left: 32rpx;
    }
  }
}
.yh-card-intro-item {
  padding-bottom: 66rpx;
}
.yh-card-intro-item-title {
  padding-left: 22rpx;
  line-height: 1;
  font-weight: 500;
  margin-bottom: 32rpx;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 8rpx;
    height: 100%;
    background-color: #3883ef;
    border-radius: 2rpx;
    top: 0;
    left: 0;
  }
}
.yh-card-intro-item-list-item {
  margin-bottom: 24rpx;
}
.see-more {
  height: 92rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #3882ff;
  // border: 1px solid rgba(#3882ff, 0.06);
  .iconimg {
    transition: all 0.3s;
    width: 22rpx;
    height: 20rpx;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAAAXNSR0IArs4c6QAABDJJREFUWAntWE1oVFcU/u6b/CFKEtD+RbCFgl20UCiCmUlMoGqcLvoH/iyEtiCVWuyi0GqbRGMyIdWNtAuJbqRQrDTiwrZqQttEcZJV/dmVtlZpFaotqDGg4/je8btj7vS+1zczMXHi5g0M95zvnHvO9+49794zA0Sf8q6AMuEbe+VluOinPp/gvobn8OnAGuUa+2yOXSLOYAopCN4ThX9iDjam29Ww5vAf4R65JIKGPDGFIzULsXbkHXU7j82CkPxCqq/dwAGSfdOkI8k/x7apRVp3DEiHW3lZC4JXM39hqHW31PnwMirLP5Pa69cxaJOdTHfXpM0Tlgq8TXDcGPQoQHNmAiebe+VJGy+H3LpLnpjI4gRzttjxuboTzn1uOThfElqL98qLnofjZPq4PYnyxSqFlSc71W8B/KGojX3yrNzFEPM+Ywckuasx4JVT29TPBs+vsAZG29VZAgk6/mEcJsens0C6qVteCuAzVnMxs0gHyfLtulCp0GST1cl8hDUw2qnOz4khrhTOat18+EIucBWGc6eJAWc4Lu2R5Tomy+AxXyiFczXViIft6P8I64k/tqsrdbWsJYUROxBJzxMXRxtTstrGpyMnUrKWq/q9jmnP5+6emFuJlpGP1d82buRQwtp47AM1Xl+LVSR92DhPjlXi4WA8JZsC+JRVruxm1+PRBVT5JjFXXR3aftiqbvhwS+EDFf+s/kZil37BHm7bu0FPR2EHS6griBfTSVZfCO1BH5bg3rYObOpSygvabL0kYeO8tFt6KHcY3YwM0N/WifdLJdIPfvlX9PMU2mDmmpExunkxbDd6sXHKhHUQvZUcPucK+eZxdQ6x5tezjDJhyVr3Sw0voYPcpdcCds9xsHm0Q+0J4AVVX+KCXpYh3i3ruGdfEvLVH0n/5FTh9fQWddNyh74pMzdxhGSbbZz+GSZfz5I6ZOOl5AcmrAMmemWF5+IwScy1E5DEaVWD5OhH6mrOb6c85d3BcZ4EL9h+lMdjMT7cZEMTsBVVp0VYR4z3yRIvi6MU59sZGPB3HvgrvRgqXRdDJLvItrOYrihBkjV7xodPUZk2YR0/0SOLWR6DIaT+ZZ3zVkW9zYM7cJ4J2/TlZOMPIucJT7cf5iXSQHJ6258vlphkz8xxkNSXUjE/bSt7P9zUJ/VuFt+yphNhZEg29IUM852VfvjUJ+oaX78VJPZdkASxgYWLkQyeHkE/rc9qPzz2obpV3YQ32E4NkKSrv+TwFW+vdfypdSeMoI1F/XDUD7Meon446ofvl0HUD9vHo0+O+uGoH/YVhF+J+mH/ehTU8v1wQY8ShnL0w8VSFvwjpdgk2zbWoS7HKrCMT562cVtm56b74ZapNO/2vDB5xoR10IfVD4cRDGIzLgk7YOuwVNxO4wB/ZOb+PefPpq9XdeKtUn+y2DEi+VGvwD1HBULns0o8dgAAAABJRU5ErkJggg==);
    margin-left: 10rpx;
    &.active {
      transform: rotate(180deg);
    }
  }
}
</style>
