
<template>
  <view class="ez-subsidized-goods-wrapper">
    <div class="items">
      <block v-for="(item, index) in subsidizedGoodsRenderData" :key="item.id">
        <div
          class="item"
          :class="['item_' + index, item.disabled ? 'disabled' : '']"
          @click="handleJumpRoute(index)"
        >
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
          <div class="btn">{{ item.buttonText }}</div>
        </div>
      </block>
    </div>
  </view>
</template>

<script>
import config from '@/config'
import { navigateTo, showModal, switchTab, request } from '@/utils/uni-api'
import { UPDATE_IS_MERCHANT, USER_INFO, USER_LIST } from '@/store/constants' // 常量
import { mapGetters } from 'vuex'
/**
 * 一站式结算商品
 * @description 一站式结算商品
 */
export default {
  name: 'ezSubsidizedGoods',
  props: {},
  components: {},
  data() {
    return {
      // 便捷服务渲染数据
      subsidizedGoodsRenderData: [
        {
          id: '01',
          imageSrc: '/static/images/components/subsidizedGoods/01.png',
          imageWidth: '58rpx',
          imageHeight: '54rpx',
          desc: '商户入驻',
          buttonText: '我要入驻',
          disabled: false,
          name: 'shop-add',
          packageName: 'packageSubsidizedGoods',
        },
        {
          id: '02',
          imageSrc: '/static/images/components/subsidizedGoods/02.png',
          imageWidth: '65rpx',
          imageHeight: '62rpx',
          desc: '专款专用',
          buttonText: '我要买',
          disabled: false,
          name: 'shop-query',
          packageName: 'packageSubsidizedGoods',
        },
      ],
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 查询用户店铺信息
    requestB049() {
      const { idCard } = this.userInfo
      const data = {
        methodName: 'B049',
        businessName: '查询用户店铺信息',
        aac002: idCard,
        pageSize: '1',
        pageNo: '1',
        userList: JSON.stringify([this.userList]),
      }
      return new Promise((resolve, reject) => {
        request(
          '/frontRestService/frontBcpDataRestService/getWebServiceDataYgsp',
          data
        )
          .then((res) => {
            const { list } = res.lists.ht13List
            if (list && list.length > 0) {
              resolve(true)
            } else {
              reject(false)
            }
          })
          .catch((err) => {
            reject(false)
          })
      })
    },
    // 跳转路由
    handleJumpRoute(index) {
      console.log(12324344)
      const { closePages } = config
      const { user_id } = this.userInfo
      const item = this.subsidizedGoodsRenderData[index]

      if (!user_id) {
        showModal('请登录后再访问').then((res) => {
          navigateTo('login', 'packageCommon')
        })
        return
      }

      const jumpRoute = (name, packageName, params) => {
        // 跳转 tababr 页面
        if (packageName === 'tabbar') {
          switchTab(name)
        } else {
          // 跳转 非tababr 页面
          navigateTo(name, packageName, params)
        }
      }
      const { name, packageName, params } = item
      // 开启关闭页面筛选
      if (closePages && closePages.length > 0) {
        // 存在
        if (closePages.includes(`${packageName}/${name}`)) {
          navigateTo('not-found', 'packageCommon')
        } else {
          // 不存在
          jumpRoute(name, packageName, params)
        }
      } else {
        // 关闭 关闭页面筛选
        if (index === 0) {
          this.requestB049()
            .then((res) => {
              jumpRoute('shop-list', 'packageSubsidizedGoods')
            })
            .catch((err) => {
              jumpRoute(name, packageName, params)
            })
            .finally(() => {
              this.$store.commit(UPDATE_IS_MERCHANT, true)
            })
        } else {
          this.$store.commit(UPDATE_IS_MERCHANT, false)
          jumpRoute(name, packageName, params)
        }
      }
    },
  },
  computed: { ...mapGetters([USER_INFO, USER_LIST]) },
  watch: {},
}
</script>

<style lang="scss" scoped>
.ez-subsidized-goods-wrapper {
  width: 100%;
  .items {
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
    background-color: #fff2ec;
    border-radius: 8rpx;
    padding: 44rpx 80rpx 0 20rpx;
    .desc {
      font-size: 22rpx;
      line-height: 24rpx;
      color: #a05422;
    }
    img {
      position: absolute;
      top: 58rpx;
      right: 20rpx;
    }
    .btn {
      width: 150rpx;
      height: 42rpx;
      background-image: linear-gradient(180deg, #ffa142 0%, #ff4f1f 100%);
      border-radius: 20px;
      font-size: 26rpx;
      font-weight: 700;
      text-align: center;
      color: #ffffff;
      line-height: 42rpx;
      margin-top: 20rpx;
    }
    &:last-child {
      background-color: #def3ff;
      .desc {
        color: #1e7ae4;
      }
      .btn {
        background-image: linear-gradient(180deg, #40cdff 0%, #0070ff 100%);
      }
    }
    &.disabled {
      opacity: $opacity-disabled;
    }
  }
}
</style>
