import { HttpTypes } from '../shared'
import { BaseTransformType } from './transport'

export interface HttpCollectedType {
  request: {
    httpType?: HttpTypes
    traceId?: string
    method?: string
    url?: string
    data?: any
  }
  response: {
    status?: number
    data?: any
  }
}

export interface HttpTransformedType extends HttpCollectedType, BaseTransformType {}
