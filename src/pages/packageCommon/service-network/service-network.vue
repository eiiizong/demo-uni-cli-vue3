<template>
  <view class="service-network h5-page">
    <!-- #ifdef MP-WEIXIN -->
    <block v-if="hasMarkers">
      <map
        class="map"
        :latitude="latitude"
        :scale="12"
        :longitude="longitude"
        show-location
        :markers="markers"
        enable-poi
        @tap="handleTap"
        @markertap="handleMarkertap"
      >
      </map>
    </block>
    <block v-else>
      <map
        class="map"
        :latitude="latitude"
        :longitude="longitude"
        show-location
        enable-poi
      >
      </map>
    </block>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <map
      class="map"
      :latitude="latitude"
      :scale="12"
      :longitude="longitude"
      show-location
      :markers="markers"
      enable-poi
      @tap="handleTap"
      @markertap="handleMarkertap"
    >
    </map>
    <!-- #endif -->
    <div class="toolbar d-f ai-c">
      <block v-for="item in tabData" :key="item.id">
        <div
          class="item d-f ai-c jc-c"
          @click="handleChangeTab(item.id)"
          :class="[currentId === item.id ? 'active' : '']"
        >
          <div class="iconimg"></div>
          <span>{{ item.name }}</span>
        </div>
      </block>
    </div>
    <!-- <ComponentMUITransition :show="isShowSelectInfo" :duration="300"> -->
    <!-- </ComponentMUITransition> -->
    <ComponentMUIPopup ref="popup_address" type="bottom">
      <div class="popup-content">
        <div class="select-con">
          <div class="info d-f ai-c">
            <img :src="imageSrc" alt="" />
            <div class="details">
              <div class="name">{{ selectInfo.name }}</div>
              <div class="address">{{ selectInfo.address }}</div>
            </div>
          </div>
          <div class="time">
            <div>营业时间</div>
            <p>{{ selectInfo.time_desc }}</p>
          </div>
          <div class="files" v-if="selectInfo.chm03c">
            <div>可办理材料</div>
            <p>{{ selectInfo.chm03c }}</p>
          </div>

          <div class="button-wrapper d-f ai-c jc-sb">
            <ComponentButton
              name="联系网点"
              width="330rpx"
              height="80rpx"
              type="secondary"
              @click="handleCallPhone"
            ></ComponentButton>
            <ComponentButton
              name="导航"
              width="330rpx"
              height="80rpx"
              type="primary"
              @click="handleNavigation"
            ></ComponentButton>
          </div>
        </div>
      </div>
    </ComponentMUIPopup>
    <ComponentMUIPopup ref="action_sheet" type="bottom">
      <div class="popup-content">
        <div class="select-con">
          <div class="cells">
            <block v-for="item in codeMap.chm032">
              <div class="cell" @click="handleSelectType(item.aaa102)">
                {{ item.aaa103 }}
              </div>
            </block>
          </div>
        </div>
      </div>
    </ComponentMUIPopup>
  </view>
</template>

