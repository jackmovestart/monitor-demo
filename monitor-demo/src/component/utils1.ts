// import { BrowserBreadcrumbTypes } from '@mitojs/shared'
// import { getBreadcrumbCategoryInBrowser, Severity } from '@mitojs/utils'
import { BrowserClient } from './browserClient'

export const enum BrowserBreadcrumbTypes {
  ROUTE = 'Route',
  CLICK = 'UI.Click',
  CONSOLE = 'Console',
  XHR = 'Xhr',
  FETCH = 'Fetch',
  UNHANDLEDREJECTION = 'Unhandledrejection',
  RESOURCE = 'Resource',
  CODE_ERROR = 'Code Error',
  CUSTOMER = 'Customer'
}
/**
 * 用户行为类型
 */
export const enum BREADCRUMBCATEGORYS {
  HTTP = 'http',
  USER = 'user',
  DEBUG = 'debug',
  EXCEPTION = 'exception',
  LIFECYCLE = 'lifecycle'
}
/** 等级程度枚举 */
export enum Severity {
  Else = 'else',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Debug = 'debug',
  /** 上报的错误等级 */
  Low = 'low',
  Normal = 'normal',
  High = 'high',
  Critical = 'critical'
}
export function getBreadcrumbCategoryInBrowser(type: BrowserBreadcrumbTypes): BREADCRUMBCATEGORYS {
  switch (type) {
    case BrowserBreadcrumbTypes.XHR:
    case BrowserBreadcrumbTypes.FETCH:
      return BREADCRUMBCATEGORYS.HTTP
    case BrowserBreadcrumbTypes.CLICK:
    case BrowserBreadcrumbTypes.ROUTE:
      return BREADCRUMBCATEGORYS.USER
    case BrowserBreadcrumbTypes.CUSTOMER:
    case BrowserBreadcrumbTypes.CONSOLE:
      return BREADCRUMBCATEGORYS.DEBUG
    case BrowserBreadcrumbTypes.UNHANDLEDREJECTION:
    case BrowserBreadcrumbTypes.CODE_ERROR:
    case BrowserBreadcrumbTypes.RESOURCE:
    default:
      return BREADCRUMBCATEGORYS.EXCEPTION
  }
}
export function addBreadcrumbInBrowser(
  this: BrowserClient,
  data: any,
  type: BrowserBreadcrumbTypes,
  level = Severity.Info,
  params: any = {}
) {
  return this.breadcrumb.push({
    type,
    data,
    category: getBreadcrumbCategoryInBrowser(type),
    level,
    ...params
  })
}
