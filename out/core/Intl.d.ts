import type { IntlConfig, Formatters } from './types';
/**创建一个Intl实例*/
export declare function createIntl(config: IntlConfig): {
    formatDate(value: string | number | Date | undefined, opts?: Intl.DateTimeFormatOptions | undefined): string;
    formatTime(value: string | number | Date | undefined, opts?: Intl.DateTimeFormatOptions | undefined): string;
    formatRelativeTime(value: number, unit?: Intl.RelativeTimeFormatUnit | undefined, opts?: Intl.RelativeTimeFormatOptions | undefined): string;
    formatNumber(value: number, opts?: Intl.NumberFormatOptions | undefined): string;
    formatPluralRules(value: number, opts?: Intl.PluralRulesOptions | undefined): Intl.LDMLPluralRule;
    formatMessage(descriptor: import("./types").MessageDescriptor, values?: import("./types").MessagesFormatValues): string;
    config: IntlConfig;
    formatters: Formatters;
};
