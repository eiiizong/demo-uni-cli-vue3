<!-- ucharts 饼状图组件（其他统计图暂未开发） -->
<template>
  <view class="qiun-columns">
    <view
      class="qiun-charts"
      :style="{
        width: selfAdaption ? '100%' : style.width + 'rpx',
        height: selfAdaption ? autoHeight + 'rpx' : style.height + 'rpx',
      }"
    >
      <canvas
        canvas-id="canvasPie"
        :style="{
          width: selfAdaption ? '100%' : style.width + 'rpx',
          height: selfAdaption ? autoHeight + 'rpx' : style.height + 'rpx',
        }"
        id="canvasPie"
        class="charts"
        @touchstart="touchPie"
      ></canvas>
    </view>
  </view>
</template>
<script>
import uCharts from '@/components/MUI/u-charts/u-charts.js'
var _self
var canvaPie = null
export default {
  props: {
    dataSeries: {
      // 数据格式 [{name: String,data: Number}]
      type: [Array],
      default: () => {
        return []
      },
    },
    style: {
      //设置宽高 （需关闭自适应）
      type: [Object],
      required: false,
    },
    selfAdaption: {
      //开启宽高自适应 (但外围宽度不能过小)
      type: [Boolean],
      default: true,
    },
  },
  data() {
    return {
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      serverData: '',
      Pie: {
        series: [
          {
            name: '一班',
            data: 50,
          },
          {
            name: '二班',
            data: 30,
          },
          {
            name: '三班',
            data: 20,
          },
          {
            name: '四班',
            data: 18,
          },
          {
            name: '五班',
            data: 8,
          },
        ],
      },
      autoHeight: 200,
    }
  },
  async created() {
    this.init()
  },
  methods: {
    async init() {
      _self = this
      if (!this.selfAdaption) {
        var { width, height } = this.style
        this.cWidth = uni.upx2px(width)
        this.cHeight = uni.upx2px(height)
      } else {
        var { width } = await this.getDescBox()
        var height = (width * 4) / 3
        this.autoHeight = height
        width = width * 2
        height = height
      }
      this.cWidth = uni.upx2px(width)
      this.cHeight = uni.upx2px(height)
      this.getServerData()
    },
    // 获取元素宽高
    getDescBox() {
      return new Promise((resolve, reject) => {
        uni
          .createSelectorQuery()
          .in(this)
          .select('#canvasPie')
          .boundingClientRect((result) => {
            if (result) {
              console.log('==========', result)
              resolve(result)
            } else {
              this.getDescBox()
            }
          })
          .exec()
      })
    },
    getServerData() {
      console.log(this.dataSeries, '数据')
      _self.showPie('canvasPie', this.dataSeries)
    },
    showPie(canvasId, chartData) {
      canvaPie = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'pie',
        fontSize: 11,
        legend: true,
        background: '#FFFFFF',
        pixelRatio: _self.pixelRatio,
        series: chartData,
        animation: true,
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        dataLabel: true,
        extra: {
          pie: {
            lableWidth: 15,
          },
        },
      })
    },
    touchPie(e) {
      canvaPie.showToolTip(e, {
        format: function (item) {
          return item.name + ':' + item.data
        },
      })
    },
  },
  watch: {
    dataSeries() {
      this.init()
    },
  },
}
</script>
<style lang="scss" scoped>
page {
  background: #f2f2f2;
  width: 750rpx;
  overflow-x: hidden;
}
.qiun-padding {
  padding: 2%;
  width: 96%;
}
.qiun-wrap {
  display: flex;
  flex-wrap: wrap;
}
.qiun-rows {
  display: flex;
  flex-direction: row !important;
}
.qiun-columns {
  display: flex;
  flex-direction: column !important;
}
.qiun-common-mt {
  margin-top: 10rpx;
}
.qiun-bg-white {
  background: #ffffff;
}
.qiun-title-bar {
  width: 96%;
  padding: 10rpx 2%;
  flex-wrap: nowrap;
}
.qiun-title-dot-light {
  border-left: 10rpx solid #0ea391;
  padding-left: 10rpx;
  font-size: 32rpx;
  color: #000000;
}
.qiun-charts {
  width: 750rpx;
  height: 500rpx;
  background-color: #ffffff;
}
.charts {
  width: 750rpx;
  height: 500rpx;
  background-color: #ffffff;
}
</style>
