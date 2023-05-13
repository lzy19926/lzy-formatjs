//todo -------定义多个格式化方法,挂载到Intl实例中-----------------
// 各format方法统一使用Intl对象包装后formatter的方法,

// 使用: 
// const myIntl = createIntl()
// myIntl.formatMessage({id:"hellow"},{name:"张三"})


import type { MessageDescriptor, IntlConfig, Formatters, MessagesFormatValues } from './types'

// 下列函数的类型定义
export interface IntlFormatters {
    formatDate(
        value: Parameters<Intl.DateTimeFormat['format']>[0] | string, // 从Intl.DateTimeFormat的format方法中获取[0]号参数的类型
        opts?: Intl.DateTimeFormatOptions
    ): string
    formatTime(
        value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
        opts?: Intl.DateTimeFormatOptions
    ): string
    formatRelativeTime(
        value: Parameters<Intl.RelativeTimeFormat['format']>[0],
        unit?: Intl.RelativeTimeFormatUnit,
        opts?: Intl.RelativeTimeFormatOptions
    ): string
    formatNumber(
        value: Parameters<Intl.NumberFormat['format']>[0],
        opts?: Intl.NumberFormatOptions
    ): string
    formatPluralRules(
        value: Parameters<Intl.PluralRules['select']>[0],
        opts?: Intl.PluralRulesOptions
    ): ReturnType<Intl.PluralRules['select']>
    formatMessage(
        descriptor: MessageDescriptor,
        values?: MessagesFormatValues
    ): string
}

//todo ------------- 格式化number方法
export function formatNumber(
    config: IntlConfig,
    getNumberFormat: Formatters['getNumberFormat'], // 通过这种方式获取ts接口的方法
    value: number,
    options?: Parameters<IntlFormatters['formatNumber']>[1] // 获取formatNumber方法的第一个参数
) {
    // 获取formatter并执行format方法,捕获错误并执行config中的错误回调
    const { locale, onError } = config
    try {
        return getNumberFormat(locale, options).format(value)
    } catch (e) {
        onError(new Error("Error formatting number:" + e))
    }

    return String(value)
}

//todo ------------- 格式化Data方法----------
export function formatDate(
    config: IntlConfig,
    getDateTimeFormat: Formatters['getDateTimeFormat'],
    value: string,
    options?: Parameters<IntlFormatters['formatDate']>[1]
) {

    const { locale, onError, timeZone } = config
    const date = typeof value === 'string' ? new Date(value || 0) : value

    try {
        return getDateTimeFormat(locale, options).format(date)
    } catch (e) {
        onError(new Error("Error formatting Date" + e))
    }

    return String(date)
}

//todo ------------- 格式化Time方法
export function formatTime(
    config: IntlConfig,
    getDateTimeFormat: Formatters['getDateTimeFormat'], // 通过这种方式获取ts接口的方法
    value: number,
    options?: Parameters<IntlFormatters['formatTime']>[1] // 获取getNumberFormat方法的第一个参数
) {
    const { locale, onError, timeZone } = config
    const date = typeof value === 'string' ? new Date(value || 0) : value

    try {
        return getDateTimeFormat(locale, options).format(date)
    } catch (e) {
        onError(new Error("Error formatting Time" + e))
    }

    return String(date)
}

//todo ------------- 格式化RelativeTime方法
export function formatRelativeTime(
    config: IntlConfig,
    getRelativeTimeFormat: Formatters['getRelativeTimeFormat'],
    value: number,
    unit?: Parameters<IntlFormatters['formatRelativeTime']>[1],
    options?: Parameters<IntlFormatters['formatRelativeTime']>[2]
) {
    const { locale, onError } = config
    if (!unit) { unit = 'second' }

    try {
        return getRelativeTimeFormat(locale, options).format(value, unit)
    } catch (e) {
        onError(new Error("Error formatting RelativeTime" + e))
    }

    return String(value)
}

//todo ------------- 格式化PluralRules方法
export function formatPluralRules(
    config: IntlConfig,
    getPluralRules: Formatters['getPluralRules'], // 通过这种方式获取ts接口的方法
    value: number,
    options?: Parameters<IntlFormatters['formatPluralRules']>[1] // 获取getNumberFormat方法的第一个参数
) {
    const { locale, onError } = config

    try {
        return getPluralRules(locale, options).select(value)
    } catch (e) {
        onError(new Error("Error formatting PluralRules" + e))
    }

    return 'other'
}

//todo ------------- 格式化message方法
export function formatMessage(
    config: IntlConfig,
    getMessageFormat: Formatters['getMessageFormat'],
    messageDescriptor: Parameters<IntlFormatters['formatMessage']>[0],
    values?: Parameters<IntlFormatters['formatMessage']>[1],
) {
    const { locale, onError, messages } = config
    const { id, defaultMessage = "", description } = messageDescriptor

    const message = messages[id]

    try {
        return getMessageFormat(message, locale).format(values)
    } catch (e) {
        onError(new Error("Error formatting number" + e))
    }

    return defaultMessage
}

