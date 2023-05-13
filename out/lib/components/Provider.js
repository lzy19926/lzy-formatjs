"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Intl_1 = require("../core/Intl");
/**格式化国际化参数*/
function processIntlConfig(config) {
    return {
        locale: config.locale,
        timeZone: config.timeZone,
        formats: config.formats,
        messages: config.messages,
        defaultLocale: config.defaultLocale,
        defaultFormats: config.defaultFormats,
    };
}
/**IntlProvider组件*/
function IntlProvider(props) {
    const [intl, setIntl] = useState(null);
    const [cache, setCache] = useState(null);
    const [config, setConfig] = useState(null);
    // 初始化时创建cache和config
    useEffect(() => {
        if (!cache && !config) {
            const initCache = (0, Intl_1.createIntlCache)(); // 存放Intl的Cache
            const initConfig = processIntlConfig(props); // 初始化国际化参数
            const initIntl = createIntl(initConfig, initCache); // 初始Intl
            setCache(initCache);
            setConfig(initConfig);
            setIntl(initIntl);
        }
        // config变更时更新组件的属性
        const prevConfig = config;
        const newConfig = processIntlConfig(props);
        if (!shallowEqual(prevConfig, newConfig)) {
            const newIntl = createIntl(newConfig, cache);
            setConfig(newConfig);
            setIntl(newIntl);
        }
    }, []);
    // 使用react的Context.Provider提供国际化上下文
    // 内部的IntlConsumer会读取这里的内容
    return <Provider value={this.state.intl}>{this.props.children}</Provider>;
}
//# sourceMappingURL=Provider.js.map