<template>
  <div
    class="ez-upload-files-wrapper"
    v-if="renderData && renderData.length > 0"
  >
    <block v-for="(item, index) in renderData" :key="item.id">
      <div class="item-wrapper" :class="[item.isLimit ? '' : 'no-limit']">
        <!-- 示例文件 -->
        <div class="item-example">
          <div class="left">
            {{ item.isRequired ? '必传材料' : '非必传材料' }}
          </div>
          <div class="right" v-if="false">
            <span>查询示例</span>
            <i class="iconfont iconfont-arrow-right-double"></i>
          </div>
        </div>
        <div class="item-title">{{ item.name }}</div>
        <block v-if="item.isLimit">
          <block
            v-for="(uploadItem, uploadIndex) in item.files"
            :key="uploadIndex"
          >
            <div
              class="item-upload"
              @click="handleChooseFile(index, uploadIndex)"
            >
              <img
                class="bg"
                :src="imageBg"
                alt="upload-file-bg"
                v-if="!uploadItem.path"
              />
              <img
                class="eg"
                :class="[uploadItem.path ? 'uploaded' : '']"
                :src="uploadItem.path ? uploadItem.path : uploadItem.staticPath"
                alt="img"
              />
              <div class="tip d-f fw-w" v-if="!uploadItem.path">
                <i class="iconfont iconfont-camera"></i>
                <div class="span">
                  <span>{{ uploadItem.name_zh + '上传' }}</span>
                </div>
              </div>
              <i
                class="iconfont iconfont-delete"
                v-if="uploadItem.path"
                @click.stop="handleDeleteFile(index, uploadIndex)"
              ></i>
            </div>
          </block>
        </block>
        <block v-else>
          <div class="img-wrapper d-f ai-c fw-w">
            <block
              v-for="(uploadItem, uploadIndex) in item.files"
              :key="uploadIndex"
            >
              <div class="img-item" v-if="uploadItem.path">
                <img
                  :src="uploadItem.path"
                  alt=""
                  @click="handlePreviewImage(index, uploadIndex)"
                />
                <i
                  class="iconfont iconfont-clear"
                  @click.stop="handleDeleteFile02(index, uploadIndex)"
                ></i>
              </div>
            </block>
            <div
              class="img-item add"
              v-if="item.isCanUpload"
              @click="handleChooseFile02(index)"
            >
              <div class="icon"></div>
              <div>上传材料</div>
            </div>
          </div>
        </block>
      </div>
    </block>
  </div>
</template>

<script>
import imageBg from './images/bg.png'
import imageIdcardPositive from './images/idcard-positive.png'
import imageIdcardNegative from './images/idcard-negative.png'
import imageHukouMain from './images/hukou-main.png'
import ComponentImg from '@/components/common/ez-img/ez-img.vue'

import config from '@/config/index'

import {
  chooseImage,
  previewImage,
  uploadFile,
  request,
  downloadFile,
  showLoading,
  hideLoading,
  showModal,
  navigateBack,
} from '@/utils/uni-api/index'

import { USER_LIST, EDIT_SUBSIDY_INFO } from '@/store/constants' // 常量
import { mapGetters } from 'vuex'
// 默认文件带有的信息
const defaultFileInfo = {
  id: '',
  // 英文名 用于文件上传
  name_en: '',
  // 中文名 用于文件上传提示
  name_zh: '',
  // 文件网络地址
  path: '',
  // 文件提示本地地址
  staticPath: '',
  // 文件示例地址
  examplePath: '',
  // 文件示例本地地址
  exampleStaticPath: '',
  // 文件示例类型 两种类型 image 图片 page 页面
  exampleType: '',
  // 文件大小
  size: 0,
  // 是否必须上传
  isRequired: false,
  // 是否上传成功
  isUploadSuccess: false,
}

