## 二次封装原生Intl类实现的国际化工具(适用于Lzy-React)

- 基本设计源于React-Intl
- 通过React.context进行集成
- 通过Ruzy状态管理器与Lzy-React进行集成


## TODO
- 简化配置项

## Lzy-React框架集成
```js
// 创建国际化配置文本
const messages_zh = {
     hellow: "你好,{name}",
}
const messages_en = {
    hellow: "hellow,{name}!",
}
const config_zh = {
    locale: 'zh',
    messages: messages_zh,
}
const config_en = {
    locale: 'en',
    messages: messages_en,
}
```

```js
// 组件内使用
import LzyReact, { render } from 'lzy-react'
import { FormatMessage, FormatMessageProvider, changeIntl } from 'lzy-formatjs'

// 提供切换语言配置方法
const changeLanguage = () => { changeIntl(config_en) }

// 使用FormatMessageProvider组件给下级组件提供国际化配置
// 使用FormatMessage组件渲染对应的文本节点
export function App() {
    return (
        <FormatMessageProvider config={config_zh}> 
            <button onClick={changeLanguage}>切换语言</button>

            <FormatMessage id="hellow" values={{ name: "张三" }} />
            <FormatMessage id="fxxk" values={{ name: "张三" }} />
        </FormatMessageProvider>
    )
}

render(<App />, document.getElementById('root'))

```

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