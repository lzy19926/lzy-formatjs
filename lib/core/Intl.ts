import { memoize, createFastMemoizeCache, Cache } from '../fast-memoize/index'
import { IntlMessageFormat } from './IntlMessageFormat'
import {
    formatDate,
    formatTime,
    formatMessage,
    formatNumber,
    formatPluralRules,
    formatRelativeTime
} from './format'
import type { IntlFormatters } from './format'
import type { IntlCache, IntlConfig, Formatters } from './types'

// 此类通过封装JS原生Intl类,做了如下两件事情

// 1. 将用户的国际化数据缓存起来
// 2. 读取用户自定义国际化参数,实现不同的国际化逻辑
// 3. 封装原生Intl.DateTimeFormat等方法,将其记忆化(使用fast-memoize库包裹起来,并创建对应的缓存池对象)
// 4. 创建IntlMessageFormat类,挂载到Intl类上,实现Message的转换


/**国际化数据缓存,保存创建的各个Intl实例对象,通过fast-memoize进行缓存*/
function createIntlCache(): IntlCache {
    return {
        dateTime: {}, // 日期
        number: {},   // 数字
        message: {},  // 文字
        relativeTime: {},
        pluralRules: {},
    }
}

/**初始化并解析国际化参数*/
function resolveIntlconfig(config: IntlConfig): IntlConfig {
    const initialConfig = {
        formats: {},
        messages: {},
        timeZone: undefined,
        defaultLocale: "zh",
        defaultFormats: "yyyy:MM:dd",
    }

    return Object.assign(initialConfig, config)
}

/**创建Formatters,对原生Intl对象的format进行缓存*/
// 创建JS原生Intl模块的DateTimeFormat实例
// 使用memoize包裹函数(记忆化函数 缓存函数结果)
function createFormatters(): Formatters {

    // 创建给memoize使用的Intl缓存池
    const cache: IntlCache = createIntlCache()

    //  Intl.DateTimeFormat: 用于格式化日期和时间。
    const getDateTimeFormat = memoize((...args) => new Intl.DateTimeFormat(...args), {
        cache: createFastMemoizeCache(cache.dateTime)
    })

    // Intl.NumberFormat: 用于格式化数字。
    const getNumberFormat = memoize((...args) => new Intl.NumberFormat(...args), {
        cache: createFastMemoizeCache(cache.number)
    })

    // Intl.RelativeTimeFormat: 用于格式化相对时间（例如“3 天前”）。
    const getRelativeTimeFormat = memoize((...args) => new Intl.RelativeTimeFormat(...args), {
        cache: createFastMemoizeCache(cache.relativeTime)
    })

    // Intl.PluralRules: 用于确定给定数量的复数形式。
    const getPluralRules = memoize((...args) => new Intl.PluralRules(...args), {
        cache: createFastMemoizeCache(cache.pluralRules)
    })

    //todo 自定义messageFormat,用于转换数据
    const getMessageFormat = memoize((message, locales) => new IntlMessageFormat(message, locales), {
        cache: createFastMemoizeCache(cache.message)
    })

    return {
        getDateTimeFormat,
        getNumberFormat,
        getRelativeTimeFormat,
        getPluralRules,
        getMessageFormat
    }
}

/**为自定义的format方法注入参数*/
function createIntlFormatters(resolvedIntlconfig: IntlConfig, formatters: Formatters): IntlFormatters {
    return {
        formatDate: formatDate.bind(
            undefined,
            resolvedIntlconfig,
            formatters.getDateTimeFormat
        ),
        formatTime: formatTime.bind(
            undefined,
            resolvedIntlconfig,
            formatters.getDateTimeFormat
        ),
        formatNumber: formatNumber.bind(
            undefined,
            resolvedIntlconfig,
            formatters.getNumberFormat
        ),
        formatPluralRules: formatPluralRules.bind(
            undefined,
            resolvedIntlconfig,
            formatters.getPluralRules
        ),
        formatRelativeTime: formatRelativeTime.bind(
            undefined,
            resolvedIntlconfig,
            formatters.getRelativeTimeFormat
        ),
        formatMessage: formatMessage.bind(
            undefined,
            resolvedIntlconfig,
            formatters.getMessageFormat
        )
    }

}

//! ---------主要逻辑  创建一个Intl实例 内部保存了
/**创建一个Intl实例*/
export function createIntl(config: IntlConfig) {
    const resolvedIntlconfig = resolveIntlconfig(config)
    const formatters = createFormatters()
    const IntlFormatters = createIntlFormatters(resolvedIntlconfig, formatters)

    return {
        config: resolvedIntlconfig,
        formatters,
        ...IntlFormatters
    }
}
