/**

注意，此文件修改后不要提交到svn，避免与其他地市引起冲突

四川省行政区划代码
银海： 510000
成都市： 510100
自贡市： 510300
攀枝花市： 510400
泸州市： 510500
德阳市： 510600
绵阳市： 510700
广元市： 510800
遂宁市： 510900
内江市： 511000
乐山市： 511100
南充市： 511300
眉山市： 511400
宜宾市： 511500
广安市： 511600
达州市： 511700
雅安市： 511800
巴中市： 511900
资阳市： 512000
阿坝州： 513200
甘孜州： 513300
凉山州： 513400
*/

// 当前地市编码 各地根据自己地市修改，修改后不要提交到svn
const areaCode = '511000'
// wx7857fb8164d33dca
// 测试地址 开发时采用测试地址
// http://192.168.77.67:8090/ta404
// http://192.168.77.67:8090/ta404
// http://p9bsru.natappfree.cc/ta404
// http://192.168.8.114:8082/ta404 yz
// http://192.168.77.67:8082/ta404 xt
// http://192.168.78.184:8084/ta404 yb
const testRequestUrl = 'https://www.scnjhrss.com'

// 甘孜 达州

// 正式地址
// 成都市正式环境地址 https://hmhn.cdcz.chengdu.gov.cn
// 自贡市正式环境地址 https://zghmhnykt.com
// 攀枝花市正式环境地址 https://hmhnykt.pzhrsxxzx.cn
// 泸州市正式环境地址 https://www.lzykt.cn
// 德阳市正式环境地址
// 绵阳市正式环境地址
// 广元市正式环境地址
// 遂宁市正式环境地址 https://snykt.sn12333.org
// 内江市正式环境地址 https://www.scnjhrss.com
// 乐山市正式环境地址
// 南充市正式环境地址 https://www.scncykt.com/api
// 眉山市正式环境地址
// 宜宾市正式环境地址 http://ykt.yibinhrss.gov.cn
// 广安市正式环境地址 https://hrss.guang-an.gov.cn
// 达州市正式环境地址 https://www.dazhouykt.cn
// 雅安市正式环境地址 https://hmhnwx.yarsj.org.cn
// 巴中市正式环境地址 https://bzykt.cn
// 资阳市正式环境地址
// 阿坝州正式环境地址
// 甘孜州正式环境地址 https://www.gzrswx.com
// 凉山州正式环境地址 https://wt.lsz.gov.cn:8005
const formalRequestUrl = 'https://www.scnjhrss.com'

export { areaCode, testRequestUrl, formalRequestUrl }
