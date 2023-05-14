"use strict";
// IntlMessageFormat类  是对原生Intl类的延伸 Intl.TimeDataFormat
// 用于格式化message文本
// 它是基于 ICU Message Format 标准构建的，这是一个广泛使用的国际化消息格式规范。
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlMessageFormat = void 0;
class IntlMessageFormat {
    constructor(message, locales) {
        this.message = message;
        this.locales = locales;
    }
    // 进行转换
    format(values) {
        const parts = this.formatToParts(values); // 解析value
        const result = this.partToResult(parts); // 给结果赋值
        return result;
    }
    // 解析value
    formatToParts(values) {
        return values;
    }
    // 给结果赋值(正则替换占位符)
    partToResult(parts) {
        let originMessage = this.message || "";
        Object.keys(parts).forEach(partKey => {
            let partValue = parts[partKey];
            var regex = new RegExp('\\{' + partKey + '\\}', 'g');
            originMessage = originMessage.replace(regex, partValue);
        });
        return originMessage;
    }
}
exports.IntlMessageFormat = IntlMessageFormat;
//# sourceMappingURL=IntlMessageFormat.js.map