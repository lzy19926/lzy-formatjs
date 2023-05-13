"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/fast-memoize/index");
// ------------基本使用-----------------------
function expensiveOperation(a, b) {
    console.log('Running expensiveOperation!');
    return a + b;
}
const memoizedOperation = (0, index_1.memoize)(expensiveOperation);
console.log(memoizedOperation(1, 2)); // 执行计算并将结果缓存到myCache中
console.log(memoizedOperation(1, 2)); // 直接返回3  而不重新执行计算函数
// ------------指定缓存位置-----------------------
function createFastMemoizeCache(store) {
    return {
        create() {
            return {
                get(key) {
                    return store[key];
                },
                set(key, value) {
                    store[key] = value;
                },
            };
        },
    };
}
// 创建缓存并指定缓存类型
const myCache = createFastMemoizeCache({});
// memoriz时指定缓存
const memoizedOperation2 = (0, index_1.memoize)(expensiveOperation, {
    cache: myCache
});
console.log(memoizedOperation2(1, 2)); // 执行计算并将结果缓存到myCache中
console.log(memoizedOperation2(1, 2)); // 直接返回3  而不重新执行计算函数
//# sourceMappingURL=fast-memoize.test.js.map