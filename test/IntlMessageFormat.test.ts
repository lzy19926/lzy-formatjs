import { IntlMessageFormat } from '../lib/core/IntlMessageFormat'




const messages_en = 'Hello, {name}!'
const messages_zh = '你好, {name}!'

const formatter1 = new IntlMessageFormat(messages_en, 'en');
const formatter2 = new IntlMessageFormat(messages_zh, 'zh');

console.log(formatter1.format({ name: 'John' })); // 输出：Hello, John!
console.log(formatter2.format({ name: 'John' })); // 输出：Bonjour, John !







