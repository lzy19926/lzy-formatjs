## 二次封装原生Intl类实现的国际化工具(适用于Lzy-React)

- 基本设计源于React-Intl
- 通过React.context进行集成
- 通过Ruzy与Lzy-React进行集成


## TODO
- 简化配置项
- 集成Lzy-React(暂不支持component)

## 基类使用

```js
import { createIntl } from 'lzy-formatjs'

const messages_en = {
    hellow: "hellow,{name}!",
    bye: "bye,{name}!",
}
const messages_zh = {
    hellow: "你好,{name}",
    bye: "再见,{name}!",
}
// 创建配置
const config_en = {
    locale: 'en',
    timeZone: "",
    formats: {},
    messages: messages_en,
    defaultLocale: "en",
    defaultFormats: "",
    onError: (e: Error) => {
        console.log("错误:", e);
    }
}
const config_zh = {
    locale: 'zh',
    timeZone: "",
    formats: {},
    messages: messages_zh,
    defaultLocale: "zh",
    defaultFormats: "",
    onError: (e: Error) => {
        console.log("错误:", e);
    }
}

// 创建Intl实例对象
const Intl_EN = createIntl(config_en)
const Intl_ZH = createIntl(config_zh)

// -------------国际化自定义文本(message国际化)-----------------------
const msg1 = Intl_EN.formatMessage({ id: "hellow" }, { name: "zhangsan" }) // 'hellow,zhangsan!'
const msg2 = Intl_EN.formatMessage({ id: "bye" }, { name: "zhangsan" })// 'bye,zhangsan!'
const msg3 = Intl_ZH.formatMessage({ id: "hellow" }, { name: "张三" })// '你好,张三'
const msg4 = Intl_ZH.formatMessage({ id: "bye" }, { name: "张三" })// '再见,张三!'

// -------------------国际化Date-------------------
const dateOption = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

const msg5 = Intl_EN.formatDate(new Date(), dateOption) // 'Monday, May 8, 2023'
const msg6 = Intl_ZH.formatDate(new Date(), dateOption) // 2023年5月8日星期一

// -------------------国际化货币-------------------
const msg7 = Intl_EN.formatNumber(1000, { // $1,000.00
    style: 'currency',
    currency: 'USD'
})
const msg8 = Intl_ZH.formatNumber(1000, { // ¥1,000.00
    style: 'currency',
    currency: 'CNY'
})

// -------------------国际化时间-------------------
const timeOption = {
    second: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
    day: 'numeric',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
}
const msg9 = Intl_EN.formatTime(new Date(), timeOption) // 8, 10:38:07 AM
const msg10 = Intl_ZH.formatTime(new Date(), timeOption)// 8日 10:38:07


```