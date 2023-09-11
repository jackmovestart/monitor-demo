import { getLocationHref, replaceOld, supportsHistory, _global,parseUrlToObj } from '../utils'
import { BrowserBreadcrumbTypes } from '../shared'
import { BasePluginType, RouteChangeCollectType, voidFun } from '../types'
import { BrowserClient } from '../browserClient'
import { addBreadcrumbInBrowser } from '../utils1'

let t = +new Date()
export function routeTransform(collectedData: RouteChangeCollectType): RouteChangeCollectType {
  const { from, to } = collectedData
  const { relative: parsedFrom } = parseUrlToObj(from)
  const { relative: parsedTo } = parseUrlToObj(to)
  let duration = +new Date() - t 
  t = +new Date()
  return {
    from: parsedFrom ? parsedFrom : '/',
    to: parsedTo ? parsedTo : '/',
    duration
  }
}

export function routeTransformedConsumer(this: BrowserClient, transformedData: RouteChangeCollectType) {
  if (transformedData.from === transformedData.to) return
  addBreadcrumbInBrowser.call(this, transformedData, BrowserBreadcrumbTypes.ROUTE)
}
export const enum BrowserEventTypes {
  XHR = 'xhr',
  FETCH = 'fetch',
  CONSOLE = 'console',
  DOM = 'dom',
  HISTORY = 'history',
  ERROR = 'error',
  HASHCHANGE = 'hashchange',
  UNHANDLEDREJECTION = 'unhandledrejection',
  CUSTOMER = 'Customer'
}
const historyRoutePlugin: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.HISTORY,
  monitor(notify) {
    let lastHref: string
    if (!supportsHistory()) return
    const oldOnpopstate = _global.onpopstate
    _global.onpopstate = function (this: WindowEventHandlers, ...args: any[]): any {
      const to = getLocationHref()
      const from = lastHref
      lastHref = to
      notify(BrowserEventTypes.HISTORY, {
        from,
        to,
      })
      oldOnpopstate && oldOnpopstate.apply(this, args)
    }
    function historyReplaceFn(originalHistoryFn: voidFun): voidFun {
      return function (this: History, ...args: any[]): void {
        const url = args.length > 2 ? args[2] : undefined
        if (url) {
          const from = lastHref
          const to = String(url)
          lastHref = to
          notify(BrowserEventTypes.HISTORY, {
            from,
            to,
          })
        }
        return originalHistoryFn.apply(this, args)
      }
    }
    // 以下两个事件是人为调用，但是不触发onpopstate
    replaceOld(_global.history, 'pushState', historyReplaceFn)
    replaceOld(_global.history, 'replaceState', historyReplaceFn)
  },
  transform(collectedData: RouteChangeCollectType) {
    return routeTransform(collectedData)
  },
  consumer(transformedData: RouteChangeCollectType) {
    routeTransformedConsumer.call(this, transformedData)
  }
}

export default historyRoutePlugin
