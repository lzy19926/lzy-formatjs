import type { MessageDescriptor, IntlConfig, Formatters, MessagesFormatValues } from './types';
export interface IntlFormatters {
    formatDate(value: Parameters<Intl.DateTimeFormat['format']>[0] | string, // 从Intl.DateTimeFormat的format方法中获取[0]号参数的类型
    opts?: Intl.DateTimeFormatOptions): string;
    formatTime(value: Parameters<Intl.DateTimeFormat['format']>[0] | string, opts?: Intl.DateTimeFormatOptions): string;
    formatRelativeTime(value: Parameters<Intl.RelativeTimeFormat['format']>[0], unit?: Intl.RelativeTimeFormatUnit, opts?: Intl.RelativeTimeFormatOptions): string;
    formatNumber(value: Parameters<Intl.NumberFormat['format']>[0], opts?: Intl.NumberFormatOptions): string;
    formatPluralRules(value: Parameters<Intl.PluralRules['select']>[0], opts?: Intl.PluralRulesOptions): ReturnType<Intl.PluralRules['select']>;
    formatMessage(descriptor: MessageDescriptor, values?: MessagesFormatValues): string;
}
export declare function formatNumber(config: IntlConfig, getNumberFormat: Formatters['getNumberFormat'], // 通过这种方式获取ts接口的方法
value: number, options?: Parameters<IntlFormatters['formatNumber']>[1]): string;
export declare function formatDate(config: IntlConfig, getDateTimeFormat: Formatters['getDateTimeFormat'], value: string, options?: Parameters<IntlFormatters['formatDate']>[1]): string;
export declare function formatTime(config: IntlConfig, getDateTimeFormat: Formatters['getDateTimeFormat'], // 通过这种方式获取ts接口的方法
value: number, options?: Parameters<IntlFormatters['formatTime']>[1]): string;
export declare function formatRelativeTime(config: IntlConfig, getRelativeTimeFormat: Formatters['getRelativeTimeFormat'], value: number, unit?: Parameters<IntlFormatters['formatRelativeTime']>[1], options?: Parameters<IntlFormatters['formatRelativeTime']>[2]): string;
export declare function formatPluralRules(config: IntlConfig, getPluralRules: Formatters['getPluralRules'], // 通过这种方式获取ts接口的方法
value: number, options?: Parameters<IntlFormatters['formatPluralRules']>[1]): Intl.LDMLPluralRule;
export declare function formatMessage(config: IntlConfig, getMessageFormat: Formatters['getMessageFormat'], messageDescriptor: Parameters<IntlFormatters['formatMessage']>[0], values?: Parameters<IntlFormatters['formatMessage']>[1]): string;
