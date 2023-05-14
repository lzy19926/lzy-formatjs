"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIntl = void 0;
const index_1 = require("../fast-memoize/index");
const IntlMessageFormat_1 = require("./IntlMessageFormat");
const format_1 = require("./format");
// 此类通过封装JS原生Intl类,做了如下两件事情
// 1. 将用户的国际化数据缓存起来
// 2. 读取用户自定义国际化参数,实现不同的国际化逻辑
// 3. 封装原生Intl.DateTimeFormat等方法,将其记忆化(使用fast-memoize库包裹起来,并创建对应的缓存池对象)
// 4. 创建IntlMessageFormat类,挂载到Intl类上,实现Message的转换
/**国际化数据缓存,保存创建的各个Intl实例对象,通过fast-memoize进行缓存*/
function createIntlCache() {
    return {
        dateTime: {},
        number: {},
        message: {},
        relativeTime: {},
        pluralRules: {},
    };
}
/**初始化并解析国际化参数*/
function resolveIntlconfig(config) {
    const initialConfig = {
        formats: {},
        messages: {},
        timeZone: undefined,
        defaultLocale: "zh",
        defaultFormats: "yyyy:MM:dd",
    };
    return Object.assign(initialConfig, config);
}
/**创建Formatters,对原生Intl对象的format进行缓存*/
// 创建JS原生Intl模块的DateTimeFormat实例
// 使用memoize包裹函数(记忆化函数 缓存函数结果)
function createFormatters() {
    // 创建给memoize使用的Intl缓存池
    const cache = createIntlCache();
    //  Intl.DateTimeFormat: 用于格式化日期和时间。
    const getDateTimeFormat = (0, index_1.memoize)((...args) => new Intl.DateTimeFormat(...args), {
        cache: (0, index_1.createFastMemoizeCache)(cache.dateTime)
    });
    // Intl.NumberFormat: 用于格式化数字。
    const getNumberFormat = (0, index_1.memoize)((...args) => new Intl.NumberFormat(...args), {
        cache: (0, index_1.createFastMemoizeCache)(cache.number)
    });
    // Intl.RelativeTimeFormat: 用于格式化相对时间（例如“3 天前”）。
    const getRelativeTimeFormat = (0, index_1.memoize)((...args) => new Intl.RelativeTimeFormat(...args), {
        cache: (0, index_1.createFastMemoizeCache)(cache.relativeTime)
    });
    // Intl.PluralRules: 用于确定给定数量的复数形式。
    const getPluralRules = (0, index_1.memoize)((...args) => new Intl.PluralRules(...args), {
        cache: (0, index_1.createFastMemoizeCache)(cache.pluralRules)
    });
    //todo 自定义messageFormat,用于转换数据
    const getMessageFormat = (0, index_1.memoize)((message, locales) => new IntlMessageFormat_1.IntlMessageFormat(message, locales), {
        cache: (0, index_1.createFastMemoizeCache)(cache.message)
    });
    return {
        getDateTimeFormat,
        getNumberFormat,
        getRelativeTimeFormat,
        getPluralRules,
        getMessageFormat
    };
}
/**为自定义的format方法注入参数*/
function createIntlFormatters(resolvedIntlconfig, formatters) {
    return {
        formatDate: format_1.formatDate.bind(undefined, resolvedIntlconfig, formatters.getDateTimeFormat),
        formatTime: format_1.formatTime.bind(undefined, resolvedIntlconfig, formatters.getDateTimeFormat),
        formatNumber: format_1.formatNumber.bind(undefined, resolvedIntlconfig, formatters.getNumberFormat),
        formatPluralRules: format_1.formatPluralRules.bind(undefined, resolvedIntlconfig, formatters.getPluralRules),
        formatRelativeTime: format_1.formatRelativeTime.bind(undefined, resolvedIntlconfig, formatters.getRelativeTimeFormat),
        formatMessage: format_1.formatMessage.bind(undefined, resolvedIntlconfig, formatters.getMessageFormat)
    };
}
//! ---------主要逻辑  创建一个Intl实例 内部保存了
/**创建一个Intl实例*/
function createIntl(config) {
    const resolvedIntlconfig = resolveIntlconfig(config);
    const formatters = createFormatters();
    const IntlFormatters = createIntlFormatters(resolvedIntlconfig, formatters);
    return Object.assign({ config: resolvedIntlconfig, formatters }, IntlFormatters);
}
exports.createIntl = createIntl;
//# sourceMappingURL=Intl.js.map