<template>
  <view class="ez-not-found-wrapper">
    <div class="ez-not-found-bg-img-wrapper">
      <img :src="getImageType" alt="" :style="setImageStyles" />
    </div>
    <div class="ez-not-found-text-img-wrapper">
      <img :src="getImageTextType" alt="" />
    </div>
  </view>
</template>

<script>
/**
 * NotFound
 * @description 页面未找到或者正在搭建中
 * @property {String} type 目前支持 building、building-02 和 404 两种类型 默认 404
 */
import bg01 from './images/bg-01.png'
import bg02 from './images/bg-02.png'
import bg03 from './images/bg-03.png'
import text01 from './images/text-01.png'
import text02 from './images/text-02.png'

export default {
  name: 'ezNotFound',
  props: {
    // 目前支持 building、building-02 和 404 两种类型 默认 404
    type: {
      type: [String],
      default: 'building-02',
    },
  },
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {
    getImageType() {
      let str = ''
      const type = this.type
      switch (type) {
        case '404':
          str = bg03
          break
        case 'building':
          str = bg01
          break
        case 'building-02':
          str = bg02
          break
        default:
          str = bg03
          break
      }
      return str
    },
    getImageTextType() {
      let str = ''
      const type = this.type
      switch (type) {
        case '404':
          str = text02
          break
        case 'building':
          str = text01
          break
        case 'building-02':
          str = text01
          break
        default:
          str = text02
          break
      }
      return str
    },
    setImageStyles() {
      let str = ''
      const type = this.type
      switch (type) {
        case '404':
          str += `height: 330rpx;`
          break
        case 'building':
          str += `height: 562rpx; margin-top: 180rpx;`
          break
        case 'building-02':
          str += `height: 466rpx; margin-top: 200rpx; width: 622rpx;`
          break
        default:
          str += `height: 330rpx;`
          break
      }
      return str
    },
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
.ez-not-found-wrapper {
  width: 100%;
  height: 100%;
  background-color: transparent;
  text-align: center;
}
.ez-not-found-bg-img-wrapper {
  width: 100%;
  img {
    width: 606rpx;
    height: 330rpx;
    margin: 0 auto;
    margin-top: 300rpx;
  }
}
.ez-not-found-text-img-wrapper {
  width: 100%;
  img {
    width: 304rpx;
    height: 66rpx;
    margin: 0 auto;
  }
}
</style>
