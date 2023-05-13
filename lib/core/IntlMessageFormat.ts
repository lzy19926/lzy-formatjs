
// IntlMessageFormat类  是对原生Intl类的延伸 Intl.TimeDataFormat
// 用于格式化message文本
// 它是基于 ICU Message Format 标准构建的，这是一个广泛使用的国际化消息格式规范。

// const messages_en = 'Hello, {name}!'
// const messages_zh = '你好, {name}!'

// const formatter1 = new IntlMessageFormat(messages_en, 'en');
// const formatter2 = new IntlMessageFormat(messages_zh, 'zh');

// console.log(formatter1.format({ name: 'John' })); // 输出：Hello, John!
// console.log(formatter2.format({ name: 'John' })); // 输出：Bonjour, John !

import type { MessagesFormatValues } from './types'

export class IntlMessageFormat {

    private readonly message: string | undefined
    private readonly locales: string | string[]

    constructor(
        message: string,
        locales: string | string[]
    ) {
        this.message = message
        this.locales = locales
    }

    // 进行转换
    format(values: MessagesFormatValues) {
        const parts = this.formatToParts(values) // 解析value
        const result = this.partToResult(parts)  // 给结果赋值

        return result
    }

    // 解析value
    formatToParts(values: MessagesFormatValues) {
        return values
    }

    // 给结果赋值(正则替换占位符)
    partToResult(parts: any) {
        let originMessage = this.message || ""

        Object.keys(parts).forEach(partKey => {
            let partValue = parts[partKey]
            var regex = new RegExp('\\{' + partKey + '\\}', 'g');
            originMessage = originMessage.replace(regex, partValue);
        })
        return originMessage
    }
}