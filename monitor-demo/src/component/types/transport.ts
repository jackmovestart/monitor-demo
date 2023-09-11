import { ErrorTypes } from '../shared'
import { BreadcrumbPushData } from './breadcrumb'
import { HttpTransformedType } from './http'

/**
 * SDK版本信息、apikey、trackerId
 *
 * @export
 * @interface AuthInfo
 */
export interface AuthInfo {
  apikey?: string
  sdkVersion: string
  sdkName: string
  trackerId?: string
}

export interface TransportDataType {
  authInfo?: AuthInfo
  breadcrumb?: BreadcrumbPushData[]
  data?: ReportDataType
  record?: any[]
}

export interface BaseTransformType {
  type?: ErrorTypes
  message?: string
  time?: number
  name?: string
  level?: string
  url: string
}

export interface ReportDataType extends Partial<HttpTransformedType> {
  stack?: any
  errorId?: number
  componentName?: string
  propsData?: any
  // logError 手动报错 MITO.log
  customTag?: string
}
