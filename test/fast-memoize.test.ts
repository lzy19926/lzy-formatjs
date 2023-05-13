import { memoize, Cache } from '../lib/fast-memoize/index'


// ------------基本使用-----------------------
function expensiveOperation(a: number, b: number) {
    console.log('Running expensiveOperation!');
    return a + b;
}

const memoizedOperation = memoize(expensiveOperation);

console.log(memoizedOperation(1, 2)); // 执行计算并将结果缓存到myCache中
console.log(memoizedOperation(1, 2)); // 直接返回3  而不重新执行计算函数



// ------------指定缓存位置-----------------------
function createFastMemoizeCache<V>(
    store: Record<string, V | undefined>
): Cache<string, V> {
    return {
        create() {
            return {
                get(key) {
                    return store[key]
                },
                set(key, value) {
                    store[key] = value
                },
            }
        },
    }
}
// 创建缓存并指定缓存类型
const myCache: Cache<string, number> = createFastMemoizeCache({})
// memoriz时指定缓存
const memoizedOperation2 = memoize(expensiveOperation, {
    cache: myCache
});

console.log(memoizedOperation2(1, 2)); // 执行计算并将结果缓存到myCache中
console.log(memoizedOperation2(1, 2)); // 直接返回3  而不重新执行计算函数

