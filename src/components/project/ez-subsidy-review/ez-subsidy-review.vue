<template>
  <div class="ez-subsidy-review-wrapper">
    <div class="name">
      <div class="iconimg iconimg-subsidy"></div>
      <div class="text">{{ renderData.chi031Desc }}</div>
      <div class="status" :class="styleStatus">
        {{ strStatus }}
      </div>
    </div>
    <div class="cells">
      <div class="cell" v-if="renderData.aac003">
        <div class="key">申报人：</div>
        <div class="value">{{ renderData.aac003 }}</div>
      </div>
      <div class="cell" v-if="renderData.aae036">
        <div class="key">申报时间：</div>
        <div class="value">{{ renderData.aae036.substring(0, 19) }}</div>
      </div>
      <div class="cell current-step" v-if="renderData.che014_desc">
        <div class="key">当前经办环节：</div>
        <div class="value">{{ renderData.che014_desc }}</div>
      </div>
      <div
        class="cell"
        v-if="renderData.opinion && renderData.opinion !== 'null'"
      >
        <div class="key">申报说明：</div>
        <div class="value">{{ renderData.opinion }}</div>
      </div>
    </div>
    <div class="operating">
      <div
        class="btn"
        v-if="isShowEdit && isCanCancelDeclare"
        @click.stop="handleEditDeclare"
      >
        <span>去修改</span>
        <i class="iconimg"></i>
      </div>
      <div
        class="btn"
        @click.stop="handleCancelDeclare"
        v-if="isCanCancelDeclare"
      >
        <span>撤销申报</span>
        <i class="iconimg"></i>
      </div>
      <div class="btn" @click.stop="handleViewDeclareInfo">
        <span>查看详情</span>
        <i class="iconimg"></i>
      </div>
      <div class="btn" @click.stop="handleViewProcess" v-if="renderData.cpb100">
        <span>审批流程</span>
        <i class="iconimg"></i>
      </div>
    </div>
  </div>