export default {
  name: 'uploadFiles',
  props: {
    // 配置参数请求地址 主动加上前缀
    urlConfig: {
      type: [String],
      default:
        '/frontRestService/frontBcpDataRestService/getWebServiceDataYgsp',
    },
    // 文件上传请求地址 主动加上前缀
    urlUpload: {
      type: [String],
      default: '/upload/uploadFile',
    },
    // 文件下载请求地址 主动加上前缀
    urlDownload: {
      type: [String],
      default: '/upload/downloadFile',
    },
    chi031: {
      type: [String],
      default: '20014',
    },
    // 过滤人员特有上传材料
    filter: {
      type: [String],
      default: '',
    },
  },
  data() {
    return {
      imageBg,
      // 渲染数据
      renderData: [],
    }
  },
  components: {
    ComponentImg,
  },
  mounted() {
    this.requestConfigFile()
  },
  methods: {
    // 请求配置文件
    requestConfigFile() {
      const url = this.urlConfig
      const chi031 = this.chi031
      const filter = this.filter
      let data = []
      const params = {
        methodName: 'B011',
        chi031,
        userList: JSON.stringify([this.userList]),
      }
      request(url, params, {}, true, false)
        .then((res) => {
          const { list } = res.lists.he11List
          if (list && list.length > 0) {
            // 筛选遍历相应人员类别对应的材料
            list.map((item) => {
              const filter_arr = filter.split(',')
              if (filter_arr.includes(item.aka131)) {
                data.push(item)
              }
            })
            // 筛选遍历不同人员类别对应的相同材料
            let dataObj = {}
            data.map((item) => {
              if (!dataObj['che092_' + item.che092]) {
                dataObj['che092_' + item.che092] = item
              }
            })
            // 转换格式
            let tempArr = []
            for (let item in dataObj) {
              tempArr.push(dataObj[item])
            }
            data = [...tempArr]
            this.formatConfigData(data)
          } else {
            this.formatConfigData([])
            showModal('该补贴项目暂未配置上传材料，请配置后重试！').then(
              (res) => {
                navigateBack(1)
              }
            )
          }
        })
        .catch((err) => {
          this.formatConfigData([])
          showModal('加载失败，请稍后重试！').then((res) => {
            navigateBack(1)
          })
        })
    },
    // 请求上传文件
    requestUploadFile(file) {
      const { isCompileToTianfuCitizenCloud } = config
      let url = this.urlUpload
      const { path } = file
      // 天府市民云
      if (isCompileToTianfuCitizenCloud) {
        url = '/upload/uploadFileByBase64'
        return new Promise((resolve, reject) => {
          request(url, {
            fileName: file.id + +new Date() + '.png',
            fileContent: path,
          })
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
      } else {
        return new Promise((resolve, reject) => {
          uploadFile(url, path, 'file', {}, {})
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
      }
    },
    // 请求文件下载
    requestDownloadFile(fileid) {
      const url = this.urlDownload
      return new Promise((resolve, reject) => {
        downloadFile(url + '/' + fileid)
          .then((res) => {
            const { tempFilePath } = res
            resolve(tempFilePath)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 预览文件
    handlePreviewImage(i, j) {
      const renderData = [...this.renderData]
      let item = renderData[i].files[j]
      const files = renderData[i].files
      const urls = []
      files.forEach((file) => {
        if (file.path) {
          urls.push(file.path)
        }
      })
      previewImage(urls, item.path)
    },

    // 格式化请求到的配置文件
    formatConfigData(listData) {
      console.log('formatConfigData', listData)
      const len = listData.length
      if (listData && len > 0) {
        const renderData = []
        for (let i = 0; i < len; i++) {
          let item = listData[i]
          // 渲染 item
          let rendItem = {
            id: 'che092_' + item.che092, // id
            isLimit: true, // 是否限制文件上传规定页数
            uploadMaxNum: 0, // 最多上传页数 配合 isLimit 使用
            uploadMinNum: 1, // 至少上传页数 配合 isLimit 使用
            isCanUpload: true, // 是否能够继续上传 配合 isLimit 使用
            name: '', // 名称 用于标题提示
            isRequired: false, // 材料是否为必传 此属性的值和 files 中 item.isRequired 的值一致
            files: [], // 包含文件
          }
          // 单类型材料上传的文件
          let fileItem = Object.assign({}, defaultFileInfo)

          // 处理一级file信息
          switch (item.che092) {
            case '100':
              rendItem.id = 'idcard'
              rendItem.name = '居民身份证'
              break
            case '101':
              rendItem.id = 'hukou'
              rendItem.name = '居民户口薄'
              break
            default:
              rendItem.id = 'other_' + item.che092
              rendItem.name = item.che091
              break
          }
          // 处理必传材料
          if (item.che09a === '1') {
            rendItem.isRequired = true
            fileItem.isRequired = true
          }
          // 处理是否上传限制规定页数材料
          if (item.che09c) {
            rendItem.isLimit = false
            rendItem.uploadMaxNum = parseInt(item.che09c)
          }

          // 处理资料文件上传页码大于0 优先获取上传限制页数
          const pageNumber = parseInt(item.che09c || item.che094)
          for (let j = 0; j < pageNumber; j++) {
            fileItem = { ...fileItem, ...item }
            fileItem.staticPath = ''
            // 处理 fileItem
            switch (item.che092) {
              case '100':
                if (j === 0) {
                  fileItem.id = 'idcard_positive'
                  fileItem.name_zh = '身份证正面'
                  fileItem.staticPath = imageIdcardPositive
                } else if (j === 1) {
                  fileItem.id = 'idcard_negative'
                  fileItem.name_zh = '身份证反面'
                  fileItem.staticPath = imageIdcardNegative
                } else {
                  fileItem.id = 'idcard_' + j
                  fileItem.name_zh = '身份证'
                }
                break
              // case '101':
              //   if (j === 0) {
              //     fileItem.id = 'hukou_main'
              //     fileItem.name_zh = '户主页'
              //     fileItem.staticPath = imageHukouMain
              //   } else if (j === 1) {
              //     fileItem.id = 'hukou_own'
              //     fileItem.name_zh = '本人页'
              //   } else {
              //     fileItem.id = 'hukou_' + j
              //     fileItem.name_zh = '户口薄'
              //   }
              //   break
              default:
                fileItem.id = 'file_' + item.che092 + '_' + j
                fileItem.name_zh = rendItem.name
                break
            }
            fileItem.name_en = fileItem.id
            rendItem.files.push(fileItem)
          }
          renderData.push(rendItem)
        }
        this.renderData = [...renderData]
        this.getUploadImages()
        this.$emit('change', true)
        console.log('renderData', renderData)
      } else {
        return
      }
    },

    // 处理选择文件
    handleChooseFile(i, j) {
      const renderData = [...this.renderData]
      const { isCompileToTianfuCitizenCloud } = config
      let item = renderData[i].files[j]
      console.log('selectItem', item)
      if (isCompileToTianfuCitizenCloud) {
        console.log('handleChooseFile=========')
        eshimin.chooseImage({
          onResponse(res) {
            const { img } = res
            item.path = 'data:image/png;base64,' + img

            this.requestUploadFile(item)
              .then((res) => {
                const data = JSON.parse(res.data)
                const { errors } = data
                // 上传出现错误
                if (errors && errors.length > 0) {
                  const errorMsg = errors[0].msg
                  item.isUploadSuccess = false
                  showModal(errorMsg).then(() => {
                    item.path = ''
                    item.size = ''
                    this.renderData = [...renderData]
                  })
                } else {
                  const { resultData } = data.data
                  if (resultData.code === '1') {
                    const { fileid, filename } = resultData.data
                    item.isUploadSuccess = true
                    item.fileid = fileid
                    item.filename = filename
                  } else {
                    item.isUploadSuccess = false
                    item.path = ''
                    item.size = ''
                    this.renderData = [...renderData]
                    showModal(resultData.message)
                  }
                }
              })
              .catch((err) => {
                item.path = ''
                item.isUploadSuccess = false
                showModal(err.errMsg)
              })
              .finally(() => {
                this.renderData = [...renderData]
                hideLoading()
              })

            console.log('chooseImage res 01:' + res)
            alert(res)
          },
        })
      } else {
        // 已上传 预览
        if (item.path) {
          const files = renderData[i].files
          const urls = []
          files.forEach((file) => {
            if (file.path) {
              urls.push(file.path)
            }
          })
          previewImage(urls, item.path)
        } else {
          // 未上传 上传
          chooseImage(1).then((res) => {
            showLoading('上传中')
            // 目前只针对处理上传时选择一张图片
            const tempFile = res.tempFiles[0]
            const { path, size } = tempFile
            item.path = path
            item.size = size
            this.requestUploadFile(item)
              .then((res) => {
                const data = JSON.parse(res.data)
                const { errors } = data
                // 上传出现错误
                if (errors && errors.length > 0) {
                  const errorMsg = errors[0].msg
                  item.isUploadSuccess = false
                  showModal(errorMsg).then(() => {
                    item.path = ''
                    item.size = ''
                    this.renderData = [...renderData]
                  })
                } else {
                  const { resultData } = data.data
                  if (resultData.code === '1') {
                    const { fileid, filename } = resultData.data
                    item.isUploadSuccess = true
                    item.fileid = fileid
                    item.filename = filename
                  } else {
                    item.isUploadSuccess = false
                    item.path = ''
                    item.size = ''
                    this.renderData = [...renderData]
                    showModal(resultData.message)
                  }
                }
              })
              .catch((err) => {
                item.path = ''
                item.isUploadSuccess = false
                showModal(err.errMsg)
              })
              .finally(() => {
                this.renderData = [...renderData]
                hideLoading()
              })
          })
        }
      }
    },

    // 处理选择文件
    handleChooseFile02(i) {
      const renderData = [...this.renderData]
      let item = renderData[i]
      let fileItem = {}
      let fileIndex = 0
      console.log(item, 'item=====================')
      for (let index = 0, len = item.files.length; index < len; index++) {
        const ele = item.files[index]
        if (!ele.path) {
          fileItem = { ...ele }
          fileIndex = index
          break
        }
      }
      const { isCompileToTianfuCitizenCloud } = config
      if (isCompileToTianfuCitizenCloud) {
        console.log('handleChooseFile 02=========')
        eshimin.chooseImage({
          onResponse(res) {
            const { img } = res
            item.path = 'data:image/png;base64,' + img

            this.requestUploadFile(fileItem)
              .then((res) => {
                const data = JSON.parse(res.data)
                const { errors } = data
                // 上传出现错误
                if (errors && errors.length > 0) {
                  const errorMsg = errors[0].msg
                  fileItem.isUploadSuccess = false
                  showModal(errorMsg).then(() => {
                    fileItem.path = ''
                    fileItem.size = ''
                    item.files[fileIndex] = { ...fileItem }
                    this.renderData = [...renderData]
                  })
                } else {
                  const { resultData } = data.data
                  if (resultData.code === '1') {
                    const { fileid, filename } = resultData.data
                    fileItem.isUploadSuccess = true
                    fileItem.fileid = fileid
                    fileItem.filename = filename
                  } else {
                    fileItem.isUploadSuccess = false
                    showModal(resultData.message)
                  }
                  item.files[fileIndex] = { ...fileItem }

                  // 计算是否添加可用
                  let num = 0
                  item.files.map((ele) => {
                    if (ele.path) {
                      num++
                    }
                  })
                  if (num < item.uploadMaxNum) {
                    item.isCanUpload = true
                  } else {
                    item.isCanUpload = false
                  }
                  this.renderData = [...renderData]
                }
              })
              .catch((err) => {
                fileItem.isUploadSuccess = false
                item.files[fileIndex] = { ...fileItem }
                this.renderData = [...renderData]
                showModal(err.errMsg)
              })
              .finally(() => {
                hideLoading()
              })

            console.log('chooseImage res 02:' + res)
            alert(res)
          },
        })
      } else {
        chooseImage(1).then((res) => {
          showLoading('上传中')
          // 目前只针对处理上传时选择一张图片
          const tempFile = res.tempFiles[0]
          const { path, size } = tempFile
          fileItem.path = path
          fileItem.size = size
          this.requestUploadFile(fileItem)
            .then((res) => {
              const data = JSON.parse(res.data)
              const { errors } = data
              // 上传出现错误
              if (errors && errors.length > 0) {
                const errorMsg = errors[0].msg
                fileItem.isUploadSuccess = false
                showModal(errorMsg).then(() => {
                  fileItem.path = ''
                  fileItem.size = ''
                  item.files[fileIndex] = { ...fileItem }
                  this.renderData = [...renderData]
                })
              } else {
                const { resultData } = data.data
                if (resultData.code === '1') {
                  const { fileid, filename } = resultData.data
                  fileItem.isUploadSuccess = true
                  fileItem.fileid = fileid
                  fileItem.filename = filename
                } else {
                  fileItem.isUploadSuccess = false
                  showModal(resultData.message)
                }
                item.files[fileIndex] = { ...fileItem }

                // 计算是否添加可用
                let num = 0
                item.files.map((ele) => {
                  if (ele.path) {
                    num++
                  }
                })
                if (num < item.uploadMaxNum) {
                  item.isCanUpload = true
                } else {
                  item.isCanUpload = false
                }
                this.renderData = [...renderData]
              }
            })
            .catch((err) => {
              fileItem.isUploadSuccess = false
              item.files[fileIndex] = { ...fileItem }
              this.renderData = [...renderData]
              showModal(err.errMsg)
            })
            .finally(() => {
              hideLoading()
            })
        })
      }
    },
    // 处理删除文件
    handleDeleteFile(i, j) {
      const renderData = [...this.renderData]
      let item = renderData[i].files[j]
      item.path = ''
      item.isUploadSuccess = false
      item.fileid = ''
      item.filename = ''
      this.renderData = [...renderData]
    },
    // 处理删除文件
    handleDeleteFile02(i, j) {
      const renderData = [...this.renderData]
      let item = renderData[i]
      let fileItem = item.files[j]
      fileItem.path = ''
      fileItem.isUploadSuccess = false
      fileItem.fileid = ''
      fileItem.filename = ''

      // 计算是否添加可用
      let num = 0
      item.files.map((ele) => {
        if (ele.path) {
          num++
        }
      })
      if (num < item.uploadMaxNum) {
        item.isCanUpload = true
      } else {
        item.isCanUpload = false
      }

      this.renderData = [...renderData]
    },
    // 清空 重新上传
    clear() {
      console.log('清空 重新上传')
      this.renderData = []
      this.requestConfigFile()
    },
    // 检测文件上传状态
    checkFilesUploadStatus() {
      const renderData = [...this.renderData]
      let tagError = false // 标记 是否有未上传资料
      let tagErrorStr = '' // 标记 是否有未上传资料
      // 返回结果
      let result = {
        status: '1', // 0 失败 1 成功
        data: [],
      }
      // 上传失败或者未上传
      const uploadError = []
      for (let i = 0, len = renderData.length; i < len; i++) {
        const item = renderData[i]
        // 非必传 跳过
        if (!item.isRequired) {
          continue
        } else {
          // 必传
          // 限制上传页数
          if (item.isLimit) {
            const files = item.files
            for (let j = 0, jLen = files.length; j < jLen; j++) {
              const itemFile = files[j]
              // 未上传成功
              if (!itemFile.isUploadSuccess) {
                uploadError.push(itemFile)
                tagError = true
                result.status = '0'
                break
              }
            }
            if (tagError) {
              break
            }
          } else {
            tagErrorStr = ''
            const files = item.files
            let itemFile = {}
            for (let j = 0, jLen = files.length; j < jLen; j++) {
              itemFile = files[j]
              if (itemFile.isUploadSuccess) {
                tagErrorStr = 'limit_success'
                break
              }
            }
            if (tagErrorStr !== 'limit_success') {
              uploadError.push(itemFile)
              tagError = true
              result.status = '0'
            }
          }
        }
      }
      // 有未上传成功文件
      if (uploadError.length > 0) {
        result.data = [...uploadError]
        return result
      } else {
        const successFils = []
        for (let i = 0, len = renderData.length; i < len; i++) {
          const item = renderData[i].files
          for (let j = 0, jLen = item.length; j < jLen; j++) {
            const itemfile = item[j]
            if (itemfile.isUploadSuccess) {
              successFils.push(itemfile)
            }
          }
        }
        result.data = [...successFils]
        return result
      }
    },
    // 获取已上传的图片
    async getUploadImages() {
      const renderData = [...this.renderData]
      const { hi21List } = this.editSubsidyInfo
      const tempArr = []
      if (!hi21List || renderData.length < 1) {
        return
      }

      for (let i = 0, len = hi21List.length; i < len; i++) {
        const item = hi21List[i]
        const res = await this.requestDownloadFile(item.chi215)
        tempArr.push({
          ...item,
          tempSrc: res,
        })
      }

      for (let i = 0, iLen = renderData.length; i < iLen; i++) {
        const iItem = renderData[i]
        const { files } = iItem
        for (let j = 0, jLen = files.length; j < iLen; j++) {
          const jItem = files[j]
          for (let z = 0, zLen = tempArr.length; z < zLen; z++) {
            const zItem = tempArr[z]
            if (jItem.che110 === zItem.che110) {
              jItem.isUploadSuccess = true
              jItem.path = zItem.tempSrc
              jItem.filename = zItem.chi212
              jItem.fileid = zItem.chi215
            }
          }
        }
      }
      this.renderData = [...renderData]
      console.log(tempArr, renderData, 'tempArr')
    },
  },
  computed: { ...mapGetters([USER_LIST, EDIT_SUBSIDY_INFO]) },
  watch: {
    // 'editSubsidyInfo.hi21List': {
    //   handler(val) {
    //     if(val) {
    //     }
    //     console.log('editSubsidyInfo.hi21List', val)
    //     this.getUploadImages()
    //   },
    //   immediate: true,
    // },
  },
}
</script>

<style lang="scss" scoped>
/* #ifdef MP-WEIXIN */
/* #endif */

$border-raidus: 16rpx;
view {
  box-sizing: border-box;
}
.ez-upload-files-wrapper {
  width: 100%;
  padding: 0 $spacing;
  color: #3d424d;
}
.item-wrapper {
  width: 100%;
  background-color: #fff;
  border-radius: $border-raidus;
  margin-bottom: $spacing;
  padding-bottom: 40rpx;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
  &.no-limit {
    padding-bottom: 0;
  }
}
.item-example {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 104rpx;
  background-color: #d9e7ff;
  background-color: rgba($color: $primary, $alpha: 0.25);
  padding: 0 $spacing;
  font-size: 32rpx;
  font-weight: 700;
  .right {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-weight: 500;
    color: $primary;
    .iconfont-arrow-right-double {
      font-size: 28rpx - 4rpx;
      font-weight: 400;
      padding-left: 4px;
    }
  }
}
.item-title {
  padding-right: $spacing;
  padding-left: $spacing + 26rpx;
  position: relative;
  font-size: 32rpx;
  font-weight: 700;
  line-height: 1;
  margin: $spacing 0 $spacing - 20rpx;
  &::before {
    content: '';
    width: 8rpx;
    height: 32rpx;
    background-color: $primary;
    border-radius: 2rpx;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: $spacing;
  }
}
.item-upload {
  width: 100%;
  font-size: 28rpx;
  font-weight: 700;
  text-align: center;
  line-height: 1;
  color: $primary;
  position: relative;
  display: flex;
  width: 686rpx;
  width: 100%;
  height: 486rpx;
  padding: $spacing $spacing $spacing / 2;
  img {
    display: block;
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 486rpx;
  }
  /* #ifdef H5 */
  img[src=''],
  img:not([src]) {
    display: none;
  }
  /* #endif */

  .eg {
    width: 560rpx;
    height: 340rpx;
    margin: auto;
    &.uploaded {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .tip {
    width: 100%;
    white-space: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    padding: 0 40rpx;
    .iconfont-camera {
      width: 160rpx;
      height: 160rpx;
      line-height: 160rpx;
      background-color: #cde2fe;
      background-color: tint($primary, 75);
      border-radius: 50%;
      font-size: 68rpx;
      margin: auto;
    }
    .span {
      width: 100%;

      line-height: 1.5;
      padding-top: 8rpx;
      white-space: normal;
      span {
        text-align: left;
        display: inline-block;
      }
    }
  }
  .iconfont-delete {
    font-size: 48rpx;
    position: absolute;
    right: $spacing + 20rpx;
    bottom: $spacing / 2 + 20rpx;
  }
}
.img-wrapper {
  padding: 30rpx;
  .img-item {
    width: 194rpx;
    height: 194rpx;
    margin-right: 24rpx;
    margin-bottom: 24rpx;
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 100%;
      background-color: #f7f8fa;
      border-radius: 5rpx;
      overflow: hidden;
    }
    .iconfont-clear {
      font-size: 42rpx;
      position: absolute;
      right: -16rpx;
      top: -16rpx;
      color: #f00;
    }
    &:nth-of-type(3n) {
      margin-right: 0;
    }
    &.add {
      background-color: #f7f8fa;
      border-radius: 5rpx;
      font-size: 26rpx;
      font-weight: 700;
      line-height: 38rpx;
      color: $primary;
      text-align: center;
      padding-top: 40rpx;
      .icon {
        width: 74rpx;
        height: 74rpx;
        position: relative;
        margin: 0 auto;
        margin-bottom: 16rpx;
        &::before,
        &::after {
          content: '';
          position: absolute;
          border-radius: 8px;
          background-color: $primary;
        }
        &::before {
          width: 100%;
          height: 8rpx;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        &::after {
          width: 8rpx;
          height: 100%;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>
