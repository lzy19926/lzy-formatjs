import type { MessagesFormatValues } from './types';
export declare class IntlMessageFormat {
    private readonly message;
    private readonly locales;
    constructor(message: string, locales: string | string[]);
    format(values: MessagesFormatValues): string;
    formatToParts(values: MessagesFormatValues): MessagesFormatValues;
    partToResult(parts: any): string;
}
