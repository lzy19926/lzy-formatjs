"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IntlMessageFormat_1 = require("../lib/core/IntlMessageFormat");
const messages_en = 'Hello, {name}!';
const messages_zh = '你好, {name}!';
const formatter1 = new IntlMessageFormat_1.IntlMessageFormat(messages_en, 'en');
const formatter2 = new IntlMessageFormat_1.IntlMessageFormat(messages_zh, 'zh');
console.log(formatter1.format({ name: 'John' })); // 输出：Hello, John!
console.log(formatter2.format({ name: 'John' })); // 输出：Bonjour, John !
//# sourceMappingURL=IntlMessageFormat.test.js.map