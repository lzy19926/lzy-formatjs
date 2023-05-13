import type { IntlMessageFormat } from './IntlMessageFormat'


export interface IntlCache {
    dateTime: Record<string, Intl.DateTimeFormat>
    number: Record<string, Intl.NumberFormat>
    message: Record<string, IntlMessageFormat>
    relativeTime: Record<string, Intl.RelativeTimeFormat>
    pluralRules: Record<string, Intl.PluralRules>
}

// 通过ConstructorParameters,将Intl.DateTimeFormat对象的参数放置在这里
// 之后可以通过 Parameters<Formatters['getNumberFormat']>[1] 获取到参数
export interface Formatters {
    getDateTimeFormat(...args: ConstructorParameters<typeof Intl.DateTimeFormat>): Intl.DateTimeFormat
    getNumberFormat(...args: ConstructorParameters<typeof Intl.NumberFormat>): Intl.NumberFormat
    getRelativeTimeFormat(...args: ConstructorParameters<typeof Intl.RelativeTimeFormat>): Intl.RelativeTimeFormat
    getPluralRules(...args: ConstructorParameters<typeof Intl.PluralRules>): Intl.PluralRules
    getMessageFormat(...args: ConstructorParameters<typeof IntlMessageFormat>): IntlMessageFormat
}


export type IntlConfig = {
    locale: string
    timeZone?: string
    formats: Record<string, any>
    messages: Record<string, string>
    defaultLocale: string,
    defaultFormats: Record<string, any> | string,
    onError: (e: Error) => void
}


export type PrimitiveType = string | number | boolean | null | undefined | Date

export type MessagesFormatValues = Record<string, PrimitiveType> | undefined

export type Messages = Record<string, string>

export type MessageDescriptor = {
    id: string
    description?: string
    defaultMessage?: string
}
