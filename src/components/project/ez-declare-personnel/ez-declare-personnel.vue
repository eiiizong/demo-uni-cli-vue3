
<template>
  <view class="ez-declare-radio-wrapper">
    <div class="ez-declare-tip">{{ tip }}</div>
    <checkbox-group
      class="radio-group"
      @change="handleChange"
      v-if="isMultipleChoicesPersonnel"
    >
      <block v-for="item in renderData" :key="item.cac102">
        <label
          class="label"
          :for="'radio' + item.cac102"
          :class="[item.checked ? 'checked' : '']"
        >
          <div
            class="iconfont"
            :class="[
              item.checked ? 'iconfont-checkbox-checked' : 'iconfont-checkbox',
            ]"
          ></div>
          <checkbox
            class="radio"
            :checked="item.checked"
            :value="item.cac102"
            :id="'radio' + item.cac102"
          ></checkbox>
          <div class="label-text">
            {{ item.cac10a }}
          </div>
        </label>
      </block>
    </checkbox-group>
    <radio-group class="radio-group" @change="handleChange" v-else>
      <block v-for="item in renderData" :key="item.cac102">
        <label
          class="label"
          :for="'radio' + item.cac102"
          :class="[item.checked ? 'checked' : '']"
        >
          <div
            class="iconfont"
            :class="[
              item.checked ? 'iconfont-radio-checked' : 'iconfont-radio',
            ]"
          ></div>
          <radio
            class="radio"
            :checked="item.checked"
            :value="item.cac102"
            :id="'radio' + item.cac102"
          ></radio>
          <div class="label-text">
            {{ item.cac10a }}
          </div>
        </label>
      </block>
    </radio-group>
  </view>
</template>

<script>
/**
 * 申报 radio/checkbox 组件
 * @description 申报 radio/checkbox 组件
 */
export default {
  name: 'ezDeclareRadio',
  props: {
    // 提示信息
    tip: {
      type: [String],
      default:
        '请根据自身实际情况，在下面勾选。相关佐证材料，请在材料上传页上传。',
    },
    // 类型 radio 单选 checkbox 多选
    type: {
      type: [String],
      default: 'radio',
    },
    // 渲染数据
    renderData: {
      type: [Array],
      default: () => {
        return []
      },
    },
    // 是否开启多选
    isMultipleChoicesPersonnel: {
      type: [Boolean],
      default: false,
    },
  },
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleChange(e) {
      const { value } = e.target
      const isMultipleChoicesPersonnel = this.isMultipleChoicesPersonnel
      console.log(value, isMultipleChoicesPersonnel, '========value========')
      this.$emit('change', value)
    },
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
.checkbox,
.radio {
  width: 0;
  height: 0;
  display: none;
}
.ez-declare-radio-wrapper {
  width: 100%;
  .ez-declare-tip {
    font-size: 24rpx;
    background-color: #fff7e7;
    padding: 12rpx;
    color: #e49904;
    line-height: 1.4;
    margin-top: 12rpx;
    border-radius: 4rpx;
  }
  .checked-group,
  .radio-group {
    width: 100%;
    .label {
      font-size: 30rpx;
      border-bottom: solid 1rpx $border-color;
      padding: 10rpx 0;
      min-height: 108rpx;
      color: $color;
      font-weight: 500;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      &.checked {
        color: $primary;
      }
      &:last-child {
        border-bottom: 0;
      }
    }
    .iconfont {
      font-size: 32rpx;
      margin-right: 20rpx;
      transition: all 0.3s;
    }

    .label-text {
      flex: 1;
      overflow: hidden;
      line-height: 1.4;
    }
  }
}
</style>