<script>
import ComponentButton from '@/components/common/ez-button/ez-button.vue'
import ComponentMUIPopup from '@/components/MUI/uni-popup/uni-popup.vue'
import ComponentMUITransition from '@/components/MUI/uni-transition/uni-transition.vue'
import {
  getLocation,
  request,
  makePhoneCall,
  openLocation,
  downloadFile,
  showModal,
} from '@/utils/uni-api/index'
import config from '@/config/index'
import { bMapToQQMap } from '@/utils/convert/index'
import { getIsDev } from '@/utils/get/index'
import { getCodeListByCodeName } from '@/utils/custom-api/index'
export default {
  name: 'pageServiceNetwork',
  data() {
    return {
      currentId: 'bank', // 当前选中tab Id
      // tab 数据
      tabData: [
        {
          id: 'bank',
          name: '合作银行网点',
        },
        {
          id: 'organ',
          name: '合作机构',
        },
      ],
      requestResponseData: [], // 请求返回的数据
      // 选择的信息
      selectInfo: {},
      longitude: '',
      latitude: '',
      imageSrc: '', // 机构头像
      isShowSelectInfo: false, // 是否显示选中内容
      hasMarkers: false, // 标记内容是否请求完成
      // 标记点
      markers: [],
      codeMap: {}, // 码表
    }
  },
  components: {
    ComponentButton,
    ComponentMUITransition,
    ComponentMUIPopup,
  },
  onShow() {
    this.getCodeTableCacheData()
  },
  methods: {
    // 打开地点弹窗
    openPopupAddress() {
      this.$refs.popup_address.open()
    },
    // 关闭地点弹窗
    closePopupAddress() {
      this.$refs.popup_address.close()
    },
    // 打开操作面板弹窗
    openPopupActionSheet() {
      this.$refs.action_sheet.open()
    },
    // 关闭操作面板弹窗
    closePopupActionSheet() {
      this.$refs.action_sheet.close()
    },
    // 获取码表
    async getCodeTableCacheData() {
      const isDev = getIsDev() // 当前环境是否是开发环境
      let chm032 = [] // 儿童与监护人关系

      try {
        chm032 = await getCodeListByCodeName('chm032')
      } catch (err) {
        if (isDev) {
          console.log('code table c00066 error：', err)
        }
      }

      this.codeMap = {
        ...this.codeMap,
        chm032,
      }
    },
    // 获取当前位置信息
    getCurrentLocationInfo() {
      const latitude = this.latitude
      const longitude = this.longitude
      if (latitude && longitude) {
        this.ruqestData(latitude, longitude)
      } else {
        getLocation('gcj02').then((res) => {
          const { latitude, longitude } = res
          this.latitude = latitude
          this.longitude = longitude
          this.ruqestData(latitude, longitude)
        })
      }
    },
    // 下载图片
    requestDownloadFile(chi215) {
      return new Promise((resolve, reject) => {
        downloadFile('/upload/downloadFile/' + chi215)
          .then((res) => {
            const { tempFilePath } = res
            resolve(tempFilePath)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 获取当前定位周围的基层网点
    ruqestData(latitude, longitude, chm032) {
      const { isUseBMap } = config
      const currentId = this.currentId
      let data = {
        methodName: 'B039',
        businessName: '获取当前定位周围的基层网点',
        longitude: longitude + '',
        latitude: latitude + '',
        distance: '10000',
      }
      if (currentId === 'bank') {
        data = {
          ...data,
          methodName: 'B040',
          businessName: '获取当前定位周围的合作银行网点',
        }
      }
      if (chm032) {
        data = {
          ...data,
          chm032,
        }
      }
      request(
        '/frontRestService/frontBcpDataRestService/getWebServiceDataYgsp',
        data
      )
        .then((res) => {
          let list = []
          if (currentId === 'bank') {
            list = res.lists.hm04List.list
          } else {
            list = res.lists.hm03List.list
          }
          if (list && list.length > 0) {
            const newList = []
            list.map((item, index) => {
              let QQMap = bMapToQQMap(Number(item.chm03a), Number(item.chm03b))
              if (currentId === 'bank') {
                QQMap = bMapToQQMap(Number(item.chm048), Number(item.chm049))
              }
              if (isUseBMap) {
                item.chm03a = QQMap.longitude
                item.chm03b = QQMap.latitude
                if (currentId === 'bank') {
                  item.chm048 = QQMap.longitude
                  item.chm049 = QQMap.latitude
                }
              }
              let obj = {
                id: 1000 + index,
                latitude: isUseBMap ? QQMap.latitude : Number(item.chm03b),
                longitude: isUseBMap ? QQMap.longitude : Number(item.chm03a),
                iconPath: '/static/images/common/address.png',
                width: '30',
                height: '30',
              }
              if (currentId === 'bank') {
                obj.latitude = isUseBMap ? QQMap.latitude : Number(item.chm049)
                obj.longitude = isUseBMap
                  ? QQMap.longitude
                  : Number(item.chm048)
              }
              newList.push(obj)
            })
            this.markers = [...newList]
            this.hasMarkers = true
            this.requestResponseData = [...list]
          } else {
            this.hasMarkers = false
            this.markers = []
            this.requestResponseData = []
          }
        })
        .catch(() => {
          this.hasMarkers = false
          this.markers = []
          this.requestResponseData = []
        })
    },

    // tab change
    handleChangeTab(id) {
      const currentId = this.currentId
      this.closePopupAddress()
      this.currentId = id

      // 点击合作机构
      if (id == 'organ') {
        this.openPopupActionSheet()
      }
    },
    // 选择类型
    handleSelectType(id) {
      const latitude = this.latitude
      const longitude = this.longitude
      this.closePopupActionSheet()
      this.ruqestData(latitude, longitude, id)
    },
    // 点击地图
    handleTap() {
      this.isShowSelectInfo = false
    },
    // 点击标记点时触发
    handleMarkertap(e) {
      const currentId = this.currentId
      const { markerId } = e.detail
      const requestResponseData = this.requestResponseData
      const markers = this.markers
      let obj = {
        name: '',
        address: '',
        time_desc: '',
        tel: '',
        name: '',
        latitude: '',
        longitude: '',
      }
      for (let i = 0, len = markers.length; i < len; i++) {
        const item = markers[i]
        if (item.id === markerId) {
          // console.log(item, 12345888)
          const info = requestResponseData[i]
          if (info && info.chi215) {
            this.requestDownloadFile(info.chi215)
              .then((res) => {
                this.imageSrc = res
              })
              .catch(() => {
                this.imageSrc =
                  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff02fb51325c1a54a7b0e546cffad6f9841562148edf4-lBmkzD_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628839398&t=6d4b469e7b1261038fbae5b3c6ef9eb8'
              })
          } else {
            this.imageSrc =
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff02fb51325c1a54a7b0e546cffad6f9841562148edf4-lBmkzD_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628839398&t=6d4b469e7b1261038fbae5b3c6ef9eb8'
          }
          obj = {
            ...obj,
            tel: info.aac103,
            name: info.chm031,
            address: info.chm033,
            time_desc: info.chm038,
            latitude: info.chm03b,
            longitude: info.chm03a,
            chm03c: info.chm03c,
          }

          if (currentId === 'bank') {
            obj = {
              ...obj,
              tel: info.aac103,
              name: info.chm041,
              address: info.chm043,
              time_desc: info.chm046,
              latitude: info.chm049,
              longitude: info.chm048,
            }
          }
          this.selectInfo = {
            ...obj,
          }
          break
        }
      }

      // #ifdef MP-WEIXIN
      this.openPopupAddress()
      // #endif
      // #ifdef H5
      setTimeout(() => {
        this.openPopupAddress()
      }, 500)
      // #endif
    },
    // 联系网点
    handleCallPhone() {
      const { tel } = this.selectInfo
      // #ifdef MP-WEIXIN
      makePhoneCall(tel)
      // #endif
      // #ifdef H5
      showModal('电话号码为' + tel + '，请自行联系！')
      // #endif
    },
    // 导航
    handleNavigation() {
      const { name, address, latitude, longitude } = this.selectInfo
      openLocation(Number(latitude), Number(longitude), name, address)
    },
  },
  computed: {},
  watch: {
    currentId: {
      handler(val) {
        if (val && val == 'bank') {
          this.getCurrentLocationInfo()
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.service-network {
  width: 100%;
  height: 100%;
  height: 100vh;
  position: relative;
  .map {
    width: 100%;
    flex: 1;
  }
  .toolbar {
    position: absolute;
    top: 30rpx;
    left: 50%;
    width: 690rpx;
    height: 80rpx;
    background-color: #ffffff;
    transform: translateX(-50%);
    border-radius: 10rpx;
    z-index: 99;
    .item {
      width: 50%;
      height: 100%;
      font-size: 26rpx;
      line-height: 1;
      color: #999;
      transition: all 0.3s;

      .iconimg {
        width: 40rpx;
        height: 36rpx;
        margin-right: 20rpx;
        transition: all 0.3s;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAkCAYAAAD7PHgWAAACIklEQVRYhe3XPWgVQRQF4C8hKMGgKcTKQEAFI4jBxjQKoohNLAQbsRCFQDpBRUkrioiWFu9VVgZiIUgaC41WUSubBESREAM2isEfJGDUYtewDLP63iR5LMEDC/fOnjvnsLNzZ7etVqspQTeu4QQ2l5GWiQ+4h5GhoaH5GKG9pLATTzBs9czJ5x7GRL1e74wROkoKz2JPHs9hAj9X2Fw7DmIr+nEGtxs1uL8QH8arFTb3B32YzuMDIgbLlnh9IV4tc/C+RHMJZQYrg8obLHsHG6k7JNvtM3hZwutHL77jEX6kCKXgOs4X8gE8DzgDmCzkN3GxWaHUJd4e5H0Rzs4g35EilGrwS5B/inDCsbCmIaQu8Qg+yo7DKYxHOOO4hF2Yx61WGnyHc//gLOJG4vxLqHybqbzB1CXuxQV04Y2s7YQ9rgOXZTv+q6zNzLTK4FWcLORTuB9wBnGlkHfjVLNCqUu8Icg3RTjhWFeKUKrB4hfOL9kTDDGd34vVNIzl9MGH2IjX4gZfYLfsBPmMp600uIjHDfCmxM03jMq3mTVrcBCzsjN2UvzPbwue5ZzZvKZlBk+jR9ZKBnA0wjmCfTmnJ69pGqkGw7q2CCcci3GaFmoUY/iWx29l/80hJvJ7cu5YilBqmxnNr79hDtsS51/Cmt3FLcN/g8tF5Q124DiOBeN7C/GdVdRfV9Ss1+uh1oO2Wq22EBCrhIV23JV9PlUNixj9DSEAYHQSUBIiAAAAAElFTkSuQmCC);
      }

      &:last-child {
        .iconimg {
          height: 38rpx;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAADDklEQVRYhc3YT8hVRRjH8c+rvfiKlVpSJIT9t4J4c1FCLaTFC4pUtGoVEdTJJFKp0NzY7k3SeIOkzrSpUBDEgmoRYVRQRLmwIsoWWQbmoj8WpoUltphzfcfr9b537jne/MGBOQ/zm/O9c+Y888wdKstSQ5qJh7ASV+E9PIgD3UxFUXQddFpDYKuxD89jIYaxFK/WHfy8Gt7z8Sgex7wz9LmjxvjobwbnYD1+wLhJuH9Q4iZ8XmP8U5Qzg3PEV7kas5P43xXYc/ixiu3HzXXhegWchyfwCC5M4kfxMjbiYBMwndQN8FKsEdfZrCR+BC9gE345W2AtdQK8DGvxMEaS+B8V2MQgwFpqB1yJzU4Hm6iu3wfEdVIp4HXYktz/Kr7GLTg8SKhUaRq4JWlvwxV4Rn24dVjQrzkFHE7au/Bnv4O2aRzfYgNm5JpzE+l8cVYnsCrDPwNP4yuM5TwwF3Bc/MJXiZDLe/CsE3MmXIN3sV3MFo0Dzm67v7gHz0bciDeT2L3ia38shDC9mzkXsL10+r5H337cjbtMbocXiNXP7hDC4qYAn8QD4g4zhg8z/W/hBnEd/1vFFuGTEMKLIYS5dQGP4hVx/e3K9KZjPIVRkz9wCCuwN4SwtA5gk/parBfvx89V7BK8EUKY3+r0fwLCiaIoXhOr8Ler2AiWtDrkAo6KX+MHYg040rV3jyqK4hB2JqGTCT235F+PO6v2EnEd7qhFN4VyZ7B9q5rVsVeDygX8MmkfxxcNsnRULuAGLBa/vmuxJ9N/Gz4SD1U7xWTdVblr8AQ+y/SkWoPbq/aouH63dzMMOs0Mt91PWX4NGvDjpP0XPp3KkAs4hm/EQ/v7uCjT/yyuFvffy7F3KkPuGlyB66v2AiwTjwc52pfTOXcG22u3rrVcE8oFfCdp/+bUNXVWlAv4krjurhTPJ981TtSmfv5+O1RdA9GZZrBu+knzXa9HzY7PHCrL8j7cIx7UF1Xxg/rfMYbFdNSC3I2fevDdavKkt0dMZa8PlWV5zOkZ/lzRsWnYKlYm55qOY9t/lgyR5q71wC8AAAAASUVORK5CYII=);
        }
      }

      &.active {
        background-color: #2187f5;
        color: #ffffff;
        border-radius: 10rpx;
        .iconimg {
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAkCAYAAAD7PHgWAAACIUlEQVRYhe3Xv2sUQRQH8E9CUMSgV4iVgYCKRhCDTYKdCGITC0uxEP0HLATFVgTRWGptZUgaQ0hjocEqYmVzgigiMWARRPEHEjCOxS5xmcwmd5vkWIJfGJg37/v2fW9m3ts9IQQloxFCeBBCWAibh4U8R6NMR1cIQQI7MItjKecm4BVO4Ffs6CkJuOyfuHnM4M8Gi+rGSezDIC7h/gpWydaOF47h0CrXYL1joJBnPMXpLvl12wvzNxu8c0V8Ksm5jDKBtUHtBZYVSStxp2TV/kFWhSkMol9WnU/xu+1MJZd3snB5U/7RqJ8NJTjDEedugtMo+CfbKZK1cCCyBxKcw5F9sEqiqgK/R/aXBCdei2NaQtU7eAOf0UAT0wnONK7hCL7iXicFfsSVNThLuFPx+cuofZupvcCqR9yPq+jFO9y2ssf14Lqs4n9gVNYzOyLwFs4X7CYeR5wR3CzYDVxoN1HVI94Z2bsTnHitt0qiqgKLXzhBtoMxXue+VEzLWE8ffIJdeCst8CWOyt4g3/C8kwKX8KwFXlNafMuofZvZsgJHMCd7x85iT4KzFy9yzlwe0zGBF9EnayXDOJPgnMZQzunLY9pGVYFxXFeCE6+lOG0nahUT+JnP38v+N8eYyX1y7kSVRFXbzFg+VsM89ld8/jK2bBV3DP8Frhe1F9iDczgbrR8vzB9uYv5tUc4411RXCGExItYJi914JPt8qhuWMPYXkvHlirWvjYUAAAAASUVORK5CYII=);
        }
        &:last-child {
          .iconimg {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAAC9klEQVRYhc2YT0gVURjFf1qSYZKVFBZlEf2TQFxUUAtxIdTColWryFZFhCURihvdZdTCIMiWRYIQ/aGCWggZFFEurIiyRWVBSSSplAiP7LS4o1zHeW/mvhkfHnhw78c9dw7fPe/77gySSOi3WFKDpAFJKUkPJa2Ju29Swk5LGtJs9MTdP08SWWIJcBI4A5SmWfMPWJDtA4CsMlgiqUXSsC9bKUmdkrZL6rfiOTviEkltkkZ9wiYkdUhaZ629m0uBpZLaJY35hI17wsoCOIkJXJjh9FcBjZ7Piqz4OHAZuAgMx/JXBAQJLAOagGNAoRUf84R15ELYNHwpPeF5ysao570Sh6OZEw9u9gkbltQsqTiLjRMTmG8lc4c17gLWA+3A75iH1AyUZ0u2BRZY4x7gT7ab+nAO+AC0AotcyfnhS2ZgNSarHcApB/4ioA14C9Q6PdE673rLN/VpPHHN59O6CB5skqmZNroVXD8zejAKlvrmKyJwzgMVwD0rdghz7A2E9GpXgd98888ReV+AA8B+4KsXKwYuAX3ArqQEngWOYjpMLfDEkX8f2Ibx8V8vVgU8B64Ay2YxHD2YZB2skNTr8+YPSXvjeDBJvANqgCPATy+2EriDqRaA+xEnDQHXgS3AAy9WCFRPLXAVWIn5N/YCV5l5mYiDEeCWNZ8u6JmuW0FoAeq8cTWm49yMJS0Erhn0t6qiwFUJwlXgG2s8CbxOUEsgXAW2YopqDbAJ6Hfk7waeAq8wnisOI7h6UMBLR46NRmCPN67E+Lc7EyHXZabANw+9fuVa4DNrPAG8CCO4CqwF3gODwGNguSP/ArAR03/XAgNhBFcPHge2euNyYB/m9cAFn1wWu2bQf3eL990lAlwFPrLGv5jpqTmBq8BOjO82YG4cHxNX5IOrB8E09pGkhaRDugzGLT92vYv6qhn4zDxJh4GDmBf1Ki8+RPYdowBTjqZE9gHfI/B2Yr4LgWmhg8DtPEkpZlf4+YJUPnADczOZb5gEuv4DJA3g4wRql3wAAAAASUVORK5CYII=);
          }
        }
      }
    }
  }
}

.select-con {
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0rpx -4rpx 16rpx 0rpx rgba(0, 0, 0, 0.14);
  border-radius: 30rpx 30rpx 0rpx 0rpx;
  padding: 0 $spacing;
  .info {
    width: 100%;
    padding-top: 36rpx;
    padding-bottom: 30rpx;
    border-bottom: 1px solid $border-color;
    img {
      width: 100rpx;
      height: 100rpx;
      border-radius: 10rpx;
      margin-right: 30rpx;
      background-color: #eee;
    }
    .details {
      flex: 1;
      overflow: hidden;
    }

    .name {
      font-size: 36rpx;
      font-weight: 700;
      color: #000;
      line-height: 1.2;
    }

    .address {
      font-size: 24rpx;
      line-height: 1.4;
      color: #999999;
      padding-top: 20rpx;
    }
  }
  .cells {
    padding: 30rpx 0;
    .cell {
      text-align: center;
      color: $color;
      line-height: 80rpx;
      border-bottom: 1px solid $border-color;
      padding: 0 30rpx;
      &:last-child {
        border-bottom: 0;
      }
    }
  }

  .time {
    width: 100%;
    text-align: center;
    padding: $spacing 0;
    div {
      font-size: 30rpx;
      line-height: 1;
      color: #333;
    }
    p {
      font-size: 30rpx;
      line-height: 1.4;
      margin-top: 28rpx;
      color: #999;
      text-align: left;
    }
  }
  .files {
    width: 100%;
    text-align: center;
    padding: $spacing 0;
    border-top: 1px solid $border-color;
    div {
      font-size: 30rpx;
      line-height: 1;
      color: #333;
    }
    p {
      font-size: 30rpx;
      line-height: 1.4;
      margin-top: 28rpx;
      color: #999;
      text-align: left;
    }
  }

  .button-wrapper {
    width: 100%;
    border-top: 1px solid $border-color;
    padding: $spacing 0;
  }
}
</style>
