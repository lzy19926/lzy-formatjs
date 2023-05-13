
## 二次封装的fast-memorize工具

### 作用: 将普通函数转为记忆化函数  (缓存函数结果) ,实现快速计算


0. 它提供了一种快速、灵活和易于使用的方法来优化重复计算，并减少应用程序的响应时间。
1. 高效：fast-memoize 使用一种高度优化的算法来存储和查找缓存值，从而获得最佳性能。它可以快速处理大量的函数调用，并且具有很小的内存占用。
2. 灵活：该库支持不同类型的函数、自定义缓存键、缓存大小限制等功能，以满足各种需求。
3. 易于使用：fast-memoize 提供了一个简单的 API，您只需要将要记忆化的函数传递给 memoize 函数即可。在某些情况下，只需使用默认配置就可以获得最优性能。


### 原理
-  内部会创建一个cache  使用get set进行代理

```ts
import {memoize} from 'fast-memoize';
import {Cache,createFastMemoizeCache} from 'fast-memoize';

// ------------基本使用-----------------------
function expensiveOperation(a, b) {
  console.log('Running expensiveOperation!');
  return a + b;
}

const memoizedOperation = memoize(expensiveOperation);

console.log(memoizedOperation(1, 2)); // 执行计算并输出 3
console.log(memoizedOperation(1, 2)); // 直接返回缓存的结果，不会执行计算

// ------------指定缓存位置-----------------------
// 可以传入cache,函数结果会缓存到指定cache中
// 需要使用内部的createFastMemoizeCache方法将一个对象转化为响应式对象  实现缓存

// 创建缓存并指定缓存类型
const myCache: Cache<string, number> = createFastMemoizeCache({})
// memoriz时指定缓存
const memoizedOperation2 = memoize(expensiveOperation, {
    cache: myCache
});

console.log(memoizedOperation2(1, 2)); // 执行计算并将结果缓存到myCache中
console.log(memoizedOperation2(1, 2)); // 直接返回3  而不重新执行计算函数
```