
// // 将__REACT_INTL_CONTEXT__变量挂在全局
// // 实际上是一个react.context,
// declare global {
//     interface Window {
//         __LZY_REACT_INTL_CONTEXT__: React.Context<IntlShape> | undefined
//     }
// }

// // IntlConsumer组件  最终返回的组件
// function IntlConsumer() {
//     return <span></span>
// }

// // 挂载上下文到全局__REACT_INTL_CONTEXT__,获取全局Intl上下文对象
// function useIntl() {

//     if (typeof window !== 'undefined') {
//         if (!window.__LZY_REACT_INTL_CONTEXT__) {
//             const IntlContext = {
//                 Consumer: IntlConsumer,
//                 Provider: IntlProvider
//             }
//             window.__LZY_REACT_INTL_CONTEXT__ = React.createContext(IntlContext)
//         }

//         return window.__LZY_REACT_INTL_CONTEXT__
//     }

//     else {
//         const IntlContext = {
//             Consumer: IntlConsumer,
//             Provider: IntlProvider
//         }
//         return React.createContext(IntlContext)
//     }
// }

// export function FormattedMessage(props: Props) {
//     const {
//         id,
//         tagName = "span", // 实际上默认为React.Fragment
//         values
//     } = props

//     const { formatMessage } = useIntl()

//     let nodes: React.ReactNode = formatMessage(id, tagName, values)

//     return
// }



// // 使用memo将组件包裹?
