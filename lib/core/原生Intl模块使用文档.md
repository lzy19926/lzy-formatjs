
```js
 
        // 格式化时间
        // 年月日配置
        const dateOption = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        const formatter1 = new Intl.DateTimeFormat('zh-CH', dateOption);
        const formatter2 = new Intl.DateTimeFormat('en-US', dateOption);

        console.log(formatter1.format(new Date()));  // 2023年5月6日星期六
        console.log(formatter2.format(new Date()));  // Saturday, May 6, 2023


        // 格式化数字/货币
        const formatter3 = new Intl.NumberFormat('en-US', {
            style: 'currency', // 货币模式
            currency: 'USD'    // 货币类型
        });

        const formatter4 = new Intl.NumberFormat('zh-CH', {
            style: 'currency',
            currency: 'CNY'   
        });

        console.log(formatter3.format(1234.56));  //  $1,234.56
        console.log(formatter4.format(1234.56));  //  ¥1,234.56

```