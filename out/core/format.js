"use strict";
//todo -------定义多个格式化方法,挂载到Intl实例中-----------------
// 各format方法统一使用Intl对象包装后formatter的方法,
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMessage = exports.formatPluralRules = exports.formatRelativeTime = exports.formatTime = exports.formatDate = exports.formatNumber = void 0;
//todo ------------- 格式化number方法
function formatNumber(config, getNumberFormat, // 通过这种方式获取ts接口的方法
value, options // 获取formatNumber方法的第一个参数
) {
    // 获取formatter并执行format方法,捕获错误并执行config中的错误回调
    const { locale, onError } = config;
    try {
        return getNumberFormat(locale, options).format(value);
    }
    catch (e) {
        onError(new Error("Error formatting number:" + e));
    }
    return String(value);
}
exports.formatNumber = formatNumber;
//todo ------------- 格式化Data方法----------
function formatDate(config, getDateTimeFormat, value, options) {
    const { locale, onError, timeZone } = config;
    const date = typeof value === 'string' ? new Date(value || 0) : value;
    try {
        return getDateTimeFormat(locale, options).format(date);
    }
    catch (e) {
        onError(new Error("Error formatting Date" + e));
    }
    return String(date);
}
exports.formatDate = formatDate;
//todo ------------- 格式化Time方法
function formatTime(config, getDateTimeFormat, // 通过这种方式获取ts接口的方法
value, options // 获取getNumberFormat方法的第一个参数
) {
    const { locale, onError, timeZone } = config;
    const date = typeof value === 'string' ? new Date(value || 0) : value;
    try {
        return getDateTimeFormat(locale, options).format(date);
    }
    catch (e) {
        onError(new Error("Error formatting Time" + e));
    }
    return String(date);
}
exports.formatTime = formatTime;
//todo ------------- 格式化RelativeTime方法
function formatRelativeTime(config, getRelativeTimeFormat, value, unit, options) {
    const { locale, onError } = config;
    if (!unit) {
        unit = 'second';
    }
    try {
        return getRelativeTimeFormat(locale, options).format(value, unit);
    }
    catch (e) {
        onError(new Error("Error formatting RelativeTime" + e));
    }
    return String(value);
}
exports.formatRelativeTime = formatRelativeTime;
//todo ------------- 格式化PluralRules方法
function formatPluralRules(config, getPluralRules, // 通过这种方式获取ts接口的方法
value, options // 获取getNumberFormat方法的第一个参数
) {
    const { locale, onError } = config;
    try {
        return getPluralRules(locale, options).select(value);
    }
    catch (e) {
        onError(new Error("Error formatting PluralRules" + e));
    }
    return 'other';
}
exports.formatPluralRules = formatPluralRules;
//todo ------------- 格式化message方法
function formatMessage(config, getMessageFormat, messageDescriptor, values) {
    const { locale, onError, messages } = config;
    const { id, defaultMessage = "", description } = messageDescriptor;
    const message = messages[id];
    try {
        return getMessageFormat(message, locale).format(values);
    }
    catch (e) {
        onError(new Error("Error formatting number" + e));
    }
    return defaultMessage;
}
exports.formatMessage = formatMessage;
//# sourceMappingURL=format.js.map