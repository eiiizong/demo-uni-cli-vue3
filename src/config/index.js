// 此文件随意修改提交
import { areaCode } from '@/config/city'
// 以下三个文件 根据启动的小程序使用相应的代码
import configCities from '@/config/ykt/index' // 启动 一卡通 小程序需要使用
// import configCities from '@/config/ydjd/index' // 启动 移动监督 小程序需要使用
// import configCities from '@/config/ydsh/index' // 启动 移动审核 小程序需要使用

let name = 'config' + areaCode
let config = { ...configCities[name] }
export default config
