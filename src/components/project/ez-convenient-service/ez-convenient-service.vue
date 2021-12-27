<template>
  <view class="ez-convenient-service-wrapper">
    <div class="service-items">
      <block
        v-for="(item, index) in convenientServiceRenderData"
        :key="item.id"
      >
        <div
          class="item"
          :class="['item_' + index, item.disabled ? 'disabled' : '']"
          @click="handleJumpRoute(index)"
        >
          <h3>{{ item.title }}</h3>
          <div class="desc">
            {{ item.desc }}
          </div>
          <img
            :src="item.imageSrc"
            :style="{
              width: item.imageWidth,
              height: item.imageHeight,
            }"
          />
        </div>
      </block>
    </div>
  </view>
</template>

<script>
import imageFwwd from './images/fwwd.png'
import imageZnkh from './images/znkf.png'

import config from '@/config'
import { navigateTo, showModal, switchTab } from '@/utils/uni-api'
import { USER_INFO } from '@/store/constants' // 常量
import { mapGetters } from 'vuex'
/**
 * 热门服务
 * @description 热门服务
 */
export default {
  name: 'ezConvenientService',
  props: {
    renderData: {
      type: [Array],
      default: () => {
        return []
      },
    },
  },
  components: {},
  data() {
    return {
      // 便捷服务渲染数据
      convenientServiceRenderData: [],
    }
  },
  created() {},
  mounted() {
    this.handleInitData()
  },
  methods: {
    // 初始化数据
    handleInitData() {
      let convenientServiceRenderData = [
        {
          id: '01',
          title: '服务网点',
          imageSrc: imageFwwd,
          imageWidth: '60rpx',
          imageHeight: '60rpx',
          desc: '便捷办理',
          disabled: false,
          name: 'service-network',
          packageName: 'packageCommon',
          isMustLogin: false,
        },
        {
          id: '02',
          title: '智能客服',
          imageSrc: imageZnkh,
          imageWidth: '60rpx',
          imageHeight: '60rpx',
          desc: '老年人关怀服务区',
          disabled: false,
          name: 'customer-service',
          packageName: 'packageMasses',
          isMustLogin: true,
        },
      ]

      this.convenientServiceRenderData = [...convenientServiceRenderData]
    },
    // 跳转路由
    handleJumpRoute(index) {
      const { closePages } = config
      const { user_id, openid } = this.userInfo
      
      const item = this.convenientServiceRenderData[index]
      const { name, packageName, params, isMustLogin } = item

      const jumpRoute = (name, packageName, params) => {
        // 跳转 tababr 页面
        if (packageName === 'tabbar') {
          switchTab(name)
        } else {
          // 跳转 非tababr 页面
          navigateTo(name, packageName, params)
        }
      }

      // 跳转路由检测
      const jumpRouteCheck = () => {
        // 存在 关闭页面筛选
        if (closePages && closePages.length > 0) {
          // 跳转路径为关闭的页面
          if (closePages.includes(`${packageName}/${name}`)) {
            navigateTo('not-found', 'packageCommon')
          } else {
            jumpRoute(name, packageName, params)
          }
        } else {
          // 不存在 关闭页面筛选
          jumpRoute(name, packageName, params)
        }
      }

      // 不登录也能访问的页面
      if (isMustLogin === false) {
        jumpRouteCheck()
      } else {
        // 必须登录才能访问的页面
        // 已登录
        if (user_id) {
          jumpRouteCheck()
        } else {
          // 未登录
          if (!openid) {
            showModal('数据正在请求中，请稍后重试！')
            return
          } else {
            showModal('请登录后再访问').then(() => {
              navigateTo('login', 'packageCommon')
            })
          }
        }
      }
    },
  },
  computed: { ...mapGetters([USER_INFO]) },
  watch: {},
}
</script>

<style lang="scss" scoped>
.ez-convenient-service-wrapper {
  width: 100%;
  .service-items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .item {
    width: 304rpx;
    height: 168rpx;
    background-color: #f5faff;
    border-radius: 8rpx;
    position: relative;
    transition: all 0.3s;
    h3 {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 76rpx;
      font-size: $font-size-title;
      font-weight: 700;
      color: #003b8d;
      line-height: 42rpx;
      padding-left: 100rpx;
      padding-right: 20rpx;
      @include textOverflow(2);
      z-index: 3;
    }
    .desc {
      position: absolute;
      font-weight: 400;
      line-height: 24rpx;
      font-size: $font-size-desc;
      color: rgba(0, 59, 141, 0.4);
      position: absolute;
      left: 100rpx;
      bottom: 50rpx;
      z-index: 3;
    }
    img {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 28rpx;
      z-index: 1;
    }
    &:last-child {
      background-color: #effffd;
    }
    &.disabled {
      opacity: $opacity-disabled;
    }
  }
}
</style>