</template>
<script>
import config from '@/config'
import { navigateTo, showModal, request } from '@/utils/uni-api' // 封装过后的api，推荐使用。方便以后统一修改，便于维护。
import { UPDATE_EDIT_SUBSIDY_INFO, USER_LIST } from '@/store/constants'
import { mapGetters } from 'vuex'
export default {
  name: 'ezSubsidyReview',
  props: {
    renderData: {
      type: [Object],
      default: () => {
        return {}
      },
    },
    // 申报类型
    declareType: {
      type: [String],
      default: '',
    },
  },
  data() {
    return {
      isCanCancelDeclare: false, // 是否可撤销申报
    }
  },
  components: {},
  created() {},
  methods: {
    requestB026(cpb100, chb00k) {
      const data = {
        methodName: 'B026',
        cpb100,
        userList: JSON.stringify([this.userList]),
      }
      request(
        '/frontRestService/frontBcpDataRestService/getWebServiceDataYgsp',
        data,
        {},
        false,
        false
      )
        .then((res) => {
          const { list } = res.lists.pb11List
          if (list && list.length > 1) {
            // 默认节点数大于等于2
            const target = list[1]
            // 第二节点是否已经完成办结
            if (target.handleFinish && target.handleFinish === '1') {
              this.isCanCancelDeclare = false
            } else {
              if (chb00k === '1') {
                this.isCanCancelDeclare = true
              } else {
                this.isCanCancelDeclare = false
              }
            }
          }
        })
        .catch((err) => {})
    },
    // 修改申报信息
    handleEditDeclare() {
      const declareType = this.declareType
      const { chi031, chi031_desc, chb000 } = this.renderData
      const { declarePackageName } = config
      const name = 'declare-' + chi031
      if (chi031) {
        this.$store.commit(UPDATE_EDIT_SUBSIDY_INFO, this.renderData)
        navigateTo(name, declarePackageName, {
          chi031,
          chi031_desc,
          declareType,
          type: 'edit',
          chb000,
        })
      }
    },
    // 查看审批详情
    handleViewProcess() {
      const { cpb100 } = this.renderData
      navigateTo('declare-process', 'packageDetails', { cpb100 })
    },
    // 查看申报详情
    handleViewDeclareInfo() {
      const { chi031, chb000 } = this.renderData
      navigateTo('declare-info', 'packageDeclare', { chi031, chb000 })
    },
    // 撤销申报
    handleCancelDeclare() {
      showModal('是否确定撤销申报', '提示', true).then((res) => {
        const { chb000 } = this.renderData
        const param = {
          methodName: 'B009',
          chb000,
          cpb103: '微信端经申报人确认后作废',
          userList: JSON.stringify([this.userList]),
        }
        request(
          '/frontRestService/frontBcpDataRestService/getWebServiceDataYgsp',
          param
        ).then((res) => {
          showModal('撤销申报成功').then((res) => {
            this.isCanCancelDeclare = false
            this.$emit('change')
          })
        })
      })
    },
  },
  computed: {
    ...mapGetters([USER_LIST]),
    // 控制显示 去修改按钮
    isShowEdit() {
      const { chi031 } = this.renderData
      let result = false
      // 只有普高助学金有修改功能
      if (
        chi031 === '20013' ||
        chi031 === '20014' ||
        chi031 === '20015' ||
        chi031 === '20016'
      ) {
        result = true
      }
      return result
    },
    // status
    strStatus() {
      const { chb00k } = this.renderData
      let str = ''
      switch (chb00k) {
        case '1':
          str = '进行中'
          break
        case '2':
          str = '通过'
          break
        case '3':
          str = '不通过'
          break
        case '4':
          str = '回退中'
          break
        case '5':
          str = '回退至受理节点'
          break
        case '6':
          str = '已作废'
          break
        case '7':
          str = '已撤销'
          break
        default:
          str = '未知状态'
          break
      }
      return str
    },
    styleStatus() {
      const { chb00k } = this.renderData
      let str = ''
      if (chb00k === '2') {
        str = 'success'
      }
      if (
        chb00k === '3' ||
        chb00k === '4' ||
        chb00k === '5' ||
        chb00k === '6'
      ) {
        str = 'fail'
      }

      return str
    },
  },
  watch: {
    'renderData.cpb100': {
      handler(val) {
        if (val) {
          const { chb00k } = this.renderData
          if (chb00k === '1') {
            this.requestB026(val, chb00k)
          } else {
            this.isCanCancelDeclare = false
          }
        }
      },
      immediate: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.ez-subsidy-review-wrapper {
  width: 100%;
  background-color: #fff;
  padding: $spacing $spacing 0;
  border-radius: 8rpx;
  .name {
    font-size: 28rpx;
    color: $color;
    line-height: 40rpx;
    position: relative;
    display: flex;
    align-items: center;
    .text {
      flex: 1;
      overflow: hidden;
      padding: 0 20rpx;
      font-weight: 700;
    }
    .status {
      height: 36rpx;
      line-height: 36rpx;
      background-color: #ffe1dd;
      border-radius: 4rpx;
      font-size: 24rpx;
      font-weight: 500;
      text-align: center;
      color: #ff6853;
      padding: 0 12rpx;
      &.success {
        background-color: rgba(109, 212, 0, 0.16);
        color: #6ed700;
      }
      &.fail {
        background-color: #efecff;
        color: #2825ff;
      }
    }
  }
  .cells {
    font-size: 26rpx;
    line-height: 50rpx;
    padding-top: 24rpx;
    .cell {
      display: flex;
      align-items: center;
      &.current-step {
        .value {
          font-weight: 700;
        }
      }
    }
    .key {
      width: 196rpx;
      color: $color-placeholder;
    }
    .value {
      flex: 1;
      color: $color;
      overflow: hidden;
    }
  }
  .operating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 88rpx;
    .btn {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-weight: 500;
      line-height: 24rpx;
      color: $primary;
      line-height: 1.4;
      margin-left: $spacing;
      .iconimg {
        width: 44rpx;
        height: 44rpx;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAMAAABGS8AGAAAAdVBMVEUAAAA4g/84g/84gv84gv84g/84g/84g/84hP85g/85g/86hP87hP89iP9Bh/9Aif9Jm/84gv85g/85g/86g/86h/9Gi/9Av/85gv84gv84g/85g/85hP85g/84hP88g/85g/85gv84g/84gv85hP87hv84gv8JxbXpAAAAJnRSTlMA+/bw6uLQtJ2Uby8oHRYQB9mohlo2CwS8rI5/emNKIsXAo2RVPQwp/I4AAADZSURBVFjD7da3EoJQEIVhQQURJQcjGPf9H9FxuNg4x2K3YcbzlX+xBdw0IyIiIiKi33Y17DYi+w3qxsHirbaw68mbf0hg15LB/JjCrhOIs1hnsKtUuTjLewu7RnteipM/YFfJ1gtxgg52leY0F+daw66Slr44YQy7ShJ54tx62FW2q3GEF8GusynEgV0rDocB332ag42fYoR/nl+iblpuXpSgbtogRY+6aUuHMeqmQ+jyRN10bAYd6raDvkJ9UlfT59JsULdd/ynqU3yw4CfWNB+FRERERH/hBS4DRCd5ULrmAAAAAElFTkSuQmCC)
          no-repeat center center;
        background-size: 100% 100%;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
