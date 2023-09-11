import { BaseOptionsFieldsIntegrationType } from './baseOptionsType'

export interface BaseClientType<O = any> {
  /**
   *配置项和钩子函数
   *
   * @type {O}
   * @memberof BaseClientType
   */
  options: O

  /**
   *返回配置项和钩子函数
   *
   * @return {*}  {O}
   * @memberof BaseClientType
   */
  getOptions(): O
}
