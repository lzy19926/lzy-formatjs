"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattedMessage = void 0;
// IntlConsumer组件  最终返回的组件
function IntlConsumer() {
    return <span></span>;
}
// 挂载上下文到全局__REACT_INTL_CONTEXT__,获取全局Intl上下文对象
function useIntl() {
    if (typeof window !== 'undefined') {
        if (!window.__LZY_REACT_INTL_CONTEXT__) {
            const IntlContext = {
                Consumer: IntlConsumer,
                Provider: IntlProvider
            };
            window.__LZY_REACT_INTL_CONTEXT__ = React.createContext(IntlContext);
        }
        return window.__LZY_REACT_INTL_CONTEXT__;
    }
    else {
        const IntlContext = {
            Consumer: IntlConsumer,
            Provider: IntlProvider
        };
        return React.createContext(IntlContext);
    }
}
function FormattedMessage(props) {
    const { id, tagName = "span", // 实际上默认为React.Fragment
    values } = props;
    const { formatMessage } = useIntl();
    let nodes = formatMessage(id, tagName, values);
    return;
}
exports.FormattedMessage = FormattedMessage;
// 使用memo将组件包裹?
//# sourceMappingURL=formatMessage.js.map