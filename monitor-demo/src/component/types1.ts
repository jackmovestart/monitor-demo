// import { BaseOptionsFieldsIntegrationType } from '@mitojs/types'
export interface BaseOptionsFieldsType {
  /**
   * report to server's url
   */
  dsn?: string
  /**
   * default is closed,sdk all functions will be turned off when set ture
   */
  disabled?: boolean
  /**
   * default is ''(empty string),it mean that every project has a unique key
   */
  apikey?: string
  /**
   * default is closed,it will be print in Console when set true
   */
  debug?: boolean
  /**
   * default is closed,all page's http request will add a unique id in request header
   */
  enableTraceId?: boolean
  /**
   * Should config this field if you set `enableTraceId` true.Considering that random addition of redundant request headers maybe cause cross-domain error,so here is regular containing relationship
   */
  traceIdFieldName?: string
  /**
   * When set `enableTraceId` true,traceId will be added in request header, defaul value is `Trace-Id`.
   * You can configure this field to appoint name
   */
  includeHttpUrlTraceIdRegExp?: RegExp
  /**
   * default value is null,mean all ajax http will be monitored.You can set some value to filter url.
   * It will filter when `filterXhrUrlRegExp.test(xhr.url) === true`
   */
  filterXhrUrlRegExp?: RegExp
  /**
   * defaul value is 20,it will be 100 if value more than 100.it mean breadcrumb stack length
   */
  maxBreadcrumbs?: number
  /**
   * defaul value is 0,it mean throttle delay time of button click event and weixin touch event
   */
  throttleDelayTime?: number
  /**
   * default value is 2,it mean max report count of the same error
   */
  maxDuplicateCount?: number
}

export interface BaseOptionsHooksType {
  /**
   * 钩子函数:在每次发送事件前会调用
   *
   * @param {TransportDataType} event 上报的数据格式
   * @return {*}  {(Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null)} 如果返回 null | undefined | boolean 时，将忽略本次上传
   * @memberof BaseOptionsHooksType
   */
  beforeDataReport?(event: TransportDataType): Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null
  /**
   *
   * 钩子函数，每次发送前都会调用
   * @param {TransportDataType} event 上报的数据格式
   * @param {string} url 上报到服务端的地址
   * @return {*}  {string} 返回空时不上报
   * @memberof BaseOptionsHooksType
   */
  configReportUrl?(event: TransportDataType, url: string): string
  /**
   * 钩子函数:在每次添加用户行为事件前都会调用
   *
   * @param {Breadcrumb} breadcrumb Breadcrumb的实例
   * @param {BreadcrumbPushData} hint 单次推入用户行为栈的数据
   * @return {*}  {(BreadcrumbPushData | CANCEL)} 如果返回 null | undefined | boolean 时，将忽略本次的push
   * @memberof BaseOptionsHooksType
   */
  beforePushBreadcrumb?(breadcrumb: Breadcrumb, hint: BreadcrumbPushData): BreadcrumbPushData | CANCEL
  /**
   * 钩子函数:拦截用户页面的ajax请求，并在ajax请求发送前执行该hook，可以对用户发送的ajax请求做xhr.setRequestHeader
   *
   * @param {IRequestHeaderConfig} config 原本的请求头信息
   * @param {IBeforeAppAjaxSendConfig} setRequestHeader 设置请求头函数
   * @memberof BaseOptionsHooksType
   */
  beforeAppAjaxSend?(config: IRequestHeaderConfig, setRequestHeader: IBeforeAppAjaxSendConfig): void
  /**
   *钩子函数:在beforeDataReport后面调用，在整合上报数据和本身SDK信息数据前调用，当前函数执行完后立即将数据错误信息上报至服务端
   *trackerId表示用户唯一键（可以理解成userId），需要trackerId的意义可以区分每个错误影响的用户数量
   *
   * @return {*}  {(string | number)}
   * @memberof BaseOptionsHooksType
   */
  backTrackerId?(): string | number
}
export type BaseOptionsFieldsIntegrationType = BaseOptionsFieldsType & BaseOptionsHooksType

export interface BrowserOptionsFieldsTypes extends BrowsersilentOptionsType, BaseOptionsFieldsIntegrationType, BrowserOptionsHooksType {
  /**
   * 默认为false，默认是xhr的上报方式，
   * 为true时，则使用img上报的方式，会在dsn后面追加data=encodeURIComponent(reportData)，在服务端接受时需要decodeURIComponent
   */
  useImgUpload?: boolean
}

/**
 *browser silent event types
 *
 * @interface BrowsersilentOptionsType
 */
export interface BrowsersilentOptionsType {
  /**
   * 默认会监控xhr，为true时，将不再监控
   */
  silentXhr?: boolean
  /**
   * 默认会监控fetch，为true时，将不再监控
   */
  silentFetch?: boolean
  /**
   * 默认会监控console，为true时，将不再监控
   */
  silentConsole?: boolean
  /**
   * 默认会监听click事件，当用户点击的标签不是body时就会被放入breadcrumb，为true，将不在监听
   */
  silentDom?: boolean
  /**
   * 默认会监控popstate、pushState、replaceState，为true时，将不再监控
   */
  silentHistory?: boolean
  /**
   * 默认会监控hashchange，为true时，将不在监控
   */
  silentHashchange?: boolean
  /**
   * 默认会监控error，为true时，将不在监控
   */
  silentError?: boolean
  /**
   * 默认会监控unhandledrejection，为true时，将不在监控
   */
  silentUnhandledrejection?: boolean
}

export interface BrowserOptionsHooksType {
  /**
   * 钩子函数，配置发送到服务端的xhr
   * 可以对当前xhr实例做一些配置：xhr.setRequestHeader()、xhr.withCredentials
   *
   * @param {XMLHttpRequest} xhr XMLHttpRequest的实例
   * @param {*} reportData 上报的数据
   * @memberof BrowserOptionsHooksType
   */
  configReportXhr?(xhr: XMLHttpRequest, reportData: any): void
}
